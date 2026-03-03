let data;
let currentQuestion;
let finalResult = null;

const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const summary = document.getElementById("summary");
const restartBtn = document.getElementById("restart-btn");

fetch("questions.json")
  .then(response => response.json())
  .then(json => {
    data = json;
    loadQuestion(data.start);
  });

function loadQuestion(id) {
  currentQuestion = data.questions[id];
  questionContainer.innerHTML = `<h2>${currentQuestion.text}</h2>`;
  answersContainer.innerHTML = "";
  summary.style.display = "none";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => handleAnswer(answer);
    answersContainer.appendChild(button);
  });
}

function handleAnswer(answer) {
  if (answer.result) {
    finalResult = answer.result;
    showSummary();
  } else {
    loadQuestion(answer.next);
  }
}

function showSummary() {
  questionContainer.innerHTML = "";
  answersContainer.innerHTML = "";

  let message = "";

  if (finalResult === "fast") {
    message = "<strong>FAST TRACK</strong><br>Basitleştirilmiş etki analizi uygulanabilir.";
  } else if (finalResult === "full") {
    message = "<strong>FULL TRACK</strong><br>Detaylı teknik, mali ve sözleşmesel etki analizi gereklidir.";
  }

  summary.innerHTML = message;
  summary.style.display = "block";
  restartBtn.style.display = "block";
}

restartBtn.onclick = function () {
  finalResult = null;
  restartBtn.style.display = "none";
  loadQuestion(data.start);
};
