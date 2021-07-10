<template>
  <div style="height: 700px">
    <div class="game container">
      <div @click="resetStore">New Game</div>
      <div @click="revealNumber">Give UP</div>
      <div class="revealNumber-heading">Reveal Number</div>
      <div class="revealNumber">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span>X</span>
        <span>X</span>
        <span>X</span>
        <span>X</span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="logs"></div>
      <div class="inputField" v-on:keyup="getNumber($event)">
        <input class="inputDash" id="a" :class="{ invalid: number1Validity === 'invalid' }" @blur="validate('number1', input1, 0)" min="1" max="9" v-model='input1' maxlength="1" />
        <input class="inputDash" id="b" :class="{ invalid: number2Validity === 'invalid' }" @blur="validate('number2', input2, 1)" min="1" max="9" v-model='input2' maxlength="1" />
        <input class="inputDash" id="c" :class="{ invalid: number3Validity === 'invalid' }" @blur="validate('number3', input3, 2)" min="1" max="9" v-model='input3' maxlength="1" />
        <input class="inputDash" id="d" :class="{ invalid: number4Validity === 'invalid' }" @blur="validate('number4', input4, 3)" min="1" max="9" v-model='input4' maxlength="1" />
      </div>
      <div v-if="number1Validity === 'invalid' || number2Validity === 'invalid' || number3Validity === 'invalid' || number4Validity === 'invalid'" class="invalidText">
        <span style="color:black">Reminder : </span><span>&nbsp; No number to be repeated. Number should be between 1 and 9</span>
      </div>
      <div v-if="notValid" class="invalidText">
        <span>Please Enter Valid Number - This was not considered</span>
      </div>
      <div v-if="valid" class="correctText">
        <span>Please check Logs</span>
      </div>
      <button id="button" class="goButton" @click="checkCowBull()"><span class="goText">GO</span></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/main';
.game {
  @include font-light(16px, 1);
  margin-top: 20px;
  border: 1px solid black;
  height: auto;
  background-color: white;
  opacity: 0.5;
}
.revealNumber {
  height: 30px;
  margin: 10px auto;
  display: flex;
  justify-content: space-evenly;
  &-heading {
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
.logs{
  width: 70%;
  height: 200px;
  border: 1px solid black;
  display: flex;
  margin: 0 auto;
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
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 25px;
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
}
.correctText {
  color: green;
}
.goButton{
  margin: 10px auto;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: lightgreen;
  border: 3px solid green;
}
.goText{
  margin: auto;
}
</style>

<script src="./js/game.js"></script>
