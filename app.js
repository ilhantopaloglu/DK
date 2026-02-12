const messages = document.getElementById("messages");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  const span = document.createElement("span");
  span.innerText = text;
  div.appendChild(span);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    analyze(text.toLowerCase());
  }, 600);
}

function analyze(text) {
  const nonconformityHints = ["girmiyordu", "çalışmıyordu", "uymuyordu", "yanlıştı", "hata", "uygunsuz"];
  const improvementHints = ["sadeleştirildi", "iyileştirildi", "optimize", "verim", "okunabilirlik"];

  let hasNonconformity = nonconformityHints.some(k => text.includes(k));
  let hasImprovement = improvementHints.some(k => text.includes(k));

  if (text.length < 10) {
    addMessage("Biraz kısa kaldı gibi 🙂 Neyi, nasıl değiştirdiğini kısaca yazar mısın?", "ai");
    return;
  }

  if (hasNonconformity) {
    addMessage(
      "Yazdıklarına bakınca başlangıçta bir sorun varmış gibi duruyor.\n" +
      "Bu talebi “uygunsuzluk giderme” olarak değerlendirmek daha uygun gözüküyor.\n" +
      "Eğer farklı düşünüyorsan biraz daha açar mısın?",
      "ai"
    );
    return;
  }

  if (hasImprovement) {
    addMessage(
      "Anladığım kadarıyla mevcut durumda bir hata yok, yapılan değişiklik süreci/ürünü daha iyi hale getirmiş 👍\n" +
      "Bunu iyileştirme olarak değerlendirmek uygun görünüyor.",
      "ai"
    );
    return;
  }

  addMessage(
    "Tam netleşmedi 🙂 Bu değişiklik bir hatayı mı gideriyor, yoksa çalışan bir şeyi daha mı iyi hale getiriyor?\n" +
    "Kısaca neyi, nasıl değiştirdiğini yazarsan doğru yönlendirebilirim.",
    "ai"
  );
}
