const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    type: "",
    reason: "",
    level: "",
    activity: "",
    notification: "",
    application: "",
    note: ""
};

let history = [];

function loadQuestion(key) {

    const node = flow[key];

    answersDiv.innerHTML = "";
    questionDiv.innerHTML = "";
    resultDiv.style.display = "none";

    navDiv.innerHTML = "";

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "ANA SAYFA";
    homeBtn.onclick = () => {
        history = [];
        loadQuestion("start");
    };
    navDiv.appendChild(homeBtn);

    const backBtn = document.createElement("button");
    backBtn.textContent = "GERİ";
    backBtn.onclick = () => {
        if (history.length > 0) loadQuestion(history.pop());
    };
    navDiv.appendChild(backBtn);
    
    questionDiv.innerHTML = `<h3>${node.text}</h3>`;

    /* INPUT SORULARI */

    if (node.input) {

        let input;

        if (node.input === "textarea") {
            input = document.createElement("textarea");
            input.style.height = "80px";
        } else {
            input = document.createElement("input");
            input.type = "text";
            if (node.maxLength) input.maxLength = node.maxLength;
        }

        input.style.width = "100%";
        input.style.marginBottom = "10px";

        answersDiv.appendChild(input);

        const btn = document.createElement("button");
        btn.textContent = "DEVAM";

        btn.onclick = () => {

            history.push(key);

            if (key === "nonconformity_activity")
                reportData.activity = input.value;

            if (key === "notification_number")
                reportData.notification = input.value;

            loadQuestion(node.next);
        };

        answersDiv.appendChild(btn);

        return;
    }

    /* NORMAL SORULAR */

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

    if (reportData.activity)
        text += `Uygunsuzluk faaliyeti: ${reportData.activity}\n`;

    if (reportData.notification)
        text += `Uygunsuzluk bildirimi: ${reportData.notification}\n`;

    text += `Uygulama bilgisi: ${reportData.application}\n`;

    resultDiv.innerHTML = `
        <pre id="reportBox" style="
            white-space: pre-wrap;
            background:#cce5ff;
            padding:10px;
            border-radius:5px;
        ">${text}</pre>

        <div style="margin-top:15px;">
            <b>Ek Açıklama</b><br>
            <textarea id="extraNote"
                placeholder="İhtiyaç duyulması halinde ek açıklama aşağıdaki alana yazılabilir"
                style="width:100%;height:100px;margin-top:5px;"></textarea>
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

        if (reportData.activity)
            updated += `Uygunsuzluk faaliyeti: ${reportData.activity}\n`;

        if (reportData.notification)
            updated += `Uygunsuzluk bildirimi: ${reportData.notification}\n`;

        updated += `Uygulama bilgisi: ${reportData.application}\n`;

        if (reportData.note)
            updated += `Ek açıklama: ${reportData.note}`;

        document.getElementById("reportBox").textContent = updated;
    });
}

loadQuestion("start");
