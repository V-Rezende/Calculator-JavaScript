
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        //Inside the constructor, the code sets up the initial state of the calculator object.
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    //This clear method is responsible for clearing the current and previous operands and resetting the operation to undefined, effectively clearing the calculator's memory and preparing it for a new calculation.

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    //The slice() method is used to extract a portion of a string. In this case, it is extracting a substring starting from the first character (index 0) and ending one character before the last character (index -1). So, -1 refers to the last character in the string, and the substring will end just before this last character.


    //We need the numbers to be appended not added
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation 
        // Convert a string to a number
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+' :
                computation = prev + current 
                break

            case '-' :
                computation = prev - current 
                break

            case 'x' :
                computation = prev * current 
                break

            case '÷' :
                computation = prev / current 
                break
            default:
                return
        }
        
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }   else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}
    
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
//If there are multiple elements with the data-number attribute, and you want to select all of them, you can use document.querySelectorAll instead, which will return a NodeList (similar to an array) containing all the matching elements.

const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]') 

const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButtons.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButtons.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButtons.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})