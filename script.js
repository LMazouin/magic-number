const monitor = document.querySelector(".screen");
const text = document.querySelector(".text");

let count;
let attempts;
let answer;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1);
};

const createInput = (label) => {
  const inputGroup = document.createElement("label");
  const input = document.createElement("input");
  input.setAttribute("autocomplete", "false");
  input.focus();
  const span = document.createElement("span");
  const spanText = document.createTextNode(label);
  span.append(spanText);
  inputGroup.appendChild(span);
  inputGroup.appendChild(input);
  return inputGroup;
};

const checkUserInput = (value, answer) => {
  return value === answer ? true : false;
};

const gameOver = () => {
  let success = false;
  success = answer === input.value ? true : false;
};

const playAgain = () => {};

const gameStart = () => {
  attempts = 5;
  count = 0;
  let min = 0;
  let max = 10;
  answer = getRandomNumber(min, max);
  const text = document.querySelector(".text");
  text.innerHTML = "";
  const title = document.createElement("h1");
  const titleText = document.createTextNode("Find the Magic Number!");
  title.append(titleText);
  text.appendChild(title);
  const subtitle = document.createElement("h2");
  const subtitleText = document.createTextNode(`Hint: ${min} < ? < ${max}`);
  subtitle.append(subtitleText);
  text.appendChild(subtitle);
  const remainingAttempts = document.createElement("h2");
  const remainingAttemptsText = document.createTextNode(
    `Remaining attempts: ${attempts}`
  );
  remainingAttempts.setAttribute("id", "remaining-attempts");
  remainingAttempts.append(remainingAttemptsText);
  text.appendChild(remainingAttempts);
  const input = createInput("Enter a number:");
  input.setAttribute("id", "user-input");
  text.appendChild(input);
};

monitor.addEventListener("keypress", (event) => {
  if (
    event.code === "Enter" &&
    event.target.parentElement.id === "user-input"
  ) {
    count++;
    attempts--;
    const value = parseInt(event.target.value);
    const message = document.createElement("p");
    let messageText = "";
    const remainingAttempts = document.getElementById("remaining-attempts");
    remainingAttempts.innerText = `Remaining attempts: ${attempts}`;

    if (value !== answer && attempts > 0) {
      document.querySelector(".text p")?.remove();
      messageText = document.createTextNode(
        `attempt ${count} incorrect answer, try again`
      );
      event.target.value = "";
    } else if (value !== answer && attempts <= 0) {
      document.querySelector(".text p")?.remove();
      messageText = document.createTextNode("game over");
    } else {
      document.querySelector(".text p")?.remove();
      messageText = document.createTextNode("correct answer");
      attempts = 0;
    }
    message.append(messageText);
    text.appendChild(message);
    if (attempts <= 0) {
      const input = createInput("Play again? (Y/N):");
      input.setAttribute("id", "play-again");
      text.appendChild(input);
    }
  }
  if (
    event.code === "Enter" &&
    event.target.parentElement.id === "play-again"
  ) {
    const value = event.target.value;
    if (value === "Y") {
      gameStart();
    } else if (value === "N") {
      text.innerHTML = "";
    }
  }
});

gameStart();
