const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const navDiv = document.getElementById("navButtons");

let reportData = {
    degisiklikTipi: "",
    guncellemeNedeni: "",
    uygunsuzlukSeviyesi: "",
    faaliyet: "",
    bildirim: "",
    bildirimNo: "",
    aciklama: ""
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

    /* CEVAPLAR */

    if (q.answers) {

        q.answers.forEach(answer => {

            const btn = document.createElement("button");
            btn.innerText = answer.text;

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

    /* INPUT */

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
        btn.innerText = "Devam";

        btn.onclick = () => {

            saveAnswer(key, input.value);

            loadQuestion(q.next);
        };

        navDiv.appendChild(btn);

    }

    /* GERİ BUTONU */

    if (history.length > 1) {

        const backBtn = document.createElement("button");
        backBtn.innerText = "Geri";

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
            reportData.degisiklikTipi = value;
            break;

        case "hardware_update_reason":
        case "software_update_reason":
            reportData.guncellemeNedeni = value;
            break;

        case "hardware_nonconformity_level":
            reportData.uygunsuzlukSeviyesi = value;
            break;

        case "nonconformity_activity":
            reportData.faaliyet = value;
            break;

        case "nonconformity_notification":
            reportData.bildirim = value;
            break;

        case "notification_number":
            reportData.bildirimNo = value;
            break;

        case "degisiklik_tanimi":
        case "iyilestirme_tanimi":
        case "onleyici_tanimi":
            reportData.aciklama = value;
            break;

    }

}

function showResult(resultText) {

    questionDiv.innerHTML = "Değişiklik Analizi Sonucu";
    answersDiv.innerHTML = "";

    resultDiv.innerHTML = `

    <h3>Analiz Özeti</h3>

    <b>Değişiklik Tipi:</b><br>
    ${reportData.degisiklikTipi}<br><br>

    <b>Güncelleme Nedeni:</b><br>
    ${reportData.guncellemeNedeni}<br><br>

    <b>Uygunsuzluk Seviyesi:</b><br>
    ${reportData.uygunsuzlukSeviyesi}<br><br>

    <b>Faaliyet:</b><br>
    ${reportData.faaliyet}<br><br>

    <b>Bildirim Açıldı mı:</b><br>
    ${reportData.bildirim}<br><br>

    <b>Bildirim Numarası:</b><br>
    ${reportData.bildirimNo}<br><br>

    <b>Açıklama:</b><br>
    ${reportData.aciklama}<br><br>

    <hr>

    <b>Karar:</b><br>
    ${resultText}

    `;

}

loadQuestion("start");
