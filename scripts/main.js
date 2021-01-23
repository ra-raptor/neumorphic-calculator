class Calculator {
  constructor(output1, output2) {
    this.output1 = output1;
    this.output2 = output2;
    this.clear();
    this.lightTheme = true;
  }
  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) {
      return;
    }

    this.currentOperation =
      this.currentOperation.toString() + number.toString();
  }
  chooseOperation(operator) {
    if (this.currentOperation === "") {
      return;
    }
    if (this.previousOperation != "") {
      this.compute();
    }
    this.operation = operator;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperation);
    const curr = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        break;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
  }
  updateDisplay() {
    this.output2.innerText = this.currentOperation;
    if (this.operation != null) {
      this.output1.innerText = `${this.previousOperation} ${this.operation}`;
    } else {
      this.output1.innerText = this.previousOperation;
    }
  }
  toggleTheme() {
    if (this.lightTheme) {
      document.body.style.background = "#131419";
      theme.innerHTML = "<i class='fa fa-moon '></i>";
      document.querySelector("#wrapper").classList.add("wrapper-dark");
      document.querySelector("#wrapper").classList.remove("wrapper-light");
    } else {
      document.body.style.background = "#e8eff5";
      theme.innerHTML = "<i class='fa fa-sun '></i>";
      document.querySelector("#wrapper").classList.remove("wrapper-dark");
      document.querySelector("#wrapper").classList.add("wrapper-light");
    }
    this.lightTheme = !this.lightTheme;
  }
}

const numbers = document.querySelectorAll(".number");
const theme = document.querySelector(".theme");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const equals = document.querySelector(".equals");
const operators = document.querySelectorAll(".operation");
const output1 = document.querySelector(".output1");
const output2 = document.querySelector(".output2");

const calculator = new Calculator(output1, output2);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    console.log("hello");
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equals.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

del.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
  ``;
});

theme.addEventListener("click", (btn) => {
  calculator.toggleTheme();
});
