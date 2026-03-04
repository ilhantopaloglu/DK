// script.js

// HTML elementlerini al
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");

// Rapor için veri
let reportData = {
    type: "",
    reason: "",
    application: ""
};

// Geçmişi tutmak için stack
let historyStack = [];

// Sayfa yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion("start");
});

// Soruyu yükle
function loadQuestion(key) {
    const node = flow[key];
    
    // Geçmişi sakla
    if (historyStack.length === 0 || historyStack[historyStack.length -1] !== key) {
        historyStack.push(key);
    }

    // Soruyu göster
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;
    answersDiv.innerHTML = "";
    resultDiv.style.display = "none";

    // Cevapları buton olarak ekle
    node.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => {
            
            // Ürün tipi ilk soruda kaydet
            if (key === "start") reportData.type = ans.text;

            // Güncelleme nedeni kaydet
            if (key.includes("update_reason")) reportData.reason = ans.text;

            // Eğer result varsa rapor hazırla
            if (ans.result) {
                reportData.application = ans.result;
                showReport();
            } 
            // Eğer next node varsa devam et
            else if (ans.next) {
                loadQuestion(ans.next);
            }
        };
        answersDiv.appendChild(btn);
    });

    // GERİ butonu (sadece geçmiş varsa)
    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => {
        if (historyStack.length > 1) {
            // Şu anki soruyu stack'ten çıkar
            historyStack.pop();
            // Önceki soruyu yükle
            const prevKey = historyStack.pop(); 
            loadQuestion(prevKey);
        }
    };
    answersDiv.appendChild(backBtn);

    // ANA SAYFA butonu
    const homeBtn = document.createElement("button");
    homeBtn.textContent = "ANA SAYFA";
    homeBtn.onclick = () => {
        historyStack = [];
        loadQuestion("start");
    };
    answersDiv.appendChild(homeBtn);
}

// Rapor göster
function showReport() {
    const text = `
Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
Uygulama bilgisi: ${reportData.application}
    `;
    resultDiv.innerHTML = `<pre>${text}</pre>`;
    resultDiv.style.display = "block";
}
