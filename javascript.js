// Get the calculator display element
const display = document.getElementById('display');

// Variables to store the current calculation state
let currentInput = '';
let operator = null;
let previousInput = '';
let resultDisplayed = false;

// Function to handle button clicks
function handleButtonClick(value) {
    // If the user clicked a number or a decimal point
    if (!isNaN(parseFloat(value)) || value === '.') {
        // If a previous result is displayed, start a new calculation
        if (resultDisplayed) {
            currentInput = value;
            resultDisplayed = false;
        } else {
            // Append the value to the current input
            if (value === '.' && currentInput.includes('.')) {
                return; // Prevent multiple decimal points
            }
            currentInput += value;
        }
        display.value = currentInput;
    }
    // If the user clicked an operator
    else if (['+', '-', '*', '/'].includes(value)) {
        // If there's already a previous input and an operator, calculate the result first
        if (previousInput && operator && currentInput) {
            performCalculation();
        }
        // Store the current input and the new operator
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        resultDisplayed = false;
    }
    // If the user clicked the equals button
    else if (value === '=') {
        if (previousInput && operator) {
            performCalculation();
        }
    }
    // If the user clicked the clear button
    else if (value === 'clear') {
        // Reset all state variables
        currentInput = '';
        operator = null;
        previousInput = '';
        resultDisplayed = false;
        display.value = '0';
    }
}

// Function to perform the calculation
function performCalculation() {
    try {
        // Convert inputs to numbers
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = 0;

        // Perform the calculation based on the operator
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    display.value = "Error";
                    return; // Avoid division by zero
                }
                result = num1 / num2;
                break;
        }

        // Display the result and update the state
        display.value = result;
        currentInput = result.toString();
        previousInput = '';
        operator = null;
        resultDisplayed = true;
    } catch (error) {
        // Handle any unexpected errors
        display.value = "Error";
    }
}

// Add a click event listener to each button on the calculator
document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleButtonClick(value);
    });
});
