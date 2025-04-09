<template>
  <div class="game-wrapper">
    <div class="game container">
      <!-- Description Section -->
      <div class="description card">
        <h2 @click="showDescription = !showDescription" class="description-toggle">
          How to Play <span class="toggle-icon">{{ showDescription ? '▲' : '▼' }}</span>
        </h2>
        <transition name="fade">
          <div v-if="showDescription" class="description-content">
            <p>Welcome to <strong>Cows & Bulls</strong>! Crack the secret 4-digit code (1-9, no repeats).</p>
            <ul>
              <li><span class="highlight">Cows</span>: Digits in the right position.</li>
              <li><span class="highlight">Bulls</span>: Digits in the code, wrong position.</li>
              <li>"Reveal A Clue" costs <strong>3 moves</strong>—use it wisely!</li>
              <li>"Rule Out Numbers" is free to eliminate digits.</li>
              <li>Guess and hit "GO" - get 4 cows to win!</li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Game Header -->
      <div class="game-header">
        <button @click="resetStore" class="top new-game">New Game</button>
        <button @click="giveUp" class="top give-up">Give Up</button>
      </div>

      <!-- Reveal Number -->
      <div class="revealNumber-heading">Reveal a Clue</div>
      <div class="revealNumber">
        <button v-for="n in 4" :key="n" @click="revealNumberWithPosition(n.toString())" class="reveal-btn">
          {{ n === 1 ? revealNumber1 : n === 2 ? revealNumber2 : n === 3 ? revealNumber3 : revealNumber4 }}
        </button>
      </div>

      <!-- Rule Out Number -->
      <div class="revealNumber-heading">Rule Out Numbers</div>
      <div class="numbers">
        <button v-for="n in 9" :key="n" class="numButton" :class="{ crossed: ruledOut[n-1] }" @click="toggleRuleOut(n)">
          <span class="num-text">{{ ruledOut[n-1] ? '✖' : n }}</span>
        </button>
      </div>

      <div class="logs-header">
        <span class="logs-title">Guess History</span>
        <div class="moves-sticky">Moves: <span class="count">{{ logs.length }}</span></div>
      </div>
      <!-- Logs -->
      <div id="logs" class="logs card">
        <table>
          <thead>
            <tr>
              <th class="main-th">Guess</th>
              <th class="main-th">Cows</th>
              <th class="main-th">Bulls</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index">
              <td class="guess-cell">{{ log.num }}</td>
              <td class="cow-bull-cell">
                <div class="count-wrapper">
                  <span v-for="i in log.cows" :key="i" class="animal-icon"><img :src="cow" alt="cow" class="cow-image" /></span>
                  <span v-if="log.cows === 0" class="empty">-</span>
                </div>
              </td>
              <td class="cow-bull-cell">
                <div class="count-wrapper">
                  <span v-for="i in log.bulls" :key="i" class="animal-icon"><img :src="bull" alt="bull" class="bull-image" /></span>
                  <span v-if="log.bulls === 0" class="empty">-</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Input Field -->
      <div class="inputField">
        <input v-for="(input, idx) in inputs" :key="idx" type="tel" class="inputDash"
               :class="{ invalid: validity[idx] === 'invalid' }" :id="'input-' + idx"
               @focus="inputOnFocus(idx)" @input="updateGuessingNumber(idx, $event)"
               @blur="validate('number' + (idx + 1), inputs[idx], idx)"
               min="1" max="9" v-model="inputs[idx]" maxlength="1" autocomplete="off" />
      </div>

      <!-- Messages -->
      <div class="message-box">
        <transition name="fade">
          <div v-if="hasInvalidInput" class="invalidText">No repeats, 1-9 only, no letters!</div>
          <div v-else-if="notValid" class="invalidText">Invalid number—try again!</div>
          <div v-else-if="enterValue" class="invalidText">Fill all fields first!</div>
          <div v-else-if="valid" class="correctText">Guess logged—check below!</div>
        </transition>
      </div>

      <!-- Go Button -->
      <button id="button" class="goButton" @click="checkCowBull">
        <span class="goText">GO</span>
      </button>
    </div>
    <!-- Popups -->
    <div class="mask" v-if="giveUpGame || win"></div>
    <div v-if="giveUpGame" class="popup card">
      <div class="popup-title">Game Over!</div>
      <div class="popup-text">Moves: {{ logs.length }}</div>
      <div class="popup-text">Number was: <strong>{{ randomStringNumber }}</strong></div>
      <button class="popup-btn" @click="resetStore">Try Again</button>
    </div>
    <div v-if="win" class="popup card win">
      <div class="popup-title">You Won! 🎉</div>
      <div class="popup-text">Moves: {{ logs.length }}</div>
      <div class="popup-text">Number was: <strong>{{ randomStringNumber }}</strong></div>
      <button class="popup-btn" @click="resetStore">Play Again</button>
    </div>
  </div>
