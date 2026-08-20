const expression = document.getElementById("basicExpression");
const result = document.getElementById("basicResult");

let currentInput = "";
let previousInput = "";
let operator = "";

/* History */
let calculationHistory = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

function updateDisplay() {
    result.textContent = currentInput || "0";

    if (previousInput && operator) {
        expression.textContent = `${previousInput} ${operator}`;
    } else {
        expression.textContent = "0";
    }
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput = currentInput === "" ? "0." : currentInput + ".";
        updateDisplay();
    }
}

function chooseOperator(op) {
    if (currentInput === "") return;

    if (previousInput !== "") {
        calculate();
    }

    previousInput = currentInput;
    currentInput = "";
    operator = op;

    updateDisplay();
}

function calculate() {
    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }

    const first = parseFloat(previousInput);
    const second = parseFloat(currentInput);

    let answer;

    switch (operator) {
        case "+":
            answer = first + second;
            break;

        case "-":
            answer = first - second;
            break;

        case "*":
            answer = first * second;
            break;

        case "/":
            answer = second === 0 ? "Error" : first / second;
            break;

        case "%":
            answer = first % second;
            break;
    }

    /* Save calculation in history */
    if (answer !== "Error") {
        addToHistory(`${first} ${operator} ${second} = ${answer}`);
    }

    currentInput = String(answer);
    previousInput = "";
    operator = "";

    updateDisplay();
}

function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = "";

    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function toggleSign() {
    if (currentInput === "") return;

    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay();
}


/* Add calculation to History */

function addToHistory(calculation) {
    calculationHistory.unshift(calculation);

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(calculationHistory)
    );

    displayHistory();
}


/* Display History */

function displayHistory() {
    const historyList = document.getElementById("historyList");

    if (!historyList) return;

    historyList.innerHTML = "";

    calculationHistory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        historyList.appendChild(li);
    });
}


/* Clear History */

function clearHistory() {
    calculationHistory = [];

    localStorage.removeItem("calculatorHistory");

    displayHistory();
}


/* Calculator buttons */

document.querySelectorAll(".key").forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (value >= "0" && value <= "9") {
            appendNumber(value);
        }

        else if (value === ".") {
            appendDecimal();
        }

        else if (["+", "-", "*", "/", "%"].includes(value)) {
            chooseOperator(value);
        }

        else if (value === "=") {
            calculate();
        }

        else if (value === "clear") {
            clearCalculator();
        }

        else if (value === "backspace") {
            deleteLast();
        }

        else if (value === "sign") {
            toggleSign();
        }

    });

});


/* Keyboard */

document.addEventListener("keydown", (event) => {

    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    else if (event.key === ".") {
        appendDecimal();
    }

    else if (["+", "-", "*", "/", "%"].includes(event.key)) {
        chooseOperator(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    else if (event.key === "Backspace") {
        deleteLast();
    }

    else if (event.key === "Escape") {
        clearCalculator();
    }

});


/* Start */

updateDisplay();
displayHistory();
