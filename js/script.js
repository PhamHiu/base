// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('#primary-navigation');

    if (mobileNavToggle && primaryNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isVisible = primaryNav.getAttribute('data-visible') === "true";
            primaryNav.setAttribute('data-visible', !isVisible);
            mobileNavToggle.setAttribute('aria-expanded', !isVisible);
        });
    }

    // --- Smooth scrolling for anchor links in the navbar (optional but nice) ---
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        // Exclude login button from smooth scroll if it's just a placeholder
        if (link.getAttribute('href') === '#login' && link.classList.contains('login-btn')) {
            return; 
        }

        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Ensure it's a valid internal link and not just '#'
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Calculate position, considering fixed header/navbar height if any
                    let headerOffset = 0;
                    const navbar = document.querySelector('.navbar');
                    if (navbar && getComputedStyle(navbar).position === 'fixed') {
                        headerOffset = navbar.offsetHeight;
                    }
                    // You might also have a fixed .site-header, adjust if needed
                    // const siteHeader = document.querySelector('.site-header');
                    // if (siteHeader && getComputedStyle(siteHeader).position === 'fixed') {
                    //     headerOffset += siteHeader.offsetHeight;
                    // }


                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile nav if open after clicking a link
                    if (primaryNav.getAttribute('data-visible') === "true") {
                        primaryNav.setAttribute('data-visible', false);
                        mobileNavToggle.setAttribute('aria-expanded', false);
                    }
                }
            }
        });
    });

    // --- Basic Contact Form Submission (Placeholder) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // For demonstration, we'll just log it and show an alert
                console.log('Form Submitted:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
                contactForm.reset(); // Clear the form
            } else {
                alert('Vui lòng điền đầy đủ các trường bắt buộc.');
            }
        });
    }

    // --- Basic Search Functionality (Placeholder) ---
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-item input[type="search"]');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Bạn đang tìm kiếm: "${searchTerm}"\n(Chức năng tìm kiếm thực tế cần được phát triển thêm)`);
                // In a real application, you would redirect to a search results page
                // window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
            } else {
                alert('Vui lòng nhập từ khóa tìm kiếm.');
            }
        });
        // Optionally, allow search on Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // --- (Optional) Add 'active' class to nav link based on scroll position ---
    // This is a bit more complex and can be added later if desired.
    // It involves tracking scroll position and sections in view.

    console.log('BIT Club website scripts loaded!');
});