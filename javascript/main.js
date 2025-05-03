document.addEventListener('DOMContentLoaded', function () {

    // Get all necessary elements
    const header = document.querySelector('.header-nav');
    const headerHeight = header.offsetHeight;
    const navList = document.querySelector('.header-ul');
    const navLinks = document.querySelectorAll('.header-ul a');
    const sections = document.querySelectorAll('section');
    const content = document.querySelector('.content');
    let isProgrammaticScroll = false;

    // ===== HAMBURGER MENU FUNCTIONALITY =====
    // Create and insert hamburger menu button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    header.insertBefore(menuToggle, navList);

    // Add index to each menu item for staggered animation
    document.querySelectorAll('.header-ul li').forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Toggle menu function
    function toggleMenu() {
        navList.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
        
        if (navList.classList.contains('show')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // Event listener for menu toggle
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 1024) { // For mobile/tablet
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Close menu if open (mobile)
                    if (navList.classList.contains('show')) {
                        toggleMenu();
                    }

                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (!targetSection) return;

                    isProgrammaticScroll = true;

                    // Scroll to section with offset
                    window.scrollTo({
                        top: targetSection.offsetTop - header.offsetHeight,
                        behavior: 'smooth'
                    });

                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    isProgrammaticScroll = false;
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.header-nav') && navList.classList.contains('show')) {
            toggleMenu();
        }
    });

    

    // ===== SCROLL FUNCTIONALITY =====
    // Intersection Observer for section highlighting
    const observerOptions = {
        root: null, // Viewport as root
        rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        if (isProgrammaticScroll) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // ===== BACK TO TOP BUTTON FUNCTIONALITY =====
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Modal elements
    const seoModal = document.getElementById("seoModal");
    const seoModalClose = document.getElementById("seoModalClose");
    const articleList = document.getElementById("articleList");
    const articleContent = document.getElementById("articleContent");
    const loadedArticle = document.getElementById("loadedArticle");
    const backToList = document.getElementById("backToList");

    // Sample articles data
    const seoArticles = [
    {
        title: "7 Best Ways to Optimize Your PC for Gaming in 2025",
        description: "A practical guide to boosting game performance in 2025.",
        anchor: "seo-gaming-2025.html"
    },
    {
        title: "How to Improve Page Speed for SEO",
        description: "Tips on making your website faster and more SEO-friendly.",
        anchor: "page-speed-seo.html"
    },
    {
        title: "Semantic HTML for Better SEO",
        description: "Learn how semantic tags help search engines understand your content.",
        anchor: "semantic-html-seo.html"
    }
    ];

    // Open modal
    document.querySelectorAll(".work-card").forEach(card => {
    if (card.textContent.includes("SEO Writing Sample")) {
        card.addEventListener("click", () => {
        seoModal.style.display = "block";
        articleContent.style.display = "none";
        articleList.style.display = "grid";
        loadedArticle.innerHTML = "";
        });
    }
    });

    // Close modal
    seoModalClose.addEventListener("click", () => {
    seoModal.style.display = "none";
    });

    // Close modal on outside click
    window.addEventListener("click", (e) => {
    if (e.target == seoModal) {
        seoModal.style.display = "none";
    }
    });

    // Back to article list
    backToList.addEventListener("click", () => {
    articleContent.style.display = "none";
    articleList.style.display = "grid";
    });

    // Load article cards
    seoArticles.forEach(article => {
    const card = document.createElement("div");
    card.className = "seo-article-card";
    card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
    `;
    card.addEventListener("click", () => {
        fetch(article.anchor)
        .then(res => res.text())
        .then(html => {
            loadedArticle.innerHTML = html;
            articleList.style.display = "none";
            articleContent.style.display = "block";
        });
    });
    articleList.appendChild(card);
    });


});
