const HexColor = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const colorArea = document.querySelector(".app");
const buttons = document.querySelectorAll(".select-btn");
const columns = document.querySelectorAll(".column-cont");
let color, indexOfCorrect;

main();
showMaxResult();

// Functions
function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandHex() {
  let hex = "#";
  for (i = 0; i < 6; i++) {
    hex += HexColor[getRandInt(HexColor.length)];
  }
  return hex;
}

function main() {
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (e.target.textContent === buttons[indexOfCorrect].textContent) {
        feedback(true);
        change();
      } else {
        feedback(false);
        change();
      }
    });
  });
  change();
}

function change() {
  color = getRandHex();
  indexOfCorrect = getRandInt(buttons.length);

  colorArea.style.background = color;
  buttons.forEach((btn) => {
    btn.textContent = getRandHex();
  });

  buttons[indexOfCorrect].textContent = color;

  moveColumns();

  console.log(`Ответ: ${indexOfCorrect + 1}`);
}

function feedback(outcome) {
  if (outcome) {
    document.querySelector(".buttons").classList.toggle("buttons-win");
    setTimeout(() => {
      document.querySelector(".buttons").classList.toggle("buttons-win");
    }, 444);

    document.querySelector(".score").textContent++;
  } else {
    document.querySelector(".buttons").classList.toggle("buttons-lose");
    setTimeout(() => {
      document.querySelector(".buttons").classList.toggle("buttons-lose");
    }, 444);

    damage();
  }
}

function damage() {
  document.querySelector(".hp").remove();

  if (!document.querySelector(".hp")) {
    saveMaxResult();
    alert(
      `Уу-уУ-пc, игра закончена! Счет: ${
        document.querySelector(".score").textContent
      }`
    );
    location.reload();
  }
}

function moveColumns() {
  let numbers = [];
  let number;
  let percent = [];

  buttons.forEach((btn) => {
    number = btn.textContent;
    number = number.substring(1);
    numbers.push(number.match(/(..)/g));
  });

  numbers.forEach((nu) => {
    for (i = 0; i < 3; i++) {
      percent.push(Math.floor((parseInt(nu[i], 16) / 255) * 100));
    }
  });

  document.querySelectorAll(".column").forEach((col, i) => {
    col.style.height = `${percent[i]}%`;
  });
}

function saveMaxResult() {
  if (
    Number(document.querySelector(".score").textContent) >
    Number(localStorage.getItem("max_score"))
  ) {
    localStorage.setItem(
      "max_score",
      document.querySelector(".score").textContent
    );
  }
}

function showMaxResult() {
  if (!localStorage.getItem("max_score")) {
    document.querySelector(".max-score").textContent = `Рекорд: 0`;
  } else {
    document.querySelector(
      ".max-score"
    ).textContent = `Рекорд: ${localStorage.getItem("max_score")}`;
  }
}
