function resetAll() {
  document.getElementById("newDocSection").classList.add("hidden");
  document.getElementById("improvementSection").classList.add("hidden");
  document.getElementById("ncSection").classList.add("hidden");
  document.getElementById("newDocStep2").classList.add("hidden");
  document.getElementById("msg").innerText = "";
}

function onTypeChange() {
  resetAll();
  const type = document.getElementById("changeType").value;

  if (type === "newDoc") {
    document.getElementById("newDocSection").classList.remove("hidden");
  } else if (type === "improvement") {
    document.getElementById("improvementSection").classList.remove("hidden");
  } else if (type === "nonconformity") {
    document.getElementById("ncSection").classList.remove("hidden");
  }
}

function checkDoc() {
  const docNo = document.getElementById("docNo").value.trim();
  const docCode = document.getElementById("docCode").value.trim();
  const msg = document.getElementById("msg");

  if (!docNo || !docCode) {
    msg.innerText = "❌ Lütfen doküman numarası ve kodunu giriniz.";
    msg.className = "msg error";
    return;
  }

  msg.innerText =
    "🔎 ERP sisteminde kontrol ediliyor...\n" +
    "❌ Bu doküman sistemde kayıtlı değildir.\n" +
    "✅ İlk aktarım uygundur. Lütfen doküman linkini giriniz.";
  msg.className = "msg ok";

  document.getElementById("newDocStep2").classList.remove("hidden");
}

function submitNewDoc() {
  const link = document.getElementById("docLink").value.trim();
  const msg = document.getElementById("msg");

  if (!link) {
    msg.innerText = "❌ Lütfen doküman linkini giriniz.";
    msg.className = "msg error";
    return;
  }

  msg.innerText = "✅ Yeni doküman aktarım talebi başarıyla alındı.";
  msg.className = "msg ok";
}

function submitImprovement() {
  const hadIssue = document.getElementById("hadIssue").value;
  const desc = document.getElementById("improveDesc").value.toLowerCase();
  const msg = document.getElementById("msg");

  if (!hadIssue || !desc) {
    msg.innerText = "❌ Lütfen tüm alanları doldurunuz.";
    msg.className = "msg error";
    return;
  }

  const errorHints = ["hata", "çalışmıyor", "takılı", "limit", "bozuldu", "uygunsuz"];

  const looksLikeError = errorHints.some(w => desc.includes(w));

  if (hadIssue === "no" && looksLikeError) {
    msg.innerText =
      "⚠️ Açıklamanız mevcut bir sorunun giderildiğini gösteriyor.\n" +
      "Bu talep 'uygunsuzluk giderme' kapsamına girmelidir.\n" +
      "Lütfen talep türünü güncelleyiniz.";
    msg.className = "msg error";
    return;
  }

  if (hadIssue === "yes") {
    msg.innerText =
      "ℹ️ Öncesinde sorun olduğunu belirttiniz.\n" +
      "Bu talep uygunsuzluk akışına yönlendirildi.";
    msg.className = "msg ok";
    document.getElementById("changeType").value = "nonconformity";
    onTypeChange();
    return;
  }

  msg.innerText = "✅ İyileştirme talebi alındı.";
  msg.className = "msg ok";
}

function submitNC() {
  const where = document.getElementById("ncWhere").value.trim();
  const when = document.getElementById("ncWhen").value.trim();
  const level = document.getElementById("ncLevel").value.trim();
  const step = document.getElementById("ncStep").value.trim();
  const test = document.getElementById("ncTest").value.trim();
  const msg = document.getElementById("msg");

  if (!where || !when || !level || !step || !test) {
    msg.innerText = "❌ Lütfen tüm uygunsuzluk alanlarını doldurunuz.";
    msg.className = "msg error";
    return;
  }

  msg.innerText =
    "✅ Uygunsuzluk bilgileri alındı.\n" +
    "Özet:\n" +
    `- Nerede: ${where}\n` +
    `- Ne zaman: ${when}\n` +
    `- Seviye: ${level}\n` +
    `- Üretim adımı: ${step}\n` +
    `- Test: ${test}\n`;
  msg.className = "msg ok";
}
