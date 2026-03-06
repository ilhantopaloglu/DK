// questions.js
// Flow objesi: karar ağacı

const flow = {

    /* -------- ÜRÜN TİPİ SEÇİMİ -------- */

    start: {
        text: "Değişiklik tipi nedir?",
        answers: [
            { text: "Donanım Değişikliği", next: "hardware_update_reason" },
            { text: "Donanım Çekirdeği/Yazılım Değişikliği", next: "software_update_reason" }
        ]
    },

    /* ===================================================== */
    /* ================= DONANIM AKIŞI ===================== */
    /* ===================================================== */

    hardware_update_reason: {
        text: "Güncelleme nedeni nedir?",
        answers: [
            { text: "Hata giderme", next: "hardware_nonconformity_level" },
            { text: "İyileştirme", next: "iyilestirme_tanimi" },
            { text: "Önleyici", next: "onleyici_tanimi" }
        ]
    },

    hardware_nonconformity_level: {
        text: "Uygunsuzluk hangi seviyede yaşandı?",
        answers: [
            { text: "Dokümanı güncellenen donanım seviyesinde", next: "nonconformity_activity" },
            { text: "Donanımın üst seviyesinde", next: "nonconformity_activity" }
        ]
    },

    nonconformity_activity: {
        text: "Hangi projenin hangi faaliyeti esnasında uygunsuzluk yaşandı?",
        input: "textarea",
        next: "nonconformity_notification"
    },

    nonconformity_notification: {
        text: "Uygunsuzluğa ait bildirim açıldı mı?",
        answers: [
            { text: "Evet", next: "notification_number" },
            { text: "Hayır", next: "degisiklik_tanimi" }
        ]
    },

    notification_number: {
        text: "Bildirim numarasını giriniz",
        input: "text",
        maxLength: 40,
        next: "degisiklik_tanimi"
    },

    degisiklik_tanimi: {
        text: "Yapılan değişikliği ve gerekçesini belirtiniz",
        input: "textarea",
        next: "hardware_apply_open_orders"
    },
    
    iyilestirme_tanimi: {
        text: "Yapılan iyileştirmeyi ve gerekçesini belirtiniz",
        input: "textarea",
        next: "hardware_apply_open_orders"
    },

    onleyici_tanimi: {
        text: "Yapılan önleyici çalışmayı ve gerekçesini belirtiniz",
        input: "textarea",
        next: "hardware_apply_open_orders"
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

    software_update_reason: {
        text: "Güncelleme nedeni nedir?",
        answers: [
            { text: "Uygunsuzluk giderme", next: "software_initial_transfer" },
            { text: "İyileştirme", next: "software_initial_transfer" },
            { text: "Önleyici", next: "software_initial_transfer" }
        ]
    },

    software_initial_transfer: {
        text: "Dokümanı aktarılan sürüm daha önce birime/sisteme yüklendi mi?",
        answers: [
            { text: "Hayır, daha önce yüklenmedi", next: "software_apply_open_orders" },
            { text: "Evet, önceden yüklendi", next: "software_previous_production" },
            { text: "Bilinmiyor", next: "software_apply_open_orders" }
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

    software_apply_open_orders: {
        text: "Daha önce üretilmiş birimlere/sistemlere yeni sürüm yüklenecek mi?",
        answers: [
            { text: "Hayır", result: "Üretilmiş birimlere/sistemlere yüklü yazılım eski sürümde kalacak." },
            { text: "Evet", next: "software_customer_products" }
        ]
    },

    software_customer_products: {
        text: "Müşterideki yazılımlara uygulanacak mı?",
        answers: [
            { text: "Hayır", result: "Müşterideki hariç birimlere/sistemlere yeni sürüm yüklenecek. Müşterideki eski sürümde kalacak." },
            { text: "Evet", result: "Müşterideki dahil tüm birimlere/sistemlere güncel sürüm yüklenecek." }
        ]
    }

};
