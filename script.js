const numbers = document.querySelectorAll("[data-number]")
const operations = document.querySelectorAll("[data-operation]")
const display = document.querySelector("[data-output]")
const clearKey = document.querySelector("[data-clear]")
const deleteKey = document.querySelector("[data-delete]")
const equal = document.querySelector("[data-equal]")
const decimalKey = document.querySelector("[data-decimal]")

let firstOperand = "";
let selectedOperator = "";
let secondOperand = "";

numbers.forEach(number => {
    number.addEventListener("click", () => {
        updateDisplay(number.textContent)
    })
})

operations.forEach(operation => {
    operation.addEventListener("click", () => {
        setOperator(operation.textContent);
    })
})

equal.addEventListener("click", equals);
clearKey.addEventListener("click", clear);
decimalKey.addEventListener("click", inputDecimal)
deleteKey.addEventListener("click", deleteChar)

//Handles the calculation
function equals(){
    if(selectedOperator === "/" && display.textContent === "0"){
      alert("Don't divide by 0, it'll cause the universe to collapse")
      clear();
      return;
    }
    secondOperand = display.textContent;
    display.textContent = Math.round(operate(firstOperand, selectedOperator, secondOperand));
}

//Sets the operator
function setOperator(operatorValue) {
    firstOperand = display.textContent;
    selectedOperator = operatorValue;
    display.textContent = "";
}

//Calls the relevant function 
function operate(a, operator, b) {
    const c = Number(a)
    const d = Number(b)
    
    if (operator == "+"){
        return add(c, d)
    } else if (operator == "-"){
        return subtract(c, d)
    } else if (operator == "/"){
        return divide(c, d)
    } else if (operator == "*"){
        return multiply(c, d);
    }
}


function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function divide(a,b) {
    return a / b;
}

function multiply(a,b) {
    return a * b;
}

//Clears the display
function clear() {
  display.textContent = "";
  firstOperand = "";
  secondOperand = "";
  selectedOperator = "";
}

//Updates the display by adding the new number
function updateDisplay(number) {
    display.textContent += number;
}

//Dealing with decimals 
function inputDecimal() {
  if(!display.textContent.includes(".")){

    display.textContent += ".";
  }
}

//Deletes the characters from the screen;
function deleteChar() {
  display.textContent = display.textContent.toString().slice(0, -1);
}


