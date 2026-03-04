const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    type: "",
    reason: "",
    level: "",  // Uygunsuzluk seviyesi
    application: "",
    note: ""
};

let history = [];

function loadQuestion(key) {
    const node = flow[key];

    // Buton alanı temizle
    answersDiv.innerHTML = "";
    questionDiv.innerHTML = "";
    resultDiv.style.display = "none";

    // GERİ ve ANA SAYFA butonları üstte
    navDiv.innerHTML = "";
    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => {
        if(history.length > 0) loadQuestion(history.pop());
    };
    navDiv.appendChild(backBtn);

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "ANA SAYFA";
    homeBtn.onclick = () => {
        history = [];
        loadQuestion("start");
    };
    navDiv.appendChild(homeBtn);

    // Soruyu göster
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;

    // Not alanı ekle
    const noteInput = document.createElement("textarea");
    noteInput.placeholder = "İhtiyaç duyulması halinde ek açıklama aşağıdaki alana yazılabilir";
    noteInput.style.width = "100%";
    noteInput.style.height = "60px";
    answersDiv.appendChild(noteInput);

    // Cevap butonlarını ekle
    node.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.style.display = "block";
        btn.style.margin = "5px 0";

        btn.onclick = () => {
            history.push(key); // geçmişe ekle

            // Ürün tipi
            if (key === "start") reportData.type = ans.text;

            // Güncelleme nedeni
            if (key.includes("update_reason")) reportData.reason = ans.text;

            // Uygunsuzluk seviyesi kaydet
            if (key.includes("nonconformity_level")) reportData.level = ans.text;

            // Kullanıcının notunu al
            reportData.note = noteInput.value;

            // Eğer result varsa rapor göster
            if (ans.result) {
                reportData.application = ans.result;
                showReport();
            } 
            else if (ans.next) {
                loadQuestion(ans.next);
            }
        };
        answersDiv.appendChild(btn);
    });
}

function showReport() {
    let text = `
Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
`;

    if(reportData.level) text += `Uygunsuzluğun yaşandığı seviye: ${reportData.level}\n`;

    text += `Uygulama bilgisi: ${reportData.application}\n`;

    if(reportData.note) text += `Ek açıklama: ${reportData.note}`;

    resultDiv.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word; background:#cce5ff; padding:10px; border-radius:5px;">${text}</pre>`;
    resultDiv.style.display = "block";
}

// Başlat
loadQuestion("start");
