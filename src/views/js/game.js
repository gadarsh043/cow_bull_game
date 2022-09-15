
import validateMixin from '@/mixins/validate.js'
import { mapGetters } from 'vuex'
import cow from '@/assets/images/cow.png'
import bull from '@/assets/images/bull.png'

export default {
  name: 'Game',
  components: {},
  mixins: [
    validateMixin
  ],
  data () {
    return {
      cow,
      bull,
      input1: null,
      input2: null,
      input3: null,
      input4: null,
      inputNumberAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      randomNumber: [],
      guessingNumber: [null, null, null, null],
      number1Validity: 'untouch',
      number2Validity: 'untouch',
      number3Validity: 'untouch',
      number4Validity: 'untouch',
      secondTime: 0,
      notValid: false,
      valid: false,
      enterValue: false,
      logs: [],
      num1: false,
      num2: false,
      num3: false,
      num4: false,
      num5: false,
      num6: false,
      num7: false,
      num8: false,
      num9: false,
      revealNumber1: 'X',
      revealNumber2: 'X',
      revealNumber3: 'X',
      revealNumber4: 'X',
      nonDisclosedDigits: 4,
      giveUpGame: false
    }
  },
  mounted () {
    this.randomNumber = this.getRandomNumber
    this.logs = this.getLogs
    this.randomNumberGenerator()
  },
  computed: {
    ...mapGetters(['getRandomNumber', 'getLogs']),
    randomStringNumber () {
      let number = ''
      this.randomNumber.forEach(element => {
        number += String(element)
      })
      return number
    }
  },
  methods: {
    resetStore () {
      sessionStorage.removeItem('CowBullGame')
      this.$store.commit('setRandomNumber', [])
      this.$store.commit('setLogs', [])
      this.guessingNumber = [null, null, null, null]
      this.logs = []
      this.num1 = false
      this.num2 = false
      this.num3 = false
      this.num4 = false
      this.num5 = false
      this.num6 = false
      this.num7 = false
      this.num8 = false
      this.num9 = false
      this.revealNumber1 = 'X'
      this.revealNumber2 = 'X'
      this.revealNumber3 = 'X'
      this.revealNumber4 = 'X'
      this.nonDisclosedDigits = 4
      this.randomNumberGenerator()
    },
    giveUp () {
      this.giveUpGame = true
      this.resetStore()
    },
    inputOnFocus (position) {
      this.guessingNumber.splice(position, 1, null)
    },
    getNumber (e) {
      var target = e.srcElement
      var maxLength = parseInt(target.attributes.maxlength.value, 10)
      var myLength = target.value.length
      if (myLength >= maxLength && myLength < 2) {
        var next = target
        if (next.nextElementSibling !== null) {
          next = next.nextElementSibling
          if (next.tagName.toLowerCase() === 'input') {
            next.innerhtml = null
            next.focus()
          }
        } else {
          const button = document.getElementById('button')
          button.focus()
        }
      } else if (myLength === 0 && this.secondTime === 0) {
        this.resetInput()
        this.guessingNumber = [null, null, null, null]
      } else if (e.key === '0') {
        this.secondTime = 1
      } else {
        this.secondTime = 0
      }
    },
    randomNumberGenerator () {
      if (this.getRandomNumber.length === 0) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1))
          var temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
        array = array.slice(0, 4)
        this.randomNumber = array
        this.$store.commit('setRandomNumber', this.randomNumber)
      } else {
        this.randomNumber = this.getRandomNumber
      }
    },
    checkCowBull () {
      if (this.validityTicker()) {
        this.compareRandomAndGuess()
        this.guessingNumber = [null, null, null, null]
        this.resetInput()
      } else {
        this.resetInput()
        this.guessingNumber = [null, null, null, null]
      }
      var changeFocus = document.getElementById('logs')
      window.scrollTo(changeFocus)
    },
    validityTicker () {
      if (this.number1Validity === 'invalid' || this.number2Validity === 'invalid' || this.number3Validity === 'invalid' || this.number4Validity === 'invalid') {
        this.notValid = true
        setTimeout(() => {
          this.notValid = false
        }, 1000)
        return false
      } else if (this.guessingNumber.includes(null)) {
        this.enterValue = true
        setTimeout(() => {
          this.enterValue = false
        }, 1000)
        return true
      } else {
        this.valid = true
        setTimeout(() => {
          this.valid = false
        }, 1000)
        return true
      }
    },
    resetInput () {
      this.input1 = null
      this.input2 = null
      this.input3 = null
      this.input4 = null
      const inputField1 = document.getElementById('a')
      inputField1.focus()
      this.number1Validity = 'untouch'
      this.number2Validity = 'untouch'
      this.number3Validity = 'untouch'
      this.number4Validity = 'untouch'
    },
    compareRandomAndGuess () {
      if (!this.guessingNumber.includes(null)) {
        let cow = 0
        let bull = 0
        for (let i = 0; i < 4; i++) {
          if (this.randomNumber[i] === this.guessingNumber[i]) {
            cow = cow + 1
          } else if (this.randomNumber.includes(this.guessingNumber[i])) {
            bull = bull + 1
          }
        }
        this.$store.commit('setRandomNumber', this.randomNumber)
        const number = this.guessingNumber.join('')
        const obj = {
          num: number,
          cows: cow,
          bulls: bull,
          reveal: false
        }
        this.logs.push(obj)
        this.$store.commit('setLogs', this.logs)
      }
    },
    revealNumberWithPosition (position) {
      if (position === '1') {
        this.revealNumber1 = this.randomNumber[0]
        this.nonDisclosedDigits = 3
      } else if (position === '2') {
        this.revealNumber2 = this.randomNumber[1]
        this.nonDisclosedDigits = 2
      } else if (position === '3') {
        this.revealNumber3 = this.randomNumber[2]
        this.nonDisclosedDigits = 1
      } else {
        this.revealNumber4 = this.randomNumber[3]
        this.nonDisclosedDigits = 1
      }
    }
  }
}
