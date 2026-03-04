// questions.js
// Flow objesi: karar ağacı
const flow = {

    /* -------- ÜRÜN TİPİ SEÇİMİ -------- */
    start: {
        text: "Değişiklik tipi nedir?",
        answers: [
            { text: "Donanım Değişikliği", next: "hardware_start" },
            { text: "Yazılım/Donanım Çekirdeği Değişikliği", next: "software_start" }
        ]
    },

    /* ===================================================== */
    /* ================= DONANIM AKIŞI ===================== */
    /* ===================================================== */

    hardware_start: {
        text: "Doküman ilk aktarım mı yoksa güncelleme mi?",
        answers: [
            { text: "Doküman İlk Aktarımı", next: "hardware_initial_transfer" },
            { text: "Doküman Güncellemesi", next: "hardware_update_reason" }
        ]
    },

    hardware_initial_transfer: {
        text: "Dokümanı yeni aktarılan donanım daha önce üretildi mi?",
        answers: [
            { text: "Hayır, daha önce üretilmedi", result: "Değişiklik uygulama analizi gerekmez." },
            { text: "Evet, önceden üretildi", next: "hardware_previous_production" }
        ]
    },

    hardware_previous_production: {
        text: "Önceden üretilen donanım aktarılan revizyona uygun mu?",
        answers: [
            { text: "Evet", result: "Uyumlu üretim. İlave aksiyon gerekmiyor." },
            { text: "Hayır, taslak dokümana göre üretildi", next: "hardware_draft_production" },
            { text: "Bilinmiyor", result: "Belirsizlik riski. Donanım ile doküman uyum analizi yapılmalı." }
        ]
    },

    hardware_draft_production: {
        text: "Taslak dokümana göre üretilen donanımlara ne yapılacak?",
        answers: [
            { text: "Yeniden işlenecek (Rework)", result: "Taslak dokümana göre üretilmiş donanımlar yeniden işlenecek." },
            { text: "Olduğu gibi kullanılacak (As-is)", result: "Taslak dokümana göre üretilmiş donanımlar olduğu gibi kullanılacak. Sapma onayı gerekli." }
        ]
    },

    hardware_update_reason: {
        text: "Güncelleme nedeni nedir?",
        answers: [
            { text: "Uygunsuzluk giderme", next: "hardware_nonconformity_level" },
            { text: "İyileştirme", next: "hardware_apply_open_orders" }
        ]
    },

    hardware_nonconformity_level: {
        text: "Uygunsuzluk hangi seviyede yaşandı?",
        answers: [
            { text: "Dokümanı güncellenen donanım seviyesinde", next: "hardware_apply_open_orders" },
            { text: "Donanımın üst seviyesinde", next: "hardware_apply_open_orders" }
        ]
    },

    hardware_apply_open_orders: {
        text: "Dokümanı güncellenen donanıma ait açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Değişiklik sadece karar onayı sonrası açılacak yeni siparişlere uygulanacak." },
            { text: "Evet", next: "hardware_open_completed" }
        ]
    },

    hardware_open_completed: {
        text: "Donanıma ait montaj/test adımı tamamlanmış açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Montaj/test adımı henüz tamamlanmamış açık siparişlere uygulanacak." },
            { text: "Evet", next: "hardware_warehouse_level" }
        ]
    },

    hardware_warehouse_level: {
        text: "Üretimi tamamlanmış / Depoya aktarılan donanımlara uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık siparişlere uygulanacak. Depoya aktarılmış donanımlara uygulanmayacak." },
            { text: "Evet", next: "hardware_upper_open" }
        ]
    },

    hardware_upper_open: {
        text: "Donanımın üst seviyelerine ait açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara uygulanacak. Üst seviyelere uygulanmayacak." },
            { text: "Evet", next: "hardware_upper_completed" }
        ]
    },

    hardware_upper_completed: {
        text: "Üst seviyeye ait montaj/test adımı tamamlanmış açık siparişlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara + Sadece üst seviyelere ait montaj/test adımı henüz tamamlanmamış açık siparişlere uygulanacak." },
            { text: "Evet", next: "hardware_upper_warehouse" }
        ]
    },

    hardware_upper_warehouse: {
        text: "Üretimi tamamlanmış / Depoya aktarılan üst seviyelere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanımlara + Açık üst seviye siparişlerine uygulanacak. Depodaki üst seviyelere uygulanmayacak." },
            { text: "Evet", next: "hardware_customer_products" }
        ]
    },

    hardware_customer_products: {
        text: "Müşterideki ürünlere uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Açık sipariş ve depodaki donanım + üst seviyelere uygulanacak." },
            { text: "Evet", result: "Müşterideki dahil tüm seviyelere uygulanacak." }
        ]
    },

    /* ===================================================== */
    /* ========== DONANIM ÇEKİRDEĞİ/YAZILIM AKIŞI ========== */
    /* ===================================================== */

    // artık software_start sorusu yok
    software_initial_transfer: {
        text: "Dokümanı aktarılan sürüm daha önce birime/sisteme yüklendi mi",
        answers: [
            { text: "Hayır, daha önce yüklenmedi", result: "Değişiklik uygulama analizi gerekmez." },
            { text: "Evet, önceden yüklendi", next: "software_previous_production" }
        ]
    },

    software_previous_production: {
        text: "Birime/sisteme önceden yüklenen sürüm, aktarılan sürüm mü?",
        answers: [
            { text: "Evet", result: "Önceden yüklenen birim/sistem parça+seri no bilgileri temin edilip, SAP'de ekipman kayıtları güncellenmeli." },
            { text: "Hayır", next: "software_apply_open_orders" },
            { text: "Bilinmiyor", result: "Sürüm uyum analizi yapılmalı." }
        ]
    },

    software_update_reason: {
        text: "Güncelleme nedeni nedir?",
        answers: [
            { text: "Uygunsuzluk giderme", next: "software_apply_open_orders" },
            { text: "İyileştirme", next: "software_apply_open_orders" }
        ]
    },

    software_apply_open_orders: {
        text: "Daha önce üretilmiş birimlere/sistemlere yeni sürüm yüklenecek mi?",
        answers: [
            { text: "Hayır", result: "Üretilmiş birimlere/sistemlere yüklü yazılım eski sürümde kalacak." },
            { text: "Evet", next: "software_customer_products" }
        ]
    },

    software_customer_products: {
        text: "Dokümanı aktarılan sürüm daha önce birime/sisteme yüklendi mi",
        answers: [
            { text: "Hayır, daha önce yüklenmedi", result: "Değişiklik uygulama analizi gerekmez." },
            { text: "Evet, önceden yüklendi", next: "software_previous_production" }
        ]
    }

};
