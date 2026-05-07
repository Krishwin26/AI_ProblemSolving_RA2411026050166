import React, { useState, useCallback } from 'react';

// ==================== MINIMAX ALGORITHM ====================
const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity, useAlphaBeta = false) => {
  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) return currentBoard[a];
    }
    return null;
  };

  const isBoardFull = (b) => b.every(cell => cell !== null);
  const winner = checkWinner(board);

  // Terminal states
  if (winner === 'O') return { score: 10 - depth, nodes: 1 };
  if (winner === 'X') return { score: depth - 10, nodes: 1 };
  if (isBoardFull(board)) return { score: 0, nodes: 1 };

  let totalNodes = 1;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;

    const newBoard = [...board];
    newBoard[i] = isMaximizing ? 'O' : 'X';
    const result = minimax(newBoard, depth + 1, !isMaximizing, alpha, beta, useAlphaBeta);
    totalNodes += result.nodes;

    if (isMaximizing) {
      bestScore = Math.max(bestScore, result.score);
      if (useAlphaBeta) {
        alpha = Math.max(alpha, result.score);
        if (beta <= alpha) break; // Pruning
      }
    } else {
      bestScore = Math.min(bestScore, result.score);
      if (useAlphaBeta) {
        beta = Math.min(beta, result.score);
        if (beta <= alpha) break; // Pruning
      }
    }
  }

  return { score: bestScore, nodes: totalNodes };
};

const getBestMove = (board, useAlphaBeta = false) => {
  let bestScore = -Infinity;
  let bestMoveIndex = -1;
  let totalNodes = 0;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;

    const newBoard = [...board];
    newBoard[i] = 'O';
    const result = minimax(newBoard, 0, false, -Infinity, Infinity, useAlphaBeta);
    totalNodes += result.nodes;

    if (result.score > bestScore) {
      bestScore = result.score;
      bestMoveIndex = i;
    }
  }

  return { moveIndex: bestMoveIndex, nodesExplored: totalNodes };
};

// ==================== REACT COMPONENT ====================
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [stats, setStats] = useState({ minimax: null, alphaBeta: null });
  const [useAlphaBeta, setUseAlphaBeta] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);

  const checkWinner = useCallback((currentBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) return currentBoard[a];
    }
    return null;
  }, []);

  const isBoardFull = useCallback((b) => b.every(cell => cell !== null), []);

  const makeAIMove = useCallback((currentBoard, currentHistory) => {
    const startTime = performance.now();
    const result = getBestMove(currentBoard, useAlphaBeta);
    const endTime = performance.now();

    const newBoard = [...currentBoard];
    newBoard[result.moveIndex] = 'O';
    setBoard(newBoard);

    const moveRecord = {
      player: 'AI',
      position: result.moveIndex,
      algorithm: useAlphaBeta ? 'Alpha-Beta' : 'Minimax',
      nodesExplored: result.nodesExplored,
      timeMs: (endTime - startTime).toFixed(2)
    };
    setMoveHistory([...currentHistory, moveRecord]);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (isBoardFull(newBoard)) {
      setGameOver(true);
    }
  }, [useAlphaBeta, checkWinner, isBoardFull]);

  const handleCellClick = (index) => {
    if (gameOver || board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const userMoveRecord = {
      player: 'User',
      position: index,
      algorithm: 'Manual',
      nodesExplored: 0,
      timeMs: '0'
    };
    const newHistory = [...moveHistory, userMoveRecord];
    setMoveHistory(newHistory);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameOver(true);
      return;
    }

    setTimeout(() => makeAIMove(newBoard, newHistory), 300);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setWinner(null);
    setStats({ minimax: null, alphaBeta: null });
    setMoveHistory([]);
  };

  const getPositionName = (index) => {
    const names = ['Top-Left', 'Top', 'Top-Right', 'Left', 'Center', 'Right', 'Bottom-Left', 'Bottom', 'Bottom-Right'];
    return names[index];
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Tic-Tac-Toe Game AI</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Play against an AI opponent using Minimax or Alpha-Beta Pruning algorithms
      </p>

      {/* Algorithm Selection */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-background-secondary)', borderRadius: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={useAlphaBeta}
            onChange={(e) => setUseAlphaBeta(e.target.checked)}
            disabled={moveHistory.length > 0}
          />
          <span>Use Alpha-Beta Pruning</span>
        </label>
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '0.5rem 0 0 0' }}>
          {useAlphaBeta ? '✓ Alpha-Beta enabled (faster with pruning)' : '○ Minimax enabled (explores all branches)'}
        </p>
      </div>

      {/* Game Board */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 80px)', 
        gap: '2px',
        backgroundColor: '#999',
        padding: '2px',
        marginBottom: '1.5rem',
        borderRadius: '4px'
      }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={gameOver || cell !== null}
            style={{
              width: '80px',
              height: '80px',
              fontSize: '28px',
              fontWeight: 'bold',
              backgroundColor: cell ? (cell === 'X' ? 'var(--color-success)' : 'var(--color-info)') : 'var(--color-background-primary)',
              color: cell ? 'white' : 'var(--color-text-primary)',
              border: 'none',
              cursor: cell || gameOver ? 'default' : 'pointer',
              borderRadius: '0',
              transition: 'background-color 0.2s'
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Game Status */}
      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        {gameOver ? (
          <div>
            <p style={{ fontSize: '18px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
              {winner ? (winner === 'X' ? '🎉 You Won!' : '🤖 AI Won!') : '🤝 It\'s a Draw!'}
            </p>
            <button
              onClick={resetGame}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-info)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Play Again
            </button>
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Your turn (X) | AI will play as O
          </p>
        )}
      </div>

      {/* Move History */}
      {moveHistory.length > 0 && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--color-background-secondary)', 
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <h3>Move History & Performance Stats</h3>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-tertiary)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Move</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Player</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Position</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Algorithm</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem' }}>Nodes</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem' }}>Time (ms)</th>
                </tr>
              </thead>
              <tbody>
                {moveHistory.map((move, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-tertiary)' }}>
                    <td style={{ padding: '0.5rem' }}>{idx + 1}</td>
                    <td style={{ padding: '0.5rem' }}>{move.player}</td>
                    <td style={{ padding: '0.5rem' }}>{getPositionName(move.position)}</td>
                    <td style={{ padding: '0.5rem' }}>{move.algorithm}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{move.nodesExplored.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{move.timeMs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Algorithm Explanation */}
      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'var(--color-background-secondary)', 
        borderRadius: '8px',
        fontSize: '13px',
        color: 'var(--color-text-secondary)'
      }}>
        <h4>Algorithm Comparison</h4>
        <p><strong>Minimax:</strong> Recursively evaluates all possible game states. AI selects move that maximizes winning chances.</p>
        <p><strong>Alpha-Beta Pruning:</strong> Optimization of Minimax that eliminates branches guaranteed not to affect final decision, resulting in 50-90% fewer node evaluations.</p>
      </div>
    </div>
  );
}
