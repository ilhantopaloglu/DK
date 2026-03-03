// questions.js
// Flow objesi: karar ağacı
const flow = {

    start: {
        text: "Doküman ilk aktarım mı yoksa güncelleme mi?",
        answers: [
            { text: "Doküman İlk Aktarımı", next: "initial_transfer" },
            { text: "Doküman Güncellemesi", next: "update_reason" }
        ]
    },

    /* -------- 1. Doküman İlk Aktarımı -------- */
    initial_transfer: {
        text: "Ürün daha önce üretildi mi?",
        answers: [
            { text: "Hayır, ilk üretim olacak", result: "İlk üretim. Değişiklik uygulama analizi gerekmez." },
            { text: "Evet, önceden üretildi", next: "previous_production" }
        ]
    },

    previous_production: {
        text: "Önceden üretilen ürün aktarılan revizyona uygun mu?",
        answers: [
            { text: "Evet", result: "Uyumlu üretim. İlave aksiyon gerekmiyor." },
            { text: "Hayır, taslak dokümana göre üretildi", next: "draft_production" },
            { text: "Bilinmiyor", result: "Belirsizlik riski. Fiziksel-doküman uyum analizi yapılmalı." }
        ]
    },

    draft_production: {
        text: "Taslak dokümana göre üretilen ürünlere ne yapılacak?",
        answers: [
            { text: "Yeniden işlenecek (Rework)", result: "Rework uygulanacak." },
            { text: "Olduğu gibi kullanılacak (As-is)", result: "As-is kabul. Sapma onayı gerekli." }
        ]
    },

    /* -------- 2. Doküman Güncellemesi -------- */
    update_reason: {
        text: "Güncelleme nedeni nedir?",
        answers: [
            { text: "Uygunsuzluk giderme", next: "nonconformity_level" },
            { text: "İyileştirme", next: "apply_open_orders" }
        ]
    },

    nonconformity_level: {
        text: "Uygunsuzluk hangi seviyede yaşandı?",
        answers: [
            { text: "Ürün seviyesinde", next: "apply_open_orders" },
            { text: "Üst seviyede", next: "apply_open_orders" }
        ]
    },

    /* -------- Uygulama Kapsamı -------- */
    apply_open_orders: {
        text: "Açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Değişiklik açık siparişlere uygulanmayacak." },
            { text: "Evet", next: "open_completed" }
        ]
    },

    open_completed: {
        text: "Montaj/Test tamamlanmış açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Sadece montajı tamamlanmamış açık siparişlere uygulanacak." },
            { text: "Evet", next: "warehouse_level" }
        ]
    },

    warehouse_level: {
        text: "Depodaki ürünlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık siparişlere uygulanacak. Depoya uygulanmayacak." },
            { text: "Evet", next: "upper_open" }
        ]
    },

    upper_open: {
        text: "Üst seviye açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Alt seviyede uygulanacak, üst seviyeye uygulanmayacak." },
            { text: "Evet", next: "upper_completed" }
        ]
    },

    upper_completed: {
        text: "Montaj/Test tamamlanmış üst seviye açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Üst seviyede sadece tamamlanmamış siparişlere uygulanacak." },
            { text: "Evet", next: "upper_warehouse" }
        ]
    },

    upper_warehouse: {
        text: "Depodaki üst seviyelere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Üst seviye depo hariç uygulanacak." },
            { text: "Evet", next: "customer_products" }
        ]
    },

    customer_products: {
        text: "Müşterideki ürünlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Müşteri hariç tüm seviyelere uygulanacak." },
            { text: "Evet", result: "Tüm seviyeler dahil uygulanacak." }
        ]
    }

};
