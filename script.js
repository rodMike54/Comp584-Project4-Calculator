//Comp584 Project 4 Calculator
//Michael Rodriugez


// Get the display and all calculator buttons
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Variables used for calculations
let firstNumber = 0;
let operator = "";
let newNumber = true;

// Check which button was clicked
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.getAttribute("data-value");
        handleButton(value);
    });
});

// Decide what each button should do
function handleButton(value) {

    // Clear everything
    if (value === "C") {
        display.textContent = "0";
        firstNumber = 0;
        operator = "";
        newNumber = true;
    }

    // Remove the last digit
    else if (value === "back") {
        if (newNumber || display.textContent === "Error") {
            display.textContent = "0";
        } else if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = "0";
        }
    }

    // Calculate the answer
    else if (value === "=") {
        calculate();
    }

    // Save the first number and operator
    else if (value === "+" || value === "-" ||
             value === "*" || value === "/") {

        if (display.textContent === "Error") {
            return;
        }

        firstNumber = Number(display.textContent);
        operator = value;
        newNumber = true;
    }

    // Add numbers to the screen
    else {
        if (newNumber || display.textContent === "Error") {
            if (value === ".") {
                display.textContent = "0.";
            } else {
                display.textContent = value;
            }
            newNumber = false;
        } else {

            // Stop users from entering two decimal points
            if (value === "." && display.textContent.includes(".")) {
                return;
            }

            if (display.textContent === "0" && value !== ".") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }
    }
}

// Calculate the two numbers
function calculate() {
    if (operator === "" || newNumber) {
        return;
    }

    let secondNumber = Number(display.textContent);
    let result = 0;

    // Addition
    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    // Subtraction
    else if (operator === "-") {
        result = firstNumber - secondNumber;
    }

    // Multiplication
    else if (operator === "*") {
        result = firstNumber * secondNumber;
    }

    // Division
    else if (operator === "/") {

        // Prevent division by zero
        if (secondNumber === 0) {
            display.textContent = "Error";
            operator = "";
            newNumber = true;
            return;
        }

        result = firstNumber / secondNumber;
    }

    // Show the answer on the screen
    display.textContent = String(Number(result.toFixed(8)));

    // Reset for another calculation
    operator = "";
    newNumber = true;
}
