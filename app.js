let flow = {};
let currentNode = "start"

const messagesDiv = document.getElementById("messages");
const inputArea = document.getElementById("inputArea");

fetch("flow.json")
.then(res => res.json())
.then(data => {
flow = data;
showNode(currentNode);
});

function showNode(nodeKey) {
inputArea.innerHTML = ""
const node = flow[nodeKey];

addBotMessage(node.question);

if (node.options) {
const div = document.createElement("div");
div.className = "options"
Object.keys(node.options).forEach(option => {
const btn = document.createElement("button");
btn.textContent = option;
btn.onclick = () => {
addUserMessage(option);
currentNode = node.options[option];
showNode(currentNode);
};
div.appendChild(btn);
});
inputArea.appendChild(div);
} else if (node.type === "free_text") {
const textarea = document.createElement("textarea");
const btn = document.createElement("button");
btn.textContent = "Gönder"
btn.onclick = () => {
addUserMessage(textarea.value);
currentNode = node.next;
showNode(currentNode);
};
inputArea.appendChild(textarea);
inputArea.appendChild(btn);
}
}

function addBotMessage(text) {
const div = document.createElement("div");
div.className = "bot"
div.textContent = "YZ: " + text;
messagesDiv.appendChild(div);
}

function addUserMessage(text) {
const div = document.createElement("div");
div.className = "user"
div.textContent = "Sen: " + text;
messagesDiv.appendChild(div);
}
