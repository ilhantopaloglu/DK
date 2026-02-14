const apiKeyInput = document.getElementById("apiKeyInput");
const checkApiBtn = document.getElementById("checkApiBtn");
const apiStatus = document.getElementById("apiStatus");

const chat = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const reasonBox = document.getElementById("reasonBox");
const continueBtn = document.getElementById("continueBtn");

let API_KEY = null;

// Eventler
checkApiBtn.addEventListener("click", checkApiKey);
continueBtn.addEventListener("click", handleReasons);

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
      headers: { "Authorization": `Bearer ${key}` }
    });

    const data = await res.json();
    console.log("API CHECK:", data);

    if (data.error) {
      API_KEY = null;
      apiStatus.innerText = "❌ API anahtarı geçersiz.";
      apiStatus.style.color = "red";
      return;
    }

    API_KEY = key;
    apiStatus.innerText = "✅ API uygun.";
    apiStatus.style.color = "green";

    // Sohbeti başlat
    startConversation();

  } catch (err) {
    console.error(err);
    API_KEY = null;
    apiStatus.innerText = "❌ API kontrol edilirken hata oluştu.";
    apiStatus.style.color = "red";
  }
}

function startConversation() {
  chat.innerHTML = "";
  appendMessage("bot", "Neden değişiklik önerisi başlattığınızı belirtir misiniz?");
  reasonBox.classList.remove("hidden");
}

function handleReasons() {
  const checked = Array.from(reasonBox.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => cb.value);

  if (checked.length === 0) {
    alert("Lütfen en az bir sebep seçiniz.");
    return;
  }

  appendMessage("user", checked.join(", "));
  appendMessage("bot", "Seçimlerin alındı. Bir sonraki adımda detaylara geçeceğiz.");

  // Bir sonraki faz için hazırlık
  reasonBox.classList.add("hidden");
  messageInput.disabled = false;
  sendBtn.disabled = false;
}

function appendMessage(type, text) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = (type === "user" ? "Sen: " : type === "bot" ? "YZ: " : "Hata: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
