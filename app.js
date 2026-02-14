// app.js
const API_KEY = "BURAYA_GERCEK_ANAHTARI_YAZMA"; // sadece lokal testte

document.getElementById("sendBtn").addEventListener("click", sendMessage);

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await res.json();
    console.log("API cevap:", data);

    const reply = data.choices?.[0]?.message?.content || "Yanıt alınamadı.";
    appendMessage("bot", reply);

  } catch (err) {
    console.error("Hata:", err);
    appendMessage("bot", "Bir hata oluştu. Console'u kontrol et.");
  }
}

function appendMessage(role, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = role;
  div.innerText = (role === "user" ? "Sen: " : "YZ: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
