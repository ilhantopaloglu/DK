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

function isKnowledgeQuestion(text) {
  const t = text.toLowerCase();
  return (
    t.includes("fark") ||
    t.includes("arasındaki fark") ||
    t.includes("fark ne") ||
    t.includes("farkı ne") ||
    t.includes("nedir") ||
    t.includes("ne demek")
  );
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

  if ((t.includes("iyileştirme") || t.includes("iyilestirme")) && (t.includes("hata") || t.includes("uygunsuzluk")) && t.includes("fark")) {
    addBubble(
      "Kısaca anlatayım:\n\n" +
      "• İyileştirme: Üründe bir hata yokken daha iyi hale getirmek.\n" +
      "• Uygunsuzluk giderme: Var olan bir hatayı veya standarda aykırı durumu düzeltmek.\n\n" +
      "Pratikte ikisi sık karışır. O yüzden değişiklik talebinde niyetin net yazılması önemli.",
      "ai"
    );
    return true;
  }

  addBubble("Bu daha çok bilgi alma amaçlı bir soru gibi duruyor. İstersen biraz daha detay verirsen örnekle anlatayım.", "ai");
  return true;
}

function send() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addBubble(text, "user");
  input.value = "";

  setTimeout(() => respond(text), 300);
}

function respond(text) {
  if (isKnowledgeQuestion(text)) {
    answerKnowledge(text);
    return;
  }

  if (!state.mode) {
    const intent = analyzeIntent(text);
    state.mode = intent;

    if (intent === "ilk_aktarim") {
      addBubble("Bu bir ilk doküman aktarımı gibi görünüyor. Doküman numarasını ve kodunu yazar mısın?", "ai");
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

addBubble("Merhaba 👋 Doküman aktarımı/güncelleme talebi yazabilirsin ya da kavramsal bir soru sorabilirsin.", "ai");
