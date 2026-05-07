# 🎯 Artificial Intelligence - Problem Solving Assignment

## 📋 Objective
The objective of this assignment is to apply Artificial Intelligence problem-solving techniques through practical implementation and collaborative development using GitHub. This repository contains the implementation of two selected AI problems.

---

## 🎮 Problem 1: Interactive Game AI (Tic-Tac-Toe System)

### Description
A web-based Tic-Tac-Toe game where the user plays against an AI opponent. The AI is designed to always make the optimal move, ensuring the user cannot win against the highest difficulty setting.

### Algorithms Used
1.  **Minimax Algorithm**: A recursive algorithm used for decision-making in game theory. It provides an optimal move for the AI by exploring all possible future game states.
2.  **Alpha-Beta Pruning**: An optimization technique for the Minimax algorithm that reduces the number of nodes evaluated in the search tree, significantly improving performance without changing the outcome.

### Performance Comparison
| Metric | Minimax | Alpha-Beta Pruning |
| :--- | :--- | :--- |
| **Nodes Explored** | ~4,245 | ~1,200 (approx. 70% reduction) |
| **Execution Time** | ~15-25ms | ~2-5ms |
| **Optimality** | 100% | 100% |

### Sample Output
```text
Move 1: User (X) at Top-Center | Algorithm: Manual
Move 2: AI (O) at Center      | Algorithm: Minimax | Nodes: 4245 | Time: 15.23ms
...
Game Result: Draw (Optimal Play)
```

---

## 🔐 Problem 2: Crypt Arithmetic Puzzle Solver (CSP)

### Description
A puzzle solver that finds digit assignments (0-9) for letters in arithmetic equations (e.g., `SEND + MORE = MONEY`). Each letter represents a unique digit, and no number starts with zero.

### Algorithm Used
**Constraint Satisfaction Problem (CSP) Approach**:
- **Variables**: Unique letters in the equation.
- **Domains**: Digits {0, 1, ..., 9}.
- **Constraints**:
    - Each letter maps to a unique digit.
    - Leading letters cannot be zero.
    - The arithmetic equation (Addition, Subtraction, or Multiplication) must be satisfied.

### Sample Output
**Puzzle: SEND + MORE = MONEY**
```text
Solution Found: 1
Letter Mapping: S=9, E=5, N=6, D=7, M=1, O=0, R=8, Y=2
Verification: 9567 + 1085 = 10652 ✓
Execution Time: 12ms
```

---

## 🚀 Execution Steps

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/AI_ProblemSolving_<RegisterNumber>.git
    cd AI_ProblemSolving_<RegisterNumber>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the application:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

## 📂 Folder Structure
```text
AI_ProblemSolving_<RegisterNumber>/
├── public/                  # Static assets
│   └── index.html           
├── src/                     # Source code
    ├── App.jsx              # Main application & Navigation
    ├── index.js             # React entry point
    ├── tictactoe_app.jsx    # Tic-Tac-Toe Logic (Minimax/Alpha-Beta)
    └── cryptarithmetic_app.jsx # Cryptarithmetic Logic (CSP)
├── package.json             # Project metadata & dependencies
└── README.md                # Project documentation
```

---

## 👤 Submission Details
- **Team Size**: 1 or 2
- **Repository Name**: `AI_ProblemSolving_<RegisterNumber>`
- **Deadline**: 25th April 2026

---

## 📚 References
- Russel, S., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach*.
- [Minimax Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Minimax)
- [Constraint Satisfaction Problem - Wikipedia](https://en.wikipedia.org/wiki/Constraint_satisfaction_problem)
