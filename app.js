const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let flowData = null;
let currentIntent = null;
let waitingForDetail = false;

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
  }, 18);
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

function fallbackResponse() {
  aiTyping("Biraz karıştı gibi hissettim 🤔\nDoküman ilk aktarımı mı yapıyorsun, yoksa bir iyileştirme ya da hata giderme mi? Kısaca söyler misin?");
}

function aiRespond(userText) {
  const text = userText.toLowerCase();

  // Kullanıcı kararsız / alakasız yazdıysa
  if (text.includes("bilmiyorum") || text.includes("alo") || text.includes("kimse var mı")) {
    aiTyping("Buradayım 🙂\nNe yapmak istediğini kısaca tarif edersen yönlendireyim.");
    return;
  }

  // Henüz intent yoksa
  if (!currentIntent) {
    const intent = detectIntent(text);

    if (!intent) {
      fallbackResponse();
      return;
    }

    currentIntent = intent;
    waitingForDetail = true;

    if (intent === "ilk_dokuman") {
      aiTyping("Anladım 👍 İlk doküman aktarımı.\nHangi ürün için ve hangi dokümanı aktarıyorsun?");
      return;
    }

    if (intent === "iyilestirme") {
      aiTyping("Bu bir iyileştirme gibi duruyor.\nNeyi nasıl iyileştirdin? Öncesi v
