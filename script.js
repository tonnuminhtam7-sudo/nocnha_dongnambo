// Tailwind script
function initTailwind() {
    return {
        config(userConfig = {}) {
            return {
                content: [],
                theme: { extend: {} },
                plugins: [],
                ...userConfig
            };
        }
    };
}

// Dark mode
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('dark-toggle');
    icon.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Gallery data (chỉ dùng hình Núi Bà Đen)
const galleryImages = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg", caption: "Toàn cảnh hùng vĩ" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/N%C3%BAi_B%C3%A0_%C4%90en.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en.jpg", caption: "Cáp treo lên đỉnh" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg", caption: "Linh Sơn Thánh Mẫu" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/N%C3%BAi_B%C3%A0_%C4%90en.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en.jpg", caption: "Hoàng hôn trên đỉnh" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en_T%C3%A2y_Ninh.jpg", caption: "Mây bao phủ núi" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/N%C3%BAi_B%C3%A0_%C4%90en.jpg/1280px-N%C3%BAi_B%C3%A0_%C4%90en.jpg", caption: "Tượng Phật Bà Quan Âm" }
];

// Render gallery + lightbox
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    galleryImages.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = 'group relative overflow-hidden rounded-3xl cursor-pointer';
        div.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" class="w-full h-80 object-cover group-hover:scale-110 transition">
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p class="text-white font-medium">${img.caption}</p>
            </div>
        `;
        div.onclick = () => showLightbox(index);
        container.appendChild(div);
    });
}

function showLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = galleryImages[index].src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
}

window.hideLightbox = function () {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
};

// Accordion FAQ
const faqData = [
    { q: "Vé cáp treo bao nhiêu tiền?", a: "Khứ hồi người lớn 300.000 VNĐ, trẻ em 150.000 VNĐ." },
    { q: "Leo núi mất bao lâu?", a: "4–6 giờ tùy sức khỏe. Có 1.200 bậc thang." },
    { q: "Thời điểm đẹp nhất để đi?", a: "Tháng 11 đến tháng 4 (mùa khô). Tránh mưa lớn." },
    { q: "Có chỗ ăn uống không?", a: "Rất nhiều quán dưới chân núi và trên đỉnh." },
    { q: "Có cần hướng dẫn viên không?", a: "Không bắt buộc nhưng nên thuê để hiểu thêm về lịch sử." }
];

function renderFAQ() {
    const container = document.getElementById('faq-list');
    faqData.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = 'bg-white dark:bg-[#1a3c1a]/50 rounded-3xl overflow-hidden';
        div.innerHTML = `
            <button onclick="this.nextElementSibling.classList.toggle('hidden'); this.querySelector('span').textContent = this.nextElementSibling.classList.contains('hidden') ? '+' : '-'" 
                    class="w-full px-8 py-6 flex justify-between items-center text-left font-semibold text-lg">
                ${item.q}
                <span class="text-3xl">+</span>
            </button>
            <div class="hidden px-8 pb-6 text-gray-700 dark:text-gray-300">${item.a}</div>
        `;
        container.appendChild(div);
    });
}

// Form submit (demo)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('✅ Cảm ơn bạn! Thông tin đã được gửi. Chúng tôi sẽ liên hệ sớm nhất ❤️');
    this.reset();
});

// Scroll animation
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

// Khởi chạy
window.onload = () => {
    initTailwind();
    renderGallery();
    renderFAQ();
    handleScrollAnimations();
    console.log('%c✅ Website Núi Bà Đen đã sẵn sàng! Responsive, animation mượt, dark mode đầy đủ.', 'color:#f5d300; font-weight:bold; font-size:16px');
};
