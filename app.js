// ---- DOM ELEMANLARI ----
const apiKeyInput = document.getElementById("apiKeyInput");
const checkApiBtn = document.getElementById("checkApiBtn");
const apiStatus = document.getElementById("apiStatus");

const chat = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// ---- DURUM ----
let API_KEY = null;

// ---- EVENTLER ----
checkApiBtn.addEventListener("click", checkApiKey);
sendBtn.addEventListener("click", sendMessage);

// ---- FONKSİYONLAR ----
async function checkApiKey() {
  const key = apiKeyInput.value.trim();
  if (!key) {
    apiStatus.innerText = "❌ API anahtarı boş.";
    apiStatus.style.color = "red";
    return;
  }

  apiStatus.innerText = "Kontrol ediliyor...";
  apiStatus.style.color = "gray";

  try {
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${key}`
      }
    });

    const data = await res.json();
    console.log("API CHECK RESPONSE:", data);

    if (data.error) {
      API_KEY = null;
      sendBtn.disabled = true;
      apiStatus.innerText = "❌ API anahtarı geçersiz.";
      apiStatus.style.color = "red";
      appendMessage("error", "API Hatası: " + data.error.message);
      return;
    }

    API_KEY = key;
    sendBtn.disabled = false;
    apiStatus.innerText = "✅ API uygun.";
    apiStatus.style.color = "green";
    appendMessage("bot", "API doğrulandı. Sohbete başlayabilirsin.");

  } catch (err) {
    console.error(err);
    API_KEY = null;
    sendBtn.disabled = true;
    apiStatus.innerText = "❌ API kontrol edilirken hata oluştu.";
    apiStatus.style.color = "red";
    appendMessage("error", "Ağ hatası veya CORS engeli olabilir. Console’u kontrol et.");
  }
}

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  messageInput.value = "";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Sen konfigürasyon yönetimi konusunda yardımcı bir asistansın." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await res.json();
    console.log("CHAT RESPONSE:", data);

    if (data.error) {
      appendMessage("error", "API Hatası: " + data.error.message);
      return;
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      appendMessage("error", "Yanıt alınamadı. Console’u kontrol et.");
      return;
    }

    appendMessage("bot", reply);

  } catch (err) {
    console.error(err);
    appendMessage("error", "Ağ hatası oluştu (muhtemelen CORS). Console’u kontrol et.");
  }
}

function appendMessage(type, text) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = (type === "user" ? "Sen: " : type === "bot" ? "YZ: " : "Hata: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
