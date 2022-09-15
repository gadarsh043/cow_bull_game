export default {
  name: 'validate',
  methods: {
    validate (unique, passVal, position) {
      switch (unique) {
        case 'number1':
          if (this.checkSomething(passVal, position)) {
            this.number1Validity = 'valid'
          } else {
            this.number1Validity = 'invalid'
          }
          break
        case 'number2':
          if (this.checkSomething(passVal, position)) {
            this.number2Validity = 'valid'
          } else {
            this.number2Validity = 'invalid'
          }
          break
        case 'number3':
          if (this.checkSomething(passVal, position)) {
            this.number3Validity = 'valid'
          } else {
            this.number3Validity = 'invalid'
          }
          break
        case 'number4':
          if (this.checkSomething(passVal, position)) {
            this.number4Validity = 'valid'
          } else {
            this.number4Validity = 'invalid'
          }
          break
      }
    },
    checkSomething (value, position) {
      const numberString = value
      value = Number(value)
      if ((value !== 0 || value === null) && !this.guessingNumber.includes(value) && !isNaN(value)) {
        this.guessingNumber.splice(position, 1, value)
        return true
      } else if (numberString === null) {
        return true
      } else {
        return false
      }
    }
  }
}
