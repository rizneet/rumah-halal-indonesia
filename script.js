document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SETUP ELEMEN
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    // ==========================================
    // 2. LOGIKA HAMBURGER MENU (Buka & Tutup)
    // ==========================================
    if (mobileMenu && navLinks) {
        const menuIcon = mobileMenu.querySelector('i');

        // A. Klik ikon untuk Buka/Tutup menu
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Ubah ikon garis tiga menjadi X (dan sebaliknya)
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // B. Tutup menu otomatis saat pengunjung mengklik salah satu menu (Beranda/Layanan/Kontak)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // ==========================================
    // 3. LOGIKA SCROLL (Digabung agar lebih ringan)
    // ==========================================
    window.addEventListener('scroll', () => {
        
        // A. Mengubah Opacity Navbar (Gelap saat lewat 150px)
        if (navbar) {
            if (window.scrollY > 150) {
                navbar.classList.add('scrolled'); // Opacity 70% aktif
            } else {
                navbar.classList.remove('scrolled'); // Kembali ke 20%
            }
        }

        // B. Menutup Menu HP otomatis saat layar mulai di-scroll
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            if (mobileMenu) {
                const menuIcon = mobileMenu.querySelector('i');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });

    // ==========================================
    // 4. EFEK MUNCUL (FADE-IN) SERVICE CARDS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Berhenti mengamati setelah muncul
            }
        });
    }, observerOptions);

    // Menerapkan pengamatan pada semua kartu layanan
    document.querySelectorAll('.service-card').forEach(card => {
        // Kondisi awal sebelum muncul
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});