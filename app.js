const messages = document.getElementById("messages");

let state = {
  mode: null
};

function addBubble(text, sender) {
  const div = document.createElement("div");
  div.className = "bubble " + sender;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function isQuestion(text) {
  const t = text.toLowerCase();
  return t.includes("nedir") || t.includes("ne demek") || t.includes("fark") || t.endsWith("?");
}

function analyzeIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("ilk") || t.includes("ilk defa") || t.includes("ilk kez") || t.includes("ilk doküman")) {
    return "ilk_aktarim";
  }
  if (t.includes("hata") || t.includes("uygunsuz") || t.includes("bozuk") || t.includes("girmiyordu") || t.includes("çalışmıyordu")) {
    return "uygunsuzluk";
  }
  if (t.includes("iyileştir") || t.includes("geliştir") || t.includes("optimiz") || t.includes("daha iyi")) {
    return "iyilestirme";
  }
  return "belirsiz";
}

function answerKnowledge(text) {
  const t = text.toLowerCase();

  if (t.includes("iyileştirme") && t.includes("uygunsuzluk") && t.includes("fark")) {
    addBubble(
      "Kısaca özetleyeyim:\n\n" +
      "• İyileştirme: Üründe bir hata yokken, performans veya kaliteyi artırmak.\n" +
      "• Uygunsuzluk giderme: Var olan bir hatayı veya standarda aykırılığı düzeltmek.\n\n" +
      "Pratikte ikisi karışabiliyor; bu yüzden değişiklik talebinde niyetin net yazılması önemli.",
      "ai"
    );
    return true;
  }
  return false;
}

function send() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addBubble(text, "user");
  input.value = "";

  setTimeout(() => respond(text), 400);
}

function respond(text) {
  if (isQuestion(text)) {
    if (answerKnowledge(text)) return;
  }

  if (!state.mode) {
    const intent = analyzeIntent(text);
    state.mode = intent;

    if (intent === "ilk_aktarim") {
      addBubble("Bu bir ilk doküman aktarımı gibi görünüyor. Doküman numarasını ve kodunu paylaşır mısın?", "ai");
      return;
    }
    if (intent === "iyilestirme") {
      addBubble("Bu bir iyileştirme gibi duruyor. Neyi nasıl iyileştirdin? Öncesi ve sonrası neydi?", "ai");
      return;
    }
    if (intent === "uygunsuzluk") {
      addBubble("Bu bir uygunsuzluk/hata giderme gibi görünüyor. İlk hatayı hangi üründe, hangi aşamada gördün?", "ai");
      return;
    }

    addBubble("Tam anlayamadım 🙂 Bu ilk doküman aktarımı mı, iyileştirme mi yoksa bir hata giderme mi?", "ai");
    return;
  }

  if (state.mode === "iyilestirme") {
    addBubble("Bu iyileştirmenin etkisini nasıl doğruladın? Ölçülebilir bir kazanım var mı?", "ai");
    return;
  }

  if (state.mode === "uygunsuzluk") {
    addBubble("Bu hata başka hangi ürünleri etkileyebilir? Değişikliği nasıl doğruladın?", "ai");
    return;
  }

  if (state.mode === "ilk_aktarim") {
    addBubble("Anladım. ERP’de yok varsayıyorum. Lütfen doküman linkini paylaş.", "ai");
    return;
  }
}

addBubble("Merhaba 👋 Bir doküman aktarımı veya güncelleme talebi yazabilirsin, istersen kavramsal bir soru da sorabilirsin.", "ai");
