const displayText = document.querySelector('#display-text')
const keyboard = document.querySelector('#keyboard')

const operations = {
  'add': (a, b) => a + b,
  'subtract': (a, b) => a - b,
  'multiply': (a, b) => a * b,
  'divide': (a, b) => a / b
}

let previousValue = 0
let currentValue = '0'
let currentOperation = null

let newValueExpected = true
let repeatCalcAvailable = false

show(currentValue)

keyboard.onclick = ({ target }) => {
  if (target.classList.contains('key-button')) {
    if (target.value) {
      if (currentValue === '0' || newValueExpected) {
        currentValue = ''
      }

      currentValue += target.value
      newValueExpected = false
      repeatCalcAvailable = false
      show(currentValue)

    } else if (target == decimal) {
      if (currentValue.includes('.')) return

      currentValue += '.'
      newValueExpected = false

      show(currentValue)

    } else if (target == clear) {
      currentValue = '0'
      previousValue = null
      currentOperation = null

      show(currentValue)

    } else if (target == backspace) {
      currentValue = String(currentValue).slice(0, -1)

      if (currentValue === '') currentValue = '0'

      show(currentValue)

    } else if (target == equals) {
      if (currentOperation) {
        if (repeatCalcAvailable) {
          [previousValue, currentValue] = [currentValue, previousValue]
        }

        const value = currentValue

        currentValue = currentOperation(previousValue, +currentValue)
        previousValue = value

        show(currentValue)

        repeatCalcAvailable = true
      }

    } else if (target.classList.contains('op')) {
      currentOperation = operations[target.id]
      previousValue = +currentValue
      newValueExpected = true
    }
  }
}

function show(value) {
  displayText.value = value
}
