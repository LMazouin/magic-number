const monitor = document.querySelector(".screen");
const text = document.querySelector(".text");

let count;
let attempts;
let answer;
let min;
let max;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createProgressBar = () => {
  const div = document.createElement("div");
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  div.appendChild(progressBar);
  return div;
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

const gameStart = () => {
  attempts = 5;
  count = 0;
  min = 0;
  max = 10;
  answer = getRandomNumber(min, max);
  console.log(answer);
  const text = document.querySelector(".text");
  text.innerHTML = "";
  const title = document.createElement("h1");
  const titleText = document.createTextNode("Find the Magic Number!");
  title.append(titleText);
  text.appendChild(title);
  const subtitle = document.createElement("h2");
  const subtitleText = document.createTextNode(`Hint: ${min} <= ? <= ${max}`);
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
  const progressBar = createProgressBar();
  text.appendChild(progressBar);
};

monitor.addEventListener("keypress", (event) => {
  if (
    event.target.value &&
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

    const distance = Math.floor((Math.abs(answer - value) / max) * 100);

    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = `${100 - distance}%`;

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
      event.target.setAttribute("disabled", "true");
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
