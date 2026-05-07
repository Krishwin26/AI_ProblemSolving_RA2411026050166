import React, { useState } from 'react';

// ==================== CSP SOLVER ====================
class CryptArithmeticSolver {
  constructor(puzzle) {
    this.puzzle = puzzle;
    this.solutions = [];
    this.solutionFound = false;
  }

  parseEquation(equation) {
    // Parse: "SEND + MORE = MONEY" or "SEND + MORE = MONEY"
    const parts = equation.split('=');
    if (parts.length !== 2) throw new Error('Invalid format. Use: WORD1 OP WORD2 = RESULT');

    const leftSide = parts[0].trim();
    const rightSide = parts[1].trim();

    // Parse left side
    let operator = null;
    let operand1 = null;
    let operand2 = null;

    if (leftSide.includes('+')) {
      [operand1, operand2] = leftSide.split('+').map(s => s.trim());
      operator = '+';
    } else if (leftSide.includes('-')) {
      const match = leftSide.match(/^(.*?)\s*-\s*(.*)$/);
      if (match) {
        operand1 = match[1].trim();
        operand2 = match[2].trim();
        operator = '-';
      }
    } else if (leftSide.includes('*')) {
      [operand1, operand2] = leftSide.split('*').map(s => s.trim());
      operator = '*';
    } else {
      throw new Error('Operator not found. Use +, -, or *');
    }

    return {
      operand1,
      operand2,
      operator,
      result: rightSide,
      allWords: [operand1, operand2, rightSide]
    };
  }

  getUniqueLetters(parsed) {
    const letters = new Set();
    parsed.allWords.forEach(word => {
      for (let char of word) {
        if (/[A-Z]/.test(char)) letters.add(char);
      }
    });
    return Array.from(letters);
  }

  getLeadingLetters(parsed) {
    const leading = new Set();
    parsed.allWords.forEach(word => {
      if (word.length > 1) leading.add(word[0]);
    });
    return Array.from(leading);
  }

  wordToNumber(word, mapping) {
    return parseInt(word.split('').map(c => mapping[c]).join(''));
  }

  isValidAssignment(mapping, parsed) {
    try {
      const leading = this.getLeadingLetters(parsed);
      for (let letter of leading) {
        if (mapping[letter] === 0) return false;
      }

      const val1 = this.wordToNumber(parsed.operand1, mapping);
      const val2 = this.wordToNumber(parsed.operand2, mapping);
      const resultVal = this.wordToNumber(parsed.result, mapping);

      if (parsed.operator === '+') {
        return val1 + val2 === resultVal;
      } else if (parsed.operator === '-') {
        return val1 - val2 === resultVal;
      } else if (parsed.operator === '*') {
        return val1 * val2 === resultVal;
      }
    } catch {
      return false;
    }
    return false;
  }

  solve() {
    try {
      const parsed = this.parseEquation(this.puzzle);
      const letters = this.getUniqueLetters(parsed);

      if (letters.length > 10) {
        throw new Error(`Too many unique letters (${letters.length}). Maximum is 10.`);
      }

      const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const mapping = {};

      const backtrack = (index) => {
        if (index === letters.length) {
          if (this.isValidAssignment(mapping, parsed)) {
            this.solutions.push({ ...mapping });
            this.solutionFound = true;
          }
          return;
        }

        const letter = letters[index];
        for (let digit of digits) {
          if (Object.values(mapping).includes(digit)) continue;

          // Leading digit constraint check
          const leading = this.getLeadingLetters(parsed);
          if (leading.includes(letter) && digit === 0) continue;

          mapping[letter] = digit;
          backtrack(index + 1);
          delete mapping[letter];
        }
      };

      backtrack(0);
      return this.solutions;
    } catch (error) {
      throw error;
    }
  }
}

