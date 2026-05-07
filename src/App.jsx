import React, { useState } from 'react';
import TicTacToe from './tictactoe_app.jsx';
import CryptArithmetic from './cryptarithmetic_app.jsx';

export default function App() {
  const [activeProject, setActiveProject] = useState('home');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--color-background-tertiary)'
    },
    header: {
      padding: '2rem',
      backgroundColor: 'var(--color-background-primary)',
      borderBottom: '1px solid var(--color-border-tertiary)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    nav: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    navButton: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.2s'
    },
    content: {
      padding: '2rem'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ margin: '0 0 1rem 0' }}>AI Problem Solving Assignment</h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
            Interactive implementations of Game AI and Constraint Satisfaction Problems
          </p>
          
          <nav style={styles.nav}>
            <button
              onClick={() => setActiveProject('home')}
              style={{
                ...styles.navButton,
                backgroundColor: activeProject === 'home' ? 'var(--color-info)' : 'var(--color-background-secondary)',
                color: activeProject === 'home' ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveProject('tictactoe')}
              style={{
                ...styles.navButton,
                backgroundColor: activeProject === 'tictactoe' ? 'var(--color-info)' : 'var(--color-background-secondary)',
                color: activeProject === 'tictactoe' ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Tic-Tac-Toe AI
            </button>
            <button
              onClick={() => setActiveProject('crypt')}
              style={{
                ...styles.navButton,
                backgroundColor: activeProject === 'crypt' ? 'var(--color-info)' : 'var(--color-background-secondary)',
                color: activeProject === 'crypt' ? 'white' : 'var(--color-text-primary)'
              }}
            >
              Crypt Arithmetic
            </button>
          </nav>
        </div>
      </header>

      <main style={{ ...styles.content, maxWidth: '1200px', margin: '0 auto' }}>
        {activeProject === 'home' && <HomePage />}
        {activeProject === 'tictactoe' && <TicTacToe />}
        {activeProject === 'crypt' && <CryptArithmetic />}
      </main>

      <footer style={{
        padding: '2rem',
        backgroundColor: 'var(--color-background-secondary)',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        fontSize: '13px',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0 }}>
          AI Problem Solving Assignment • Deadline: 25th April 2026
        </p>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div style={{ maxWidth: '900px' }}>
      <h2>Projects Overview</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Project 1 Card */}
        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--color-border-tertiary)'
        }}>
          <h3 style={{ marginTop: 0 }}>Project 1: Interactive Game AI</h3>
          <p><strong>Problem:</strong> Tic-Tac-Toe with intelligent AI opponent</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Algorithms:</p>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              <li>Minimax Algorithm</li>
              <li>Alpha-Beta Pruning</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Key Features:</p>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              <li>Interactive 3x3 game board</li>
              <li>Real-time AI decision making</li>
              <li>Performance metrics & comparison</li>
              <li>Move history tracking</li>
            </ul>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-background-primary)',
            borderRadius: '4px',
            fontSize: '13px',
            marginBottom: '1rem',
            color: 'var(--color-text-secondary)'
          }}>
            <p style={{ margin: '0' }}>
              <strong>Minimax:</strong> Explores all game states recursively to find optimal move
            </p>
            <p style={{ margin: '0.5rem 0 0 0' }}>
              <strong>Alpha-Beta:</strong> Optimized version that prunes non-promising branches (50-90% faster)
            </p>
          </div>

          <a href="#tictactoe" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-info)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Play Now
          </a>
        </div>

        {/* Project 2 Card */}
        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--color-background-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--color-border-tertiary)'
        }}>
          <h3 style={{ marginTop: 0 }}>Project 2: Crypt Arithmetic Solver</h3>
          <p><strong>Problem:</strong> Solve cryptarithmetic puzzles using constraints</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Algorithm:</p>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              <li>Constraint Satisfaction Problem (CSP)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Key Features:</p>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              <li>Parse arithmetic equations</li>
              <li>Find all valid solutions</li>
              <li>Constraint validation</li>
              <li>Solution verification</li>
            </ul>
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-background-primary)',
            borderRadius: '4px',
            fontSize: '13px',
            marginBottom: '1rem',
            color: 'var(--color-text-secondary)'
          }}>
            <p style={{ margin: '0' }}>
              <strong>CSP Approach:</strong> Assigns unique digits (0-9) to letters with backtracking and constraint propagation
            </p>
            <p style={{ margin: '0.5rem 0 0 0' }}>
              Each letter maps to exactly one digit, leading digits ≠ 0, equation must balance
            </p>
          </div>

          <a href="#crypt" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--color-success)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}>
            Solve Puzzles
          </a>
        </div>
      </div>

      {/* Key Learnings */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: 0 }}>Key Concepts Demonstrated</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <h4>Game Tree Search</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              Minimax explores game states recursively, evaluating winning chances for both players
            </p>
          </div>
          
          <div>
            <h4>Algorithm Optimization</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              Alpha-Beta Pruning cuts unnecessary branches, achieving same results ~10x faster
            </p>
          </div>
          
          <div>
            <h4>Constraint Satisfaction</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              CSP uses backtracking and constraint propagation to find valid variable assignments
            </p>
          </div>
          
          <div>
            <h4>Backtracking Search</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              Systematically explores solution space, undoing assignments when constraints violated
            </p>
          </div>
          
          <div>
            <h4>Performance Analysis</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              Track metrics like nodes explored, execution time, and solution quality
            </p>
          </div>
          
          <div>
            <h4>Interactive Interfaces</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
              React-based UI provides real-time feedback and performance visualization
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Details */}
      <div style={{
        padding: '2rem',
        backgroundColor: 'var(--color-background-secondary)',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginTop: 0 }}>Implementation Details</h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <h4>Technology Stack</h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <li>React (Frontend Framework)</li>
              <li>JavaScript (Core Logic)</li>
              <li>CSS Variables (Theming)</li>
              <li>Browser APIs (Performance)</li>
            </ul>
          </div>
          
          <div>
            <h4>Code Organization</h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <li>Modular components</li>
              <li>Separation of concerns</li>
              <li>Reusable algorithms</li>
              <li>Clear documentation</li>
            </ul>
          </div>
          
          <div>
            <h4>Quality Assurance</h4>
            <ul style={{ margin: '0', paddingLeft: '1.25rem', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <li>Solution verification</li>
              <li>Constraint validation</li>
              <li>Performance metrics</li>
              <li>Error handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
