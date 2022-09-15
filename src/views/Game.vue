<template>
  <div style="height: 900px">
    <div class="game container">
      <div class="game-header">
        <div @click="resetStore" class="top new-game">NEW GAME</div>
        <div @click="giveUp" class="top give-up">GIVE UP</div>
      </div>
      <div class="revealNumber-heading">Reveal Number</div>
      <div class="revealNumber">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span @click="revealNumberWithPosition('1')">{{revealNumber1}}</span>
        <span @click="revealNumberWithPosition('2')">{{revealNumber2}}</span>
        <span @click="revealNumberWithPosition('3')">{{revealNumber3}}</span>
        <span @click="revealNumberWithPosition('4')">{{revealNumber4}}</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="revealNumber-heading">Rule Out Number</div>
      <div class="numbers">
      <button class="numButton" :class="{'cross': num1}" @click="num1 = !num1"><span class="goText"><span v-if="!num1">1</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num2}" @click="num2 = !num2"><span class="goText"><span v-if="!num2">2</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num3}" @click="num3 = !num3"><span class="goText"><span v-if="!num3">3</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num4}" @click="num4 = !num4"><span class="goText"><span v-if="!num4">4</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num5}" @click="num5 = !num5"><span class="goText"><span v-if="!num5">5</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num6}" @click="num6 = !num6"><span class="goText"><span v-if="!num6">6</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num7}" @click="num7 = !num7"><span class="goText"><span v-if="!num7">7</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num8}" @click="num8 = !num8"><span class="goText"><span v-if="!num8">8</span> <span v-else> X </span></span></button>
      <button class="numButton" :class="{'cross': num9}" @click="num9 = !num9"><span class="goText"><span v-if="!num9">9</span> <span v-else> X </span></span></button>
      </div>
      <div id="logs" class="logs">
        <div class="logs-heading">
          <span class="logs-heading-text">LOGS</span>
          <button class="moves"><span class="goText"><span> <span>Moves</span> <span class="count">{{logs.length}}</span></span></span></button>
        </div>
        <table>
          <tr>
            <th class="main-th">Your Entry</th>
            <th class="main-th">Cow/s</th>
            <th class="main-th">Bull/s</th>
          </tr>
          <tr v-for="i in logs" :key="i.id">
            <td> {{i.num}} </td>
            <td class="cow-bull-count"> <span v-for="j in i.cows" :key="j.id"> <img :src="cow" alt="cow" class="cow-image"></span> <span v-if="i.cows === 0"> - </span> </td>
            <td class="cow-bull-count"> <span v-for="j in i.bulls" :key="j.id"> <img :src="bull" alt="bull" class="bull-image"></span> <span v-if="i.bulls === 0"> - </span>  </td>
          </tr>
        </table>
      </div>
      <div class="inputField" v-on:keyup="getNumber($event)">
        <input type="tel" class="inputDash" id="a" :class="{ invalid: number1Validity === 'invalid' }" @focus="inputOnFocus(0)" @blur="validate('number1', input1, 0)" min="1" max="9" v-model='input1' maxlength="1" autocomplete="off" />
        <input type="tel" class="inputDash" id="b" :class="{ invalid: number2Validity === 'invalid' }" @focus="inputOnFocus(1)" @blur="validate('number2', input2, 1)" min="1" max="9" v-model='input2' maxlength="1" autocomplete="off" />
        <input type="tel" class="inputDash" id="c" :class="{ invalid: number3Validity === 'invalid' }" @focus="inputOnFocus(2)" @blur="validate('number3', input3, 2)" min="1" max="9" v-model='input3' maxlength="1" autocomplete="off" />
        <input type="tel" class="inputDash" id="d" :class="{ invalid: number4Validity === 'invalid' }" @focus="inputOnFocus(3)" @blur="validate('number4', input4, 3)" min="1" max="9" v-model='input4' maxlength="1" autocomplete="off" />
      </div>
      <div v-if="number1Validity === 'invalid' || number2Validity === 'invalid' || number3Validity === 'invalid' || number4Validity === 'invalid'" class="invalidText">
        <span style="color:black">Reminder : </span><span>&nbsp; No number to be repeated, Number should be between 1 and 9 and No Alphabets</span>
      </div>
      <div v-if="notValid" class="invalidText">
        <span>Please Enter Valid Number - This was not considered</span>
      </div>
      <div v-if="enterValue" class="invalidText">
        <span>Please enter Value</span>
      </div>
      <div v-if="valid" class="correctText">
        <span>Please check Logs</span>
      </div>
      <button id="button" class="goButton" @click="checkCowBull()"><span class="goText">GO</span></button>
    </div>
    <div class="mask" v-if="giveUpGame"></div>
    <div v-if="giveUpGame" class="popup">
      <div class="popup_giveup">
        Try again, Fail Again, Fail Better!!!
      </div>
      <div class="popup_giveup">
        Attempts tried: {{logs.length}}
      </div>
      <div class="popup_giveup">
        The Number was: {{randomStringNumber}}
      </div>
      <button class="popup_tryagain" @click="giveUpGame = false">Try Again</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/main';
