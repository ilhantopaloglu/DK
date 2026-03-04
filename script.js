const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    type: "",
    reason: "",
    nonconformityLevel: "",
    application: ""
};

// Soruyu yükle
function loadQuestion(key) {
    const node = flow[key];

    // Nav butonları (GERİ + ANA SAYFA) üste taşı
    navDiv.innerHTML = "";
    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => loadPrevious();
    navDiv.appendChild(backBtn);

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "ANA SAYFA";
    homeBtn.onclick = () => loadQuestion("start");
    navDiv.appendChild(homeBtn);

    // Soruyu göster
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;
    answersDiv.innerHTML = "";
    resultDiv.style.display = "none";

    // Her cevabı buton olarak ekle
    node.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => {
            // Ürün tipi
            if (key === "start") reportData.type = ans.text;

            // Güncelleme nedeni
            if (key.includes("update_reason")) reportData.reason = ans.text;

            // Uygunsuzluk seviyesi
            if (key === "hardware_nonconformity_level") reportData.nonconformityLevel = ans.text;

            // Eğer result varsa rapora yaz
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
}

// Rapor gösterme
function showReport() {
    let text = `
Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
`;

    // Uygunsuzluk seviyesi varsa ekle
    if (reportData.nonconformityLevel) {
        text += `Uygunsuzluğun yaşandığı seviye: ${reportData.nonconformityLevel}\n`;
    }

    text += `Uygulama bilgisi: ${reportData.application}`;

    // Raporu göster (taşmayı önlemek için style ayarı)
    resultDiv.innerHTML = `<div style="
        background-color: #cce5ff;
        padding: 10px;
        border-radius: 5px;
        white-space: pre-wrap;
        word-wrap: break-word;
    ">${text}</div>`;
    resultDiv.style.display = "block";
}

// GERİ fonksiyonu (basit bir stack kullanabiliriz)
let historyStack = [];
function loadPrevious() {
    if (historyStack.length > 0) {
        const prev = historyStack.pop();
        loadQuestion(prev);
    }
}

// loadQuestion çağrısında historyStack'e push et
const originalLoadQuestion = loadQuestion;
loadQuestion = function(key) {
    if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== key) {
        historyStack.push(key);
    }
    originalLoadQuestion(key);
}

// Sayfa açıldığında başlat
window.onload = () => loadQuestion("start");
