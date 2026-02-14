const chatDiv = document.getElementById("chat");

function addMessage(text, sender) {
const div = document.createElement("div");
div.className = sender;
div.innerText = text;
chatDiv.appendChild(div);
chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function sendMessage() {
const input = document.getElementById("userInput");
const apiKey = document.getElementById("apiKey").value;

const userText = input.value;
if (!userText || !apiKey) return;

addMessage("Sen: " + userText, "user");
input.value = ""

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer " + apiKey
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "Sen bir degisiklik onerisi asistanisin." },
{ role: "user", content: userText }
]
})
});

const data = await response.json();
const botText = data.choices[0].message.content;

addMessage("YZ: " + botText, "bot");
}
