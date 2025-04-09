# Cows & Bulls Game
Welcome to **Cows & Bulls**, a fun and challenging number-guessing game built with Vue.js! Test your logic skills by cracking a secret 4-digit code.

## Table of Contents
- [How to Play](#how-to-play)
- [Website](#website)
- [How to Use the Repository](#how-to-use-the-repository)
- [Installation](#installation)
- [Running the Game](#running-the-game)
- [Contributing](#contributing)
- [License](#license)

## How to Play

Cows & Bulls is a classic code-breaking game where your goal is to guess a secret 4-digit number (using digits 1-9, no repeats). Here's how it works:

- **Objective**: Guess the secret 4-digit code in as few moves as possible.
- **Cows**: Each digit that's in the correct position earns you a "cow."
- **Bulls**: Each digit that's in the code but in the wrong position earns you a "bull."
- **Tools**:
  - **Reveal**: Peek at a digit in the secret code (costs 3 moves—use wisely!).
  - **Rule Out**: Eliminate digits you know aren’t in the code (free).
- **Winning**: Score 4 cows (all digits correct and in the right position) to win!
- **Example**:
  - Secret code: `5289`
  - Your guess: `1324` → 0 cows, 1 bull (2 is in the code, wrong spot)
  - Your guess: `5678` → 1 cow (5 is correct spot), 1 bull (8 is in the code, wrong spot)

Start guessing and refine your strategy with each move!

## Website

Play the game online at: [Cows & Bulls Game](https://cow-bull-game.netlify.app/)  

## How to Use the Repository

This repository contains the source code for the Cows & Bulls game, built with Vue.js. Follow the steps below to clone, install, and run the game locally.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/cows-and-bulls.git
   cd cows-and-bulls

2. **Install Dependencies: Ensure you have Node.js installed, then run:**:
   npm install

3. **Start the Development Server:**:
   npm run serve