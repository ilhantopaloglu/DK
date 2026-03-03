let current = "start";

const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart");

function loadQuestion(key) {
    const node = flow[key];
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;
    answersDiv.innerHTML = "";
    resultDiv.style.display = "none";

    node.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerText = answer.text;
        btn.onclick = () => handleAnswer(answer);
        answersDiv.appendChild(btn);
    });
}

function handleAnswer(answer) {
    if (answer.result) {
        showResult(answer.result);
    } else {
        current = answer.next;
        loadQuestion(current);
    }
}

function showResult(text) {
    questionDiv.innerHTML = "";
    answersDiv.innerHTML = "";
    resultDiv.innerHTML = `<strong>Sonuç:</strong><br>${text}`;
    resultDiv.style.display = "block";
    restartBtn.style.display = "block";
}

restartBtn.onclick = function() {
    current = "start";
    restartBtn.style.display = "none";
    loadQuestion(current);
};

loadQuestion(current);
