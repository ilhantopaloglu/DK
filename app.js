const messages = document.getElementById("messages");

let state = {
  mode: null, // "newDoc" | "improvement" | "nonconformity"
  docNo: null,
  docCode: null,
  erpChecked: false
};

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  const span = document.createElement("span");
  span.innerText = text;
  div.appendChild(span);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    analyze(text.toLowerCase());
  }, 500);
}

function analyze(text) {
  // 1) Henüz mod seçilmediyse, niyet algıla
  if (!state.mode) {
    if (text.includes("ilk") || text.includes("yeni doküman") || text.includes("ilk doküman") || text.includes("aktar")) {
      state.mode = "newDoc";
      addMessage(
        "Anladım, bu bir **ilk doküman aktarımı** gibi duruyor.\n" +
        "Doküman numarası ve doküman kodunu yazar mısın?",
        "ai"
      );
      return;
    }

    const nonconformityHints = ["girmiyordu", "çalışmıyordu", "uymuyordu", "yanlıştı", "hata", "uygunsuz"];
    const improvementHints = ["sadeleştirildi", "iyileştirildi", "optimize", "verim", "okunabilirlik", "iyileştirme"];

    let hasNonconformity = nonconformityHints.some(k => text.includes(k));
    let hasImprovement = improvementHints.some(k => text.includes(k));

    if (hasNonconformity) {
      state.mode = "nonconformity";
      addMessage(
        "Yazdıklarına bakınca burada bir **uygunsuzluk** giderme durumu var gibi görünüyor.\n" +
        "Kısaca: hangi hatayı, nasıl giderdiğini anlatır mısın?",
        "ai"
      );
      return;
    }

    if (hasImprovement) {
      state.mode = "improvement";
      addMessage(
        "Bu bir **iyileştirme** gibi duruyor 👍\n" +
        "Neyi, nasıl iyileştirdiğini biraz daha net yazar mısın?",
        "ai"
      );
      return;
    }

    addMessage(
      "Tam net anlayamadım 🙂\n" +
      "Yeni bir doküman mı aktarıyorsun, yoksa mevcut bir şeyde iyileştirme / hata giderme mi var?",
      "ai"
    );
    return;
  }

  // 2) İlk doküman aktarımı akışı
  if (state.mode === "newDoc") {
    if (!state.docNo || !state.docCode) {
      const parts = text.split(" ");
      if (parts.length >= 2) {
        state.docNo = parts[0];
        state.docCode = parts[1];
        addMessage("Bir bakıyorum, sistemde kayıtlı mı kontrol ediyorum...", "ai");

        setTimeout(() => {
          state.erpChecked = true;
          addMessage(
            "Sistemde bu doküman kayıtlı görünmüyor.\n" +
            "İlk aktarım için uygun. Doküman linkini paylaşabilir misin?",
            "ai"
          );
        }, 800);
      } else {
        addMessage("Doküman numarası ve doküman kodunu birlikte yazar mısın? (örn: 12345 ABC-01)", "ai");
      }
      return;
    }

    if (state.erpChecked) {
      addMessage(
        "Teşekkürler. Doküman aktarım talebini bu bilgilerle kaydediyorum 👍",
        "ai"
      );
      resetState();
      return;
    }
  }

  // 3) İyileştirme / uygunsuzluk detayları
  if (state.mode === "improvement") {
    if (text.length < 15) {
      addMessage("Biraz kısa kaldı gibi 🙂 Neyi ve nasıl iyileştirdiğini kısaca açar mısın?", "ai");
      return;
    }
    addMessage(
      "Tamam, anlattıklarına göre bu bir iyileştirme.\n" +
      "Bu şekilde kaydediyorum. Teşekkürler 👍",
      "ai"
    );
    resetState();
    return;
  }

  if (state.mode === "nonconformity") {
    if (text.length < 15) {
      addMessage("Hangi hatayı, nasıl giderdiğini biraz daha netleştirir misin?", "ai");
      return;
    }
    addMessage(
      "Anladım, bu bir uygunsuzluk giderme talebi.\n" +
      "Bu bilgilerle kaydediyorum. Teşekkürler 👍",
      "ai"
    );
    resetState();
    return;
  }
}

function resetState() {
  state = {
    mode: null,
    docNo: null,
    docCode: null,
    erpChecked: false
  };
}
