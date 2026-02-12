const chat = document.getElementById("chat");
let state = {
  mode: null
};

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  div.innerText = (sender === "user" ? "👤 " : "🤖 ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
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

function send() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => respond(text), 500);
}

function respond(text) {
  if (!state.mode) {
    const intent = analyzeIntent(text);
    state.mode = intent;

    if (intent === "ilk_aktarim") {
      addMessage("Anladım, bu bir ilk doküman aktarımı gibi görünüyor. Aktarmak istediğin dokümanın numarasını ve kodunu yazar mısın?", "ai");
      return;
    }

    if (intent === "iyilestirme") {
      addMessage("Bu bir iyileştirme gibi görünüyor. Neyi nasıl iyileştirdin? Önceki durum neydi, sonrası nasıl oldu? Kısaca anlatır mısın?", "ai");
      return;
    }

    if (intent === "uygunsuzluk") {
      addMessage("Bu bir uygunsuzluk/hata giderme gibi duruyor. İlk hatalı ürün hangi üründü, hangi aşamada ve nerede gördün?", "ai");
      return;
    }

    addMessage("Tam emin olamadım 🙂 Bu talep ilk doküman aktarımı mı, iyileştirme mi yoksa bir hata/uygunsuzluk giderme mi? Kısaca belirtir misin?", "ai");
    return;
  }

  // Devam soruları
  if (state.mode === "iyilestirme") {
    addMessage("Teşekkürler. Peki bu iyileştirme ölçülebilir mi? (örn: süre kısaldı, performans arttı vs.) Ayrıca değişiklik öncesi/sonrası etkisini nasıl doğruladın?", "ai");
    return;
  }

  if (state.mode === "uygunsuzluk") {
    addMessage("Anladım. Bu hata başka hangi ürünleri etkiliyor olabilir? Değişikliği öneri öncesinde hangi ürünlerde uyguladın ve sonucu nasıl doğruladın?", "ai");
    return;
  }

  if (state.mode === "ilk_aktarim") {
    addMessage("Teşekkürler. Bu doküman ERP sisteminde yok varsayıyorum. Lütfen aktarılacak dokümanın linkini paylaşır mısın?", "ai");
    return;
  }
}

// İlk karşılama mesajı
addMessage("Merhaba! Bir doküman aktarımı ya da güncelleme talebi oluşturmak istiyorsan kısaca anlat, ben sana doğru soruları sorayım.", "ai");