.game {
  @include font-light(16px, 1);
  margin-top: 20px;
  border: 1px solid black;
  height: 95%;
  background-color: white;
  overflow: scroll;
  background-color: rgba(255,255,255,0.5); // Use instead of opacity
}
.top {
  font-weight: 700;
}
.game-header {
  display: flex;
  justify-content: space-between;
}
.new-game {
  transform: rotate(312deg);
  width: 170px;
  height: 60px;
  color: #0335c9;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.give-up {
  transform: rotate(48deg);
  width: 170px;
  height: 60px;
  color: red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
}
.revealNumber {
  height: 30px;
  margin: 10px auto;
  display: flex;
  font-weight: 700;
  justify-content: space-evenly;
  span {
    cursor: pointer;
  }
  &-heading {
    margin: 0 auto;
    font-weight: 700;
    display: flex;
    justify-content: center;
    &-text {
      width: 90%;
      display: flex;
      justify-content: center;
    }
  }
}
.logs{
  width: 60%;
  height: 40%; // variable - keeping change it to suite your height
  border: 1px solid black;
  margin: 0 auto;
  font-weight: 700;
  background-color: white;
  background-color: rgba(255,255,255,0.8); // Use instead of opacity
  overflow: scroll;
  &-heading {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 10px auto;
    &-text {
      width: 90%;
      justify-content: center;
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 40px;
    }
  }
}
.cow-image, .bull-image {
  height: 25px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  text-align: center;
}
.main-th {
  background-color: black;
  color: white;
}
.inputField {
  margin: 40px auto;
  height: 10%;
  width: auto;
  display: flex;
  justify-content: space-around;
  input:focus {
    background-color: lightblue;
  }
}
.inputDash {
  margin: 20px auto;
  width: 10%;
  height: 50%;
  border: unset;
  border-bottom: 3px solid black;
  text-align: center;
  font-size: 25px;
  background-color: unset;
  font-weight: 700;
}
.invalid{
  border-bottom: 2px solid red;
  word-break: break-all;
}
.invalidText, .correctText{
  font-size: 16px;
  font-style: italic;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  color: red;
  font-weight: 700;
  background-color: rgba(255,255,255,0.4); // Use instead of opacity
}
.correctText {
  color: green;
}
.numbers{
  display: flex;
}
.goButton, .numButton, .cross, .moves{
  margin: 10px auto;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgreen;
  border: 3px solid green;
  cursor: pointer;
}
.numButton {
  margin: 10px auto;
}
.cross, .moves {
  justify-content: center;
  background-color: lightcoral;
  border: 3px solid red;
  margin: 10px auto;
}
.moves {
  background-color: lightskyblue;
  border: 2px solid blue;
  cursor: unset;
}
.count {
  font-weight: 600;
  height: 70%;
}
.goText{
  margin: auto;
}
.mask {
  height: 100%;
  width: 100%;
  top: 0;
  position: fixed;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99
}
.popup {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  background-color: white;
  z-index: 100;
  display: flex;
  justify-content: center;
  border: 4px solid #0095DA;
  flex-direction: column;
  align-items: center;
  &_giveup {
    padding: 30px 0px;
  }
  &_tryagain {
    width: 100px;
    height: 50px;
    color: #fff;
    background-color: #0095da;
  }
}
</style>

<script src="./js/game.js"></script>
