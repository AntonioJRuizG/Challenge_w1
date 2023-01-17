let currentOperand = '';
let previousOperand = '';
let operationSymbol = '';
let computationResult = '';

const displayData = () => {
    document.querySelector(".lowerDisplayBox").value = currentOperand;
    if (operationSymbol !== '') {
        document.querySelector(".upperDisplayBox").value = `${previousOperand} ${operationSymbol}`;
    } else {
        document.querySelector(".upperDisplayBox").value = '';
    }
}
/* const readupperDisplayBox = () => {
    return document.querySelector(".upperDisplayBox").value;
}

const readDisplay = () => {
    return document.querySelector(".lowerDisplayBox").value;
} */

const compute = () => {

    if ((currentOperand === '' || previousOperand === '') && operationSymbol !== '√') return;
    if (currentOperand[0] === '.') currentOperand = 0 + currentOperand;
    if (currentOperand[currentOperand.length - 1] === '.') currentOperand = currentOperand.toString().slice(-1);
    if (previousOperand[0] === '.') previousOperand = 0 + previousOperand;
    if (previousOperand[currentOperand.length - 1] === '.') previousOperand = previousOperand.toString().slice(-1);

    currentOperand = parseFloat(currentOperand);
    previousOperand = parseFloat(previousOperand);

    switch (operationSymbol) {
        case '√':
            computationResult = Math.sqrt(currentOperand);
            break;
        case '+':
            computationResult = previousOperand + currentOperand;
            break;
        case '-':
            computationResult = previousOperand - currentOperand;
            break;
        case '*':
            computationResult = previousOperand * currentOperand;
            break;
        case '/':
            if (previousOperand === 0) {
                computationResult = 'Cannot divide by zero';
            } else {
                computationResult = previousOperand / currentOperand;
            }
            break;
        default:
            return;
    }

    if (computationResult.toString().length > 10) computationResult = computationResult.toString().slice(0, 10);
    currentOperand = computationResult;
    previousOperand = '';
    operationSymbol = '';

}

const clearDisplay = () => {
    currentOperand = '';
    previousOperand = '';
    operationSymbol = '';
    displayData();
}


const pointButton = document.querySelector(".buttonPoint");
const clearButton = document.querySelector(".buttonC");
const deleteButton = document.querySelector(".buttonCE");
const rootSquare = document.querySelector(".buttonRoot")
const equalButton = document.querySelector(".buttonEqual");
const numberButtons = document.querySelectorAll(".buttonNumber");
const operationButtons = document.querySelectorAll(".operationButton");


deleteButton.addEventListener("click", function () {
    currentOperand = currentOperand.slice(0, -1);
    displayData();
})


pointButton.addEventListener("click", function () {
    if (currentOperand.toString().includes('.')) return;
    currentOperand += ".";
    displayData();
})


clearButton.addEventListener("click", function () {
    clearDisplay();
})


rootSquare.addEventListener("click", function () {

    if (currentOperand === '' || currentOperand < 0 || operationSymbol !== '') return;
    operationSymbol = '√';
    compute();
    displayData();
})


equalButton.addEventListener("click", function () {
    if (operationSymbol === '√') return;
    compute();
    displayData();
})


numberButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (currentOperand.length < 10) currentOperand += button.value;
        displayData();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operationSymbol = button.value;
        previousOperand = currentOperand;
        currentOperand = '';
        displayData();
    });
});

clearDisplay();