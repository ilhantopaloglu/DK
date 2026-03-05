const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    type: "",
    reason: "",
    level: "",
    application: "",
    note: ""
};

let history = [];

function loadQuestion(key) {

    const node = flow[key];

    answersDiv.innerHTML = "";
    questionDiv.innerHTML = "";
    resultDiv.style.display = "none";

    // GERİ ve ANA SAYFA
    navDiv.innerHTML = "";

    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => {
        if (history.length > 0) loadQuestion(history.pop());
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

    // Cevap butonları
    node.answers.forEach(ans => {

        const btn = document.createElement("button");
        btn.textContent = ans.text;
        btn.style.display = "block";
        btn.style.margin = "5px 0";

        btn.onclick = () => {

            history.push(key);

            if (key === "start")
                reportData.type = ans.text;

            if (key.includes("update_reason"))
                reportData.reason = ans.text;

            if (key.includes("nonconformity_level"))
                reportData.level = ans.text;

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

    let text =
`Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
`;

    if (reportData.level)
        text += `Uygunsuzluğun yaşandığı seviye: ${reportData.level}\n`;

    text += `Uygulama bilgisi: ${reportData.application}\n`;

    resultDiv.innerHTML = `
        <pre id="reportBox" style="
            white-space: pre-wrap;
            word-wrap: break-word;
            background:#cce5ff;
            padding:10px;
            border-radius:5px;
        ">${text}</pre>

        <div style="margin-top:15px;">
            <b>Ek Açıklama</b><br>
            <textarea id="extraNote"
                placeholder="İhtiyaç duyulması halinde ek açıklama aşağıdaki alana yazılabilir"
                style="
                    width:100%;
                    height:100px;
                    margin-top:5px;
                    padding:8px;
                    border-radius:5px;
                    border:1px solid #ccc;
                "
            ></textarea>
        </div>
    `;

    resultDiv.style.display = "block";

    const noteArea = document.getElementById("extraNote");

    noteArea.addEventListener("input", () => {

        reportData.note = noteArea.value;

        let updated =
`Değişiklik türü: ${reportData.type}
Değişiklik gerekçesi: ${reportData.reason}
`;

        if (reportData.level)
            updated += `Uygunsuzluğun yaşandığı seviye: ${reportData.level}\n`;

        updated += `Uygulama bilgisi: ${reportData.application}\n`;

        if (reportData.note)
            updated += `Ek açıklama: ${reportData.note}`;

        document.getElementById("reportBox").textContent = updated;

    });
}

// Başlat
loadQuestion("start");
