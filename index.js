//Creating a calculator class to instantiate the calculator objects and store the input
class Calculator {
  constructor(currentOperandElement, previousOperandElement) {
    this.currentOperandElement = currentOperandElement;
    this.previousOperandElement = previousOperandElement;
    this.clear();
  }

  //METHODS OF CALCULATOR

  // clear-screen
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
  }

  //appendNumber
  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  //append operators
  addOperator(operator) {
    this.previousOperand = this.currentOperand.toString() + operator.toString();
    this.currentOperand = "";
  }

  //delete One digit
  deleteDigit() {
    if (!this.previousOperand && this.currentOperand) {
      let operandString = this.currentOperand.split("");
      operandString.pop();
      this.currentOperand = operandString.join("");
    } else if (this.previousOperand && !this.currentOperand) {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
    } else if (this.currentOperand && this.previousOperand) {
      this.currentOperand = this.previousOperand + " " + this.currentOperand;
      this.previousOperand = "";
    }
  }

  //update the display
  displayUpdate(value) {
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousOperand;
  }

  //do calculations
  workOut() {
    let current = this.currentOperand;
    let previous = this.previousOperand;
    //get the operation
    const operator = previous.match(/[*/+-]/g);
    operator.forEach((operator) => {
      let value = 0;
      let firstString = parseInt(current);
      let arr = previous.split("");
      arr.splice(arr.length - 1, 1);
      let second = arr;
      let secondString = second.join("");
       
      //using the switch statement to implement DRY

      switch(operator) {
        case '+':
            value = parseFloat(firstString) + parseFloat(secondString);
        case '-': 
            value = parseFloat(secondString) - parseFloat(firstString);
      }
      
      this.currentOperand = value;
      this.previousOperand = '';

    });
  }
}

// Getting all the calculator elements
const numberButtons = document.querySelectorAll("[data-number");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const computeButton = document.querySelector("[data-result]");
const operationButtons = document.querySelectorAll("[data-operation]");
const currentOperandElement = document.querySelector("[data-current]");
const previousOperandElement = document.querySelector("[data-previous]");

// Creating the calculator object
const calculator = new Calculator(
  currentOperandElement,
  previousOperandElement
);

//adding eventlistener to append text to the screen
numberButtons.forEach((number) => {
  number.addEventListener("click", (e) => {
    calculator.appendNumber(number.innerText);
    calculator.displayUpdate();
  });
});

//eventlistener to clear the screen
clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.displayUpdate();
});

//deleting the last character
deleteButton.addEventListener("click", () => {
  calculator.deleteDigit();
  calculator.displayUpdate();
});

//adding the operator
operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    calculator.addOperator(operationButton.innerText);
    calculator.displayUpdate();
  });
});

//doing the actual calculation
computeButton.addEventListener("click", () => {
  calculator.workOut();
  calculator.displayUpdate();
});
