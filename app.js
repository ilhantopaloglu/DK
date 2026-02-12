async function runAssistant() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const userText = document.getElementById("userText").value.trim();
  const resultDiv = document.getElementById("result");

  if (!apiKey || !userText) {
    resultDiv.innerText = "Lütfen API Key ve açıklamayı gir.";
    return;
  }

  resultDiv.innerText = "Yazıyorum...";

  const prompt = `
Kullanıcının değişiklik açıklamasını yorumla.

Şunları yap:
- Bunun "ilk doküman aktarımı" mı,
- Bir "iyileştirme" mi,
- Yoksa bir "uygunsuzluk giderme" mi olduğunu yorumla.
- Eğer açıklama yetersizse, kullanıcıya kısa ve insani bir itiraz yaz.
- Gereksiz uzatma, klavyede yazıyormuş gibi konuş.

Kullanıcı açıklaması:
"${userText}"
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "Sen bir değişiklik talebi asistanısın." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    resultDiv.innerText = reply;

  } catch (err) {
    resultDiv.innerText = "Bir hata oldu: " + err.message;
  }
}
