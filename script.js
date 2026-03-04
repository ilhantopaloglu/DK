// script.js
let historyStack = [];
let currentKey = "start";

document.addEventListener("DOMContentLoaded", function() {

    if (typeof flow === "undefined") {
        console.error("flow objesi yüklenmedi! questions.js yüklü mü?");
        return;
    }

    let current = "start";

    const questionDiv = document.getElementById("question");
    const answersDiv = document.getElementById("answers");
    const resultDiv = document.getElementById("result");
    const restartBtn = document.getElementById("restart");

    if (!questionDiv || !answersDiv || !resultDiv || !restartBtn) {
        console.error("HTML elementleri bulunamadı. ID’leri kontrol et!");
        return;
    }

    function loadQuestion(key) {
    const node = flow[key];

    currentKey = key;
    historyStack.push(key);

    questionDiv.innerHTML = `<h3>${node.text}</h3>`;
    answersDiv.innerHTML = "";
    resultDiv.style.display = "none";

    node.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;

        btn.onclick = () => {
            if (answer.next) {
                loadQuestion(answer.next);
            } else if (answer.result) {
                showResult(answer.result);
            }
        };

        answersDiv.appendChild(btn);
    });

    renderNavigationButtons();
}

    function renderNavigationButtons() {

    const navDiv = document.getElementById("navButtons");
    navDiv.innerHTML = "";

    // GERİ butonu
    if (historyStack.length > 1) {
        const backBtn = document.createElement("button");
        backBtn.textContent = "← GERİ";

        backBtn.onclick = () => {
            historyStack.pop(); // mevcut
            const previous = historyStack.pop(); // bir önceki
            loadQuestion(previous);
        };

        navDiv.appendChild(backBtn);
    }

    // ANA SAYFA butonu
    const homeBtn = document.createElement("button");
    homeBtn.textContent = "🏠 ANA SAYFA";

    homeBtn.onclick = () => {
        historyStack = [];
        loadQuestion("start");
    };

    navDiv.appendChild(homeBtn);
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
    resultDiv.innerHTML = `<h3>Sonuç</h3><p>${text}</p>`;
    resultDiv.style.display = "block";

    renderNavigationButtons();
}

    restartBtn.onclick = function() {
        current = "start";
        restartBtn.style.display = "none";
        loadQuestion(current);
    };

    loadQuestion(current);
});
