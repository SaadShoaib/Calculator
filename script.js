const calculator = document.querySelector(".container");
const keys = calculator.querySelector(".keys");
const display = calculator.querySelector(".display");

//an event that saves the target key pressed
keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        //do something
        //determines what data-action was pressed.
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove("damn"));
            

        if (!action) {
            if (displayNum === "0" || 
                previousKeyType === "operator" ||
                previousKeyType === "calculate") {
                display.textContent = keyContent;
            } else { 
                display.textContent = displayNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }
        if (action === "decimal") { 
            if(!displayNum.includes(".")) {
            display.textContent = displayNum + ".";
        } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
            display.textContent = "0";
        }
        calculator.dataset.previousKeyType = "decimal";
        }
        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            
            //add custom attribute

            const firstVal = calculator.dataset.firstVal;
            const operator = calculator.dataset.operator;
            const secondVal = displayNum;

            if (firstVal && 
                operator &&
                previousKeyType !== "operator" &&
                previousKeyType !== "calculate") 
            {
                const calcVal = calculate(firstVal, operator, secondVal);
                display.textContent = calcVal;

                calculator.dataset.firstVal = calcVal;
            } else {
                calculator.dataset.firstVal = displayNum;
            }
            
            key.classList.add("damn");
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.operator = action;
        }



        if (action === "calculate") {
            let firstVal = calculator.dataset.firstVal;
            const operator = calculator.dataset.operator;
            let secondVal = displayNum;

            if(firstVal){
                if (previousKeyType === "calculate"){
                    firstVal = displayNum;
                    secondVal = calculator.dataset.modVal;
                }
                display.textContent = calculate(firstVal, operator, secondVal);
            }
            calculator.dataset.modVal = secondVal;
            calculator.dataset.previousKeyType = "calculate";
        }

        function calculate(a, operator, b){
            let c = parseFloat(a);
            let d = parseFloat(b);
            let result = "";
            if (operator === "add"){
                result = c + d;
            }
            else if (operator === "subtract"){
                result = c - d;
            }
            else if (operator === "divide"){
                result = c/d;
            }
            else if (operator === "multiply"){
                result = c * d;
            }
            return result;
        }
        
    }
});