// ==================== REACT COMPONENT ====================
export default function CryptArithmetic() {
  const [puzzle, setPuzzle] = useState('SEND + MORE = MONEY');
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [solveTime, setSolveTime] = useState(0);
  const [attemptHistory, setAttemptHistory] = useState([]);

  const handleSolve = () => {
    setError('');
    setSolutions([]);
    setLoading(true);

    setTimeout(() => {
      try {
        const startTime = performance.now();
        const solver = new CryptArithmeticSolver(puzzle);
        const results = solver.solve();
        const endTime = performance.now();

        setSolveTime((endTime - startTime).toFixed(2));

        if (results.length === 0) {
          setError('No valid solution found for this puzzle.');
        } else {
          setSolutions(results);
          setAttemptHistory([...attemptHistory, {
            puzzle,
            solutionsFound: results.length,
            timeMs: (endTime - startTime).toFixed(2),
            timestamp: new Date().toLocaleTimeString()
          }]);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }, 100);
  };

  const verifySolution = (solution) => {
    try {
      const solver = new CryptArithmeticSolver(puzzle);
      const parsed = solver.parseEquation(puzzle);
      return solver.isValidAssignment(solution, parsed);
    } catch {
      return false;
    }
  };

  const calculateExpression = (solution) => {
    try {
      const solver = new CryptArithmeticSolver(puzzle);
      const parsed = solver.parseEquation(puzzle);

      const val1 = solver.wordToNumber(parsed.operand1, solution);
      const val2 = solver.wordToNumber(parsed.operand2, solution);
      const resultVal = solver.wordToNumber(parsed.result, solution);

      return {
        val1,
        val2,
        resultVal,
        operator: parsed.operator,
        operand1: parsed.operand1,
        operand2: parsed.operand2,
        result: parsed.result
      };
    } catch {
      return null;
    }
  };

  const loadExample = (example) => {
    setPuzzle(example);
    setSolutions([]);
    setError('');
  };

  const examples = [
    'SEND + MORE = MONEY',
    'CROSS + ROADS = DANGER',
    'THIS + THAT = THESE'
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Crypt Arithmetic Puzzle Solver</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Solve cryptarithmetic puzzles where each letter represents a unique digit (0-9)
      </p>

      {/* Input Section */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Enter Puzzle (Format: WORD1 OP WORD2 = RESULT)
        </label>
        <input
          type="text"
          value={puzzle}
          onChange={(e) => setPuzzle(e.target.value.toUpperCase())}
          placeholder="e.g., SEND + MORE = MONEY"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '16px',
            border: '1px solid var(--color-border-tertiary)',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-mono)',
            marginBottom: '0.75rem'
          }}
        />
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Supports: +, -, * | Each letter = unique digit 0-9 | No leading zeros
        </p>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-background-secondary)', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 0.75rem 0', fontWeight: '500' }}>Quick Examples:</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {examples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => loadExample(ex)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-info)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'opacity 0.2s'
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Solve Button */}
      <button
        onClick={handleSolve}
        disabled={loading || !puzzle.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '16px',
          backgroundColor: loading ? 'var(--color-border-tertiary)' : 'var(--color-success)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'default' : 'pointer',
          marginBottom: '1.5rem',
          fontWeight: '500'
        }}
      >
        {loading ? 'Solving...' : 'Solve Puzzle'}
      </button>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--color-background-secondary)',
          borderLeft: '3px solid var(--color-danger)',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          color: 'var(--color-danger)'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Solutions Section */}
      {solutions.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-background-secondary)',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: '0', fontWeight: '500', color: 'var(--color-success)' }}>
              ✓ Found {solutions.length} solution{solutions.length !== 1 ? 's' : ''} in {solveTime}ms
            </p>
          </div>

          {solutions.map((solution, solutionIdx) => {
            const expr = calculateExpression(solution);
            const isValid = verifySolution(solution);

            return (
              <div
                key={solutionIdx}
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  border: isValid ? '1px solid var(--color-success)' : '1px solid var(--color-border-tertiary)'
                }}
              >
                <h3 style={{ marginTop: 0 }}>Solution {solutionIdx + 1}</h3>

                {/* Mapping */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Letter to Digit Mapping:</p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))',
                    gap: '0.5rem'
                  }}>
                    {Object.entries(solution)
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([letter, digit]) => (
                        <div
                          key={letter}
                          style={{
                            padding: '0.5rem',
                            backgroundColor: 'var(--color-background-primary)',
                            border: '1px solid var(--color-border-tertiary)',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          <strong>{letter}</strong> = <strong style={{ color: 'var(--color-info)' }}>{digit}</strong>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Verification */}
                {expr && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'var(--color-background-primary)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: '0.5rem 0' }}>
                      {expr.operand1.split('').map(c => solution[c] ?? c).join('')} {expr.operator} {expr.operand2.split('').map(c => solution[c] ?? c).join('')}
                    </p>
                    <p style={{ margin: '0.5rem 0', fontWeight: 'bold' }}>
                      {expr.val1} {expr.operator} {expr.val2} = {expr.resultVal}
                    </p>
                    <p style={{
                      margin: '0.5rem 0',
                      color: isValid ? 'var(--color-success)' : 'var(--color-danger)',
                      fontWeight: '500'
                    }}>
                      {isValid ? '✓ Verified Correct' : '✗ Invalid'}
                    </p>
                  </div>
                )}

                {/* Constraints */}
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <p style={{ margin: '0.25rem 0' }}>✓ All digits unique</p>
                  <p style={{ margin: '0.25rem 0' }}>✓ No leading zeros</p>
                  <p style={{ margin: '0.25rem 0' }}>✓ Equation satisfied</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Attempt History */}
      {attemptHistory.length > 0 && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginTop: 0 }}>Solve History</h3>
          <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-tertiary)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem' }}>Puzzle</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem' }}>Solutions</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem' }}>Time (ms)</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem' }}>When</th>
                </tr>
              </thead>
              <tbody>
                {attemptHistory.slice(-5).reverse().map((attempt, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-tertiary)' }}>
                    <td style={{ padding: '0.5rem' }}>{attempt.puzzle}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>{attempt.solutionsFound}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{attempt.timeMs}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{attempt.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Algorithm Info */}
      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: '8px',
        fontSize: '13px',
        color: 'var(--color-text-secondary)'
      }}>
        <h4>How It Works</h4>
        <p><strong>Constraint Satisfaction Problem (CSP):</strong></p>
        <ol style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>
          <li>Identifies all unique letters in the puzzle</li>
          <li>Applies constraints (no leading zeros, all digits unique)</li>
          <li>Uses backtracking to assign digits to letters</li>
          <li>Validates each complete assignment against the equation</li>
          <li>Returns all valid solutions found</li>
        </ol>
      </div>
    </div>
  );
}
