let API_KEY = null;

const apiKeyInput = document.getElementById("apiKeyInput");
const checkApiBtn = document.getElementById("checkApiBtn");
const apiStatus = document.getElementById("apiStatus");

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chat = document.getElementById("chat");

checkApiBtn.addEventListener("click", checkApiKey);
sendBtn.addEventListener("click", sendMessage);

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
    // Basit bir test isteği
    const res = await fetch("https://api.openai.com/v1/models", {
      headers: {
        "Authorization": `Bearer ${key}`
      }
    });

    const data = await res.json();
    console.log("API test sonucu:", data);

    if (data.error) {
      apiStatus.innerText = "❌ API anahtarı geçersiz.";
      apiStatus.style.color = "red";
      sendBtn.disabled = true;
      API_KEY = null;
      return;
    }

    API_KEY = key;
    apiStatus.innerText = "✅ API uygun.";
    apiStatus.style.color = "green";
    sendBtn.disabled = false;

  } catch (err) {
    console.error(err);
    apiStatus.innerText = "❌ API kontrol edilirken hata oluştu.";
    apiStatus.style.color = "red";
    sendBtn.disabled = true;
    API_KEY = null;
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
          { role: "system", content: "Sen bir konfigürasyon yönetimi asistanısın." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await res.json();
    console.log("RAW API RESPONSE:", data);

    if (data.error) {
      appendMessage("bot", "❌ API Hatası: " + data.error.message);
      return;
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      appendMessage("bot", "⚠️ Yanıt alınamadı. Console'u kontrol et.");
      return;
    }

    appendMessage("bot", reply);

  } catch (err) {
    console.error(err);
    appendMessage("bot", "❌ Bir ağ hatası oluştu. Console'u kontrol et.");
  }
}

function appendMessage(role, text) {
  const div = document.createElement("div");
  div.className = role;
  div.innerText = (role === "user" ? "Sen: " : "YZ: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
