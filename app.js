const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let flowData = null;
let waitingForDetail = false;
let currentIntent = null;

fetch("flow.json")
  .then(res => res.json())
  .then(data => flowData = data);

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function aiTyping(text) {
  let i = 0;
  const div = document.createElement("div");
  div.className = "ai";
  messages.appendChild(div);

  const interval = setInterval(() => {
    div.innerText += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
    messages.scrollTop = messages.scrollHeight;
  }, 20);
}

function detectIntent(text) {
  text = text.toLowerCase();
  for (const intent of flowData.intents) {
    for (const kw of intent.keywords) {
      if (text.includes(kw)) return intent.name;
    }
  }
  return null;
}

function aiRespond(userText) {
  if (!currentIntent) {
    const intent = detectIntent(userText);

    if (!intent) {
      aiTyping("Bunu bir değişiklik talebi olarak yorumlayamadım 🤔\nDoküman ilk aktarımı mı yapıyorsun, yoksa bir iyileştirme ya da hata giderme mi?");
      return;
    }

    currentIntent = intent;

    if (intent === "ilk_dokuman") {
      aiTyping("Anladım 👍 İlk doküman aktarımı yapıyorsun.\nHangi ürün için ve hangi dokümanı aktarıyorsun?");
    }

    if (intent === "iyilestirme") {
      aiTyping("Tamam, bu bir iyileştirme gibi duruyor.\nNeyi nasıl iyileştirdin? Öncesi ve sonrası kısaca anlatır mısın?");
    }

    if (intent === "hata") {
      aiTyping("Bu bir hata giderme gibi duruyor.\nHata hangi üründe, hangi aşamada ortaya çıktı? Nasıl çözdün?");
    }

    waitingForDetail = true;
    return;
  }

  if (waitingForDetail) {
    aiTyping("Teşekkürler 🙌\nBu bilgilerle değişiklik talebini anlamlı şekilde oluşturabilirim. İstersen gönderip kaydedebilirsin.");
    waitingForDetail = false;
    return;
  }
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    aiRespond(text);
  }, 400);
});

window.onload = () => {
  aiTyping("Merhaba 👋 Doküman aktarım/güncelleme talebi yazabilirsin ya da bir şey sorabilirsin.");
};
