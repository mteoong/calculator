let numbersIndex = 0;
let numbers = [""];
let operators = [];
let pressedEquals = false;

function calculator(input) {
    if(isNaN(parseInt(input))) {
        pressedEquals = false;
        if (input === "dot") {
            numbers[numbersIndex] += ".";
            screen.innerText = numbers[numbersIndex];
        } else if (input === "neg") {
            numbers[numbersIndex] = "-" + numbers[numbersIndex];
            screen.innerText = numbers[numbersIndex];
        } else if (input === "AC" || input === "C") {
            calculate(0, 0, input);
            screen.innerText = numbers[numbersIndex];
        } else if (input === "equals") {
            if(numbersIndex == 0) {
                pressedEquals = true;
            } else if (numbersIndex == 1) {
                numbers[0] = calculate(numbers[0], numbers[1], operators[0]);
                numbers.pop();
                operators.pop();
                screen.innerText = numbers[0];
                numbersIndex = 0;
                pressedEquals = true;
            }
        } else if (operators.length === 0) {
            if (!numbers[numbersIndex]) {
                missingNumber(input);
            } else {
                operators.push(input);
                numbers.push("");
                numbersIndex = 1;
            }
        } else if (operators.length === 1) {
            if(numbers[numbersIndex] === "") {
                missingNumber(input);
            } else if (operators[0] === "equals") {
                operators[0] === input;
            } else {
                numbers[0] = calculate(numbers[0], numbers[1], operators[0]);
                numbers.pop();
                operators[0] = input;
                numbers.push("");
                screen.innerText = numbers[0];
            }
        }
    } else if (pressedEquals) {
        numbers = [""];
        numbers[0] += input;
        screen.innerText = numbers[0];
        pressedEquals = false;
    } else {
        numbers[numbersIndex] += input;
        screen.innerText = numbers[numbersIndex];
    }
}

function missingNumber(choice) {
    console.log(`You must have a number before choosing ${choice}`);
}

function calculate(arg1, arg2, operation) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    switch(operation) {
        case "AC":
            numbersIndex = 0;
            numbers = [""];
            operators = [];
            break;
        case "C":
            numbers[numbersIndex] = "";
            break;
        case "exp":
            return arg1 ** arg2;
        case "div":
            return arg1 / arg2;
        case "mul":
            return arg1 * arg2;
        case "sum":
            return arg1 + arg2;
        case "dif":
            return arg1 - arg2;
        default:
            break;              
    }
}

/* Setting Event Listeners*/

let screen = document.querySelector(".screen");

for (i = 0; i < 10; i++) {
    let number = document.querySelector(`#b${i}`);
    number.addEventListener('click', createFunction(i));
}

function createFunction(i) {
    return () => calculator(i);
}

const AC = document.querySelector("#AC");
AC.addEventListener('click', createFunction("AC"))

const C = document.querySelector("#C");
C.addEventListener('click', createFunction("C"))

const exp = document.querySelector("#exp");
exp.addEventListener('click', createFunction("exp"))

const div = document.querySelector("#div");
div.addEventListener('click', createFunction("div"))

const mul = document.querySelector("#mul");
mul.addEventListener('click', createFunction("mul"))

const sum = document.querySelector("#sum");
sum.addEventListener('click', createFunction("sum"))

const dif = document.querySelector("#dif");
dif.addEventListener('click', createFunction("dif"))

const neg = document.querySelector("#neg");
neg.addEventListener('click', createFunction("neg"))

const dot = document.querySelector("#dot");
dot.addEventListener('click', createFunction("dot"))

const equals = document.querySelector("#equals");
equals.addEventListener('click', createFunction("equals"))