</template>

<script src="./js/game.js"></script>

<style lang="scss" scoped>
.game-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #2a4066);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

.game {
  width: 90%;
  max-width: 800px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 95vh;
}

.card {
  background: black;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Description */
.description-toggle {
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  color: #ffd700;
  display: flex;
  justify-content: space-between;
  transition: color 0.3s;
}

.description-toggle:hover { color: #ffeb3b; }
.toggle-icon { font-size: 18px; }
.description-content { margin-top: 15px; color: #e0e0e0; font-size: 16px; line-height: 1.6; }
.highlight { color: #00e676; font-weight: 600; }

/* Game Header */
.game-header {
  display: flex;
  justify-content: space-between;
  margin: 25px 0px;
}

.top {
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  border: none;
}

.new-game { background: linear-gradient(45deg, #00bcd4, #4dd0e1); color: #fff; }
.give-up { background: linear-gradient(45deg, #ff5722, #ff8a65); color: #fff; }
.top:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); }

/* Reveal Number */
.revealNumber-heading {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 20px 0 10px;
  color: #00e676;
  text-transform: uppercase;
}

.revealNumber {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 25px;
}

.reveal-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #ffd700;
  font-size: 18px;
  font-weight: 700;
  color: #1e1e2f;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reveal-btn:hover { background: #ffd700; transform: rotate(360deg); }

/* Rule Out Number */
.numbers {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.numButton {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #4caf50, #81c784);
  border: 3px solid #388e3c;
  cursor: pointer;
  transition: all 0.3s ease;
}

.numButton.crossed { background: linear-gradient(45deg, #f44336, #ef5350); border-color: #d32f2f; }
.numButton:hover { transform: scale(1.1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); }
.num-text { font-size: 20px; font-weight: 700; color: #fff; }

/* Logs */
.logs {
  width: 90%;
  max-height: 200px;
  margin: 20px auto;
  overflow-y: auto;
  padding: 15px;
}

.logs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.logs-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffd700;
}

.moves-sticky {
  background: #0288d1;
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
}

.count {
  margin-left: 5px;
  background: #fff;
  color: #0288d1;
  padding: 2px 6px;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #e0e0e0;
  table-layout: fixed;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

th, td {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px;
  text-align: center;
  font-size: 14px;
  vertical-align: middle;
}

th { width: 33.33%; }
.main-th {
  background: linear-gradient(45deg, #0288d1, #4fc3f7);
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  z-index: 1;
}

.guess-cell { font-weight: 600; }
.cow-bull-cell { padding: 0; }

.count-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-height: 36px;
  padding: 10px;
  flex-wrap: nowrap;
}

.animal-icon img {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.3s;
}

.animal-icon:hover img { transform: scale(1.2); }
.empty { color: #757575; font-size: 16px; }

/* Input Field */
.inputField {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
}

.inputDash {
  width: 55px;
  height: 55px;
  border: 3px solid #ffd700;
  border-radius: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.9);
  color: #1e1e2f;
  transition: all 0.3s ease;
}

.inputDash:focus { border-color: #00e676; background: #fff; box-shadow: 0 0 10px rgba(0, 230, 118, 0.5); }
.invalid { border-color: #f44336; background: rgba(244, 67, 54, 0.1); }

/* Messages */
.message-box { min-height: 24px; text-align: center; margin: 10px 0; }
.invalidText, .correctText { font-size: 16px; font-weight: 600; padding: 8px 15px; border-radius: 20px; display: inline-block; }
.invalidText { color: #f44336; background: rgba(244, 67, 54, 0.2); }
.correctText { color: #00e676; background: rgba(0, 230, 118, 0.2); }

/* Go Button */
.goButton {
  display: block;
  margin: 20px auto;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ffeb3b, #ffd700);
  border: 3px solid #fbc02d;
  cursor: pointer;
  transition: all 0.3s ease;
}

.goButton:hover { transform: scale(1.1); box-shadow: 0 8px 15px rgba(255, 215, 0, 0.5); }
.goText { font-size: 24px; font-weight: 700; color: #1e1e2f; }

/* Popups */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  z-index: 100;
  text-align: center;
}

.win { background: linear-gradient(45deg, #00e676, #4caf50); border: 2px solid #388e3c; }
.popup-title { font-size: 26px; font-weight: 700; color: #fff; margin-bottom: 10px; }
.popup-text { font-size: 16px; color: #e0e0e0; margin: 8px 0; }
.popup-btn {
  width: 120px;
  height: 45px;
  background: linear-gradient(45deg, #0288d1, #4fc3f7);
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
}

.popup-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); }

/* Animations */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
