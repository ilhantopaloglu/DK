const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    degisiklik_tipi: "",
    guncelleme_nedeni: "",
    uygunsuzluk_seviyesi: "",
    faaliyet: "",
    bildirim_acildi: "",
    bildirim_numarasi: "",
    degisiklik_tanimi: ""
};

let history = [];
let currentKey = null;

function loadQuestion(key) {

    currentKey = key;

    const q = flow[key];

    questionDiv.innerHTML = q.text;
    answersDiv.innerHTML = "";
    resultDiv.innerHTML = "";
    navDiv.innerHTML = "";

    history.push(key);

    /* CEVAP BUTONLARI */

    if (q.answers) {

        q.answers.forEach(answer => {

            const btn = document.createElement("button");
            btn.textContent = answer.text;

            btn.onclick = () => {

                saveAnswer(key, answer.text);

                if (answer.next) {
                    loadQuestion(answer.next);
                }

                if (answer.result) {
                    showResult(answer.result);
                }

            };

            answersDiv.appendChild(btn);

        });

    }

    /* INPUT SORULARI */

    if (q.input) {

        let input;

        if (q.input === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = "text";
        }

        if (q.maxLength) {
            input.maxLength = q.maxLength;
        }

        input.style.width = "100%";
        input.style.marginTop = "10px";

        answersDiv.appendChild(input);

        const btn = document.createElement("button");
        btn.textContent = "Devam";

        btn.onclick = () => {

            saveAnswer(key, input.value);

            loadQuestion(q.next);
        };

        navDiv.appendChild(btn);

    }

    /* GERİ BUTONU */

    if (history.length > 1) {

        const backBtn = document.createElement("button");
        backBtn.textContent = "Geri";

        backBtn.onclick = () => {

            history.pop();
            const prev = history.pop();
            loadQuestion(prev);

        };

        navDiv.appendChild(backBtn);

    }

}

function saveAnswer(key, value) {

    switch (key) {

        case "start":
            reportData.degisiklik_tipi = value;
            break;

        case "hardware_update_reason":
        case "software_update_reason":
            reportData.guncelleme_nedeni = value;
            break;

        case "hardware_nonconformity_level":
            reportData.uygunsuzluk_seviyesi = value;
            break;

        case "nonconformity_activity":
            reportData.faaliyet = value;
            break;

        case "nonconformity_notification":
            reportData.bildirim_acildi = value;
            break;

        case "notification_number":
            reportData.bildirim_numarasi = value;
            break;

        case "degisiklik_tanimi":
            reportData.degisiklik_tanimi = value;
            break;

    }

}

function showResult(text) {

    questionDiv.innerHTML = "Sonuç";

    answersDiv.innerHTML = "";

    resultDiv.innerHTML = `

    <h3>Değişiklik Analizi</h3>

    <b>Değişiklik Tipi:</b> ${reportData.degisiklik_tipi}<br><br>

    <b>Güncelleme Nedeni:</b> ${reportData.guncelleme_nedeni}<br><br>

    <b>Uygunsuzluk Seviyesi:</b> ${reportData.uygunsuzluk_seviyesi}<br><br>

    <b>Faaliyet:</b> ${reportData.faaliyet}<br><br>

    <b>Bildirim Açıldı mı:</b> ${reportData.bildirim_acildi}<br><br>

    <b>Bildirim Numarası:</b> ${reportData.bildirim_numarasi}<br><br>

    <b>Değişiklik Tanımı:</b><br>
    ${reportData.degisiklik_tanimi}<br><br>

    <hr>

    <b>Karar:</b><br>
    ${text}

    `;

}

loadQuestion("start");
