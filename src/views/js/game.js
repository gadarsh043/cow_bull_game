import { mapGetters } from 'vuex'
import cow from '@/assets/images/cow.png'
import bull from '@/assets/images/bull.png'

export default {
  name: 'Game',
  data() {
    return {
      cow,
      bull,
      inputs: [null, null, null, null],
      randomNumber: [],
      guessingNumber: [null, null, null, null],
      validity: ['untouch', 'untouch', 'untouch', 'untouch'],
      notValid: false,
      valid: false,
      enterValue: false,
      logs: [],
      ruledOut: Array(9).fill(false),
      revealNumber1: 'X',
      revealNumber2: 'X',
      revealNumber3: 'X',
      revealNumber4: 'X',
      giveUpGame: false,
      win: false,
      showDescription: false
    }
  },
  mounted() {
    this.randomNumber = this.getRandomNumber.length ? this.getRandomNumber : this.randomNumberGenerator()
    this.logs = this.getLogs
  },
  computed: {
    ...mapGetters(['getRandomNumber', 'getLogs']),
    randomStringNumber() {
      return this.randomNumber.join('')
    },
    hasInvalidInput() {
      return this.validity.some(v => v === 'invalid')
    }
  },
  methods: {
    resetStore() {
      sessionStorage.removeItem('CowBullGame')
      this.$store.commit('setRandomNumber', [])
      this.$store.commit('setLogs', [])
      this.inputs = [null, null, null, null]
      this.guessingNumber = [null, null, null, null]
      this.validity = ['untouch', 'untouch', 'untouch', 'untouch']
      this.logs = []
      this.ruledOut = Array(9).fill(false)
      this.revealNumber1 = 'X'
      this.revealNumber2 = 'X'
      this.revealNumber3 = 'X'
      this.revealNumber4 = 'X'
      this.win = false
      this.giveUpGame = false
      this.randomNumberGenerator()
    },
    giveUp() {
      this.giveUpGame = true
    },
    inputOnFocus(position) {
      this.guessingNumber[position] = null
      this.inputs[position] = null
      this.validity[position] = 'untouch'
    },
    updateGuessingNumber(idx, event) {
      const value = event.target.value
      this.inputs[idx] = value
      this.guessingNumber[idx] = value ? parseInt(value) : null
      this.validate('number' + (idx + 1), value, idx)
      if (value) {
        if (idx < 3) {
          document.getElementById(`input-${idx + 1}`).focus()
        } else {
          document.getElementById('button').focus()
        }
      } else if (event.inputType === 'deleteContentBackward' && idx > 0) {
        document.getElementById(`input-${idx - 1}`).focus()
      }
    },
    randomNumberGenerator() {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      this.randomNumber = array.slice(0, 4)
      this.$store.commit('setRandomNumber', this.randomNumber)
      return this.randomNumber
    },
    checkCowBull() {
      if (this.validityTicker()) {
        this.compareRandomAndGuess()
        this.resetInput()
        this.scrollLogsToBottom()
      } else {
        this.resetInput()
      }
    },
    validityTicker() {
      if (this.hasInvalidInput) {
        this.notValid = true
        setTimeout(() => (this.notValid = false), 1000)
        return false
      }
      if (this.guessingNumber.includes(null)) {
        this.enterValue = true
        setTimeout(() => (this.enterValue = false), 1000)
        return false
      }
      this.valid = true
      setTimeout(() => (this.valid = false), 1000)
      return true
    },
    resetInput() {
      this.inputs = [null, null, null, null]
      this.guessingNumber = [null, null, null, null]
      this.validity = ['untouch', 'untouch', 'untouch', 'untouch']
      document.getElementById('input-0').focus()
    },
    compareRandomAndGuess() {
      let cows = 0, bulls = 0
      for (let i = 0; i < 4; i++) {
        if (this.randomNumber[i] === this.guessingNumber[i]) {
          cows++
        } else if (this.randomNumber.includes(this.guessingNumber[i])) {
          bulls++
        }
      }
      const number = this.guessingNumber.join('')
      this.logs.push({ num: number, cows, bulls })
      this.$store.commit('setLogs', this.logs)
      if (cows === 4) this.win = true
    },
    revealNumberWithPosition(position) {
      const idx = parseInt(position) - 1
      if (this[`revealNumber${position}`] === 'X') {
        if (confirm('Revealing a number costs 3 moves. Proceed?')) {
          this[`revealNumber${position}`] = this.randomNumber[idx]
          for (let i = 0; i < 3; i++) {
            this.logs.push({ num: `Reveal ${position}`, cows: 0, bulls: 0 })
          }
          this.$store.commit('setLogs', this.logs)
          this.scrollLogsToBottom()
        }
      }
    },
    toggleRuleOut(num) {
      this.ruledOut[num - 1] = !this.ruledOut[num - 1]
    },
    validate(unique, passVal, position) {
      const isValid = this.checkSomething(passVal, position)
      this.validity[position] = isValid ? 'valid' : passVal === null ? 'untouch' : 'invalid'
    },
    checkSomething(value, position) {
      const numValue = value === null || value === '' ? null : Number(value)
      if (numValue === null) {
        this.guessingNumber[position] = null
        return true
      }
      if (isNaN(numValue) || numValue < 1 || numValue > 9 || (this.guessingNumber.includes(numValue) && this.guessingNumber.indexOf(numValue) !== position)) {
        return false
      }
      this.guessingNumber[position] = numValue
      return true
    },
    scrollLogsToBottom() {
      this.$nextTick(() => {
        const logsContainer = document.getElementById('logs')
        logsContainer.scrollTop = logsContainer.scrollHeight
      })
    }
  }
}
