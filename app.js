function checkDoc() {
  const docNo = document.getElementById("docNo").value.trim();
  const docCode = document.getElementById("docCode").value.trim();
  const msg = document.getElementById("msg");
  const step2 = document.getElementById("step2");

  if (!docNo || !docCode) {
    msg.innerText = "❌ Lütfen doküman numarası ve doküman kodunu giriniz.";
    msg.className = "msg error";
    step2.style.display = "none";
    return;
  }

  // ERP kontrolü simülasyonu
  msg.innerText =
    "🔎 ERP sisteminde kontrol ediliyor...\n" +
    "❌ Bu doküman sistemde kayıtlı değildir.\n" +
    "✅ İlk aktarım uygundur. Lütfen doküman linkini giriniz.";
  msg.className = "msg ok";

  step2.style.display = "block";
}

function submitDoc() {
  const docLink = document.getElementById("docLink").value.trim();
  const msg = document.getElementById("msg");

  if (!docLink) {
    msg.innerText = "❌ Lütfen aktarılacak doküman için bir link giriniz.";
    msg.className = "msg error";
    return;
  }

  msg.innerText =
    "✅ Doküman linki alındı.\n" +
    "Değişiklik talebi 'Yeni Doküman Aktarımı' olarak kaydedildi.";
  msg.className = "msg ok";
}
