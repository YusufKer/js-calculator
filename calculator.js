/*/I'm creating a new object called Calculator, which will contain all of the methods that
I'll need the calculator to perform*/
class Calculator{
	//when called, the calculator will consider 2 variables viz the previous input and the current input
	constructor(previousOperandTextElement,currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}
	//the clear function will simply set both the previous and current operand to empty strings
	clear(){
		this.currentOperand = ''
		this.previousOperand = ''
		//the operation chosen will also be set to undefined
		this.operation = undefined
	}

	delete(){
		//This function will turn the current operand to a string so that I will be able to slice off the last character
		this.currentOperand = this.currentOperand.toString().slice(0,-1)
	}

	appendNumber(number){
		//this appends a number to the screen
		//if the current operand already contains a period, then return. i.e dont execute futher into the code
		if(number==="." && this.currentOperand.includes(".")) return
		//this appends the number clicked to the current operand 	
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation){
		//If the current operand is empty, it won't execute further into the code
		if(this.currentOperand === '') return
		//if the choose operation is called, and there is a previous operand, the compute function is called	
		if(this.previousOperand !== ''){
			this.compute()
		}
		this.operation = operation 
		//it then replaces the previous operand with the current operand
		this.previousOperand = this.currentOperand
		//then it sets the current operand to an empty string
		this.currentOperand = ''
	}

	compute(){
		//I'm initialising a variable called computation which I will use to store the calculated value
		let computation
		//changing the operands from strings to floats so that I may do calculations 
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		//if both the previous and current operand are not numnbers. don't execute further
		if(isNaN(prev)||isNaN(current)) return
		switch (this.operation){
			case '+':
				computation = prev + current 
				break
			case '-':
				computation = prev - current
				break
			case '*':
			computation = prev * current
				break
			case '/':
			computation = prev / current
				break
			default:
				return
		}
		//set the current operand to the value of the computation
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''

	}

	updateDisplay(){
		this.currentOperandTextElement.innerText = this.currentOperand
		this.previousOperandTextElement.innerText = this.previousOperand
	}
}
//I'm creaating variables for each of the buttons on the calculato
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
//creating a new calculator and passing into it the precious and current operands, which at this point are empty strings
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
//Bellow I'm adding event listeners('click') to each button and choosing which functions to call
numberButtons.forEach(button => {
	button.addEventListener('click', ()=>{
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButtons.forEach(button =>{
	button.addEventListener('click',()=>{
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	} )
})

equalsButton.addEventListener('click', button =>{
	calculator.compute()
	calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
	calculator.clear()
	calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()=>{
	calculator.delete()
	calculator.updateDisplay()
})