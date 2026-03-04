// script.js

let reportData = {
    type: "",
    reason: "",
    application: ""
};

function loadQuestion(key) {
    const node = flow[key];
    
    // Soruyu göster
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;
    answersDiv.innerHTML = "";
    resultDiv.style.display = "none";

    // Her cevabı buton olarak ekle
    node.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.onclick = () => {
            
            // Ürün tipi ilk soruda belirleniyor
            if (key === "start") reportData.type = ans.text;

            // Güncelleme nedeni kaydet
            if (key.includes("update_reason")) reportData.reason = ans.text;

            // Eğer result var ise rapora yaz
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

    // GERİ ve ANA SAYFA butonları
    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => loadPrevious(); // loadPrevious() fonksiyonu ile geri gidilebilir
    answersDiv.appendChild(backBtn);

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "ANA SAYFA";
    homeBtn.onclick = () => loadQuestion("start");
    answersDiv.appendChild(homeBtn);
}

// Rapor gösterme
function showReport() {
    const text = `
Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
Uygulama bilgisi: ${reportData.application}
    `;
    resultDiv.innerHTML = `<pre>${text}</pre>`;
    resultDiv.style.display = "block";
}
