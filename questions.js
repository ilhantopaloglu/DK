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
        text: "Dokümanı aktarılan donanım daha önce üretildi mi?",
        answers: [
            { text: "Hayır, daha önce üretilmedi", result: "Değişiklik uygulama analizi gerekmez." },
            { text: "Evet, önceden üretildi", next: "previous_production" }
        ]
    },

    previous_production: {
        text: "Önceden üretilen donanım aktarılan revizyona uygun mu?",
        answers: [
            { text: "Evet", result: "Uyumlu üretim. İlave aksiyon gerekmiyor." },
            { text: "Hayır, taslak dokümana göre üretildi", next: "draft_production" },
            { text: "Bilinmiyor", result: "Belirsizlik riski. Donanım ile doküman uyum analizi yapılmalı." }
        ]
    },

    draft_production: {
        text: "Taslak dokümana göre üretilen donanımlara ne yapılacak?",
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
            { text: "Dokümanı güncellenen donanım seviyesinde", next: "apply_open_orders" },
            { text: "Donanımın üst seviyesinde", next: "apply_open_orders" }
        ]
    },

    /* -------- Uygulama Kapsamı -------- */
    apply_open_orders: {
        text: "Dokümanı güncellenen donanıma ait açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Değişiklik sadece karar onayı sonrası açılacak yeni siparişlere uygulanacak. (Varsa) açık sipariş ve depodaki donanım + üst seviyelere uygulanmayacak." },
            { text: "Evet", next: "open_completed" }
        ]
    },

    open_completed: {
        text: "Donanıma ait montaj/test adımı tamamlanmış açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Montaj/test adımı henüz tamamlanmamış açık siparişlere uygulanacak." },
            { text: "Evet", next: "warehouse_level" }
        ]
    },

    warehouse_level: {
        text: "Üretimi tamamlanmış / Depoya aktarılan ürünlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Montaj/test adımı tamamlanmış dahil tüm açık siparişlere uygulanacak. Ancak depoya aktarılmış donanımlara uygulanmayacak." },
            { text: "Evet", next: "upper_open" }
        ]
    },

    upper_open: {
        text: "Donanımın üst seviyelerine ait açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara uygulanacak, ancak üst seviyelere uygulanmayacak." },
            { text: "Evet", next: "upper_completed" }
        ]
    },

    upper_completed: {
        text: "Üst seviyeye ait montajı/testi tamamlanmış açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara uygulanacak + Üst seviyeye ait montaj/test adımı henüz tamamlanmamış açık siparişlere uygulanacak." },
            { text: "Evet", next: "upper_warehouse" }
        ]
    },

    upper_warehouse: {
        text: "Üretimi tamamlanmış / Depoya aktarılan üst seviyelere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara + Üst seviyeye ait montaj/test adımı tamamlanmış açık siparişlerine uygulanacak. Depoya aktarılmış üst seviyelere uygulanmayacak." },
            { text: "Evet", next: "customer_products" }
        ]
    },

    customer_products: {
        text: "Müşterideki ürünlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanım + üst seviyelere uygulanacak." },
            { text: "Evet", result: "Müşterideki dahil tüm seviyelere uygulanacak." }
        ]
    }

};
