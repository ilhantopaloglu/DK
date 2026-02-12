function onTypeChange() {
  const type = document.getElementById("requestType").value;
  document.getElementById("newDocArea").classList.add("hidden");
  document.getElementById("descArea").classList.add("hidden");

  if (type === "newDoc") {
    document.getElementById("newDocArea").classList.remove("hidden");
  } else if (type === "improvement" || type === "nonconformity") {
    document.getElementById("descArea").classList.remove("hidden");
  }
}

function checkERP() {
  const docNo = document.getElementById("docNo").value.trim();
  const docCode = document.getElementById("docCode").value.trim();
  const result = document.getElementById("erpResult");

  if (!docNo || !docCode) {
    result.innerText = "Doküman numarası ve kodunu girmen lazım 🙂";
    return;
  }

  result.innerText = "Bir bakıyorum...";

  setTimeout(() => {
    result.innerText =
      "Sistemde bu doküman kayıtlı görünmüyor. İlk aktarım için uygun.\n\nLütfen doküman linkini paylaş.";
  }, 800);
}

function analyze() {
  const text = document.getElementById("description").value.toLowerCase();
  const response = document.getElementById("aiResponse");

  if (text.length < 10) {
    response.innerText =
      "Biraz kısa kaldı gibi 🙂 Neyi, nasıl değiştirdiğini kısaca yazar mısın?";
    return;
  }

  const nonconformityHints = ["girmiyordu", "çalışmıyordu", "uymuyordu", "yanlıştı", "hata", "uygunsuz"];
  const improvementHints = ["sadeleştirildi", "iyileştirildi", "optimize", "verim", "okunabilirlik"];

  let hasNonconformity = nonconformityHints.some(k => text.includes(k));
  let hasImprovement = improvementHints.some(k => text.includes(k));

  if (hasNonconformity) {
    response.innerText =
      "Şöyle anlıyorum: başlangıçta bir sorun varmış gibi duruyor.\n" +
      "Bu talebi “uygunsuzluk giderme” olarak değerlendirmek daha uygun gözüküyor.\n\n" +
      "Eğer farklı düşünüyorsan, biraz daha detay verir misin?";
    return;
  }

  if (hasImprovement) {
    response.innerText =
      "Anladığım kadarıyla mevcut durumda bir hata yok, süreci/ürünü daha iyi hale getirmişsin 👍\n" +
      "Bunu iyileştirme olarak değerlendirmek uygun görünüyor.";
    return;
  }

  response.innerText =
    "Biraz daha netleştirelim mi? 🙂\n" +
    "Bu değişiklik bir hatayı mı gideriyor, yoksa çalışan bir şeyi daha mı iyi hale getiriyor?\n" +
    "Kısaca neyi, nasıl değiştirdiğini yazarsan daha doğru yönlendirebilirim.";
}
