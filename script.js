document.addEventListener('DOMContentLoaded', function () {
    // --- Initialize Splide Sliders ---

    // Highlights Slider
    var highlightsSlider = document.getElementById('highlights-slider');
    if (highlightsSlider) {
        new Splide(highlightsSlider, {
            type: 'loop', // 'loop' or 'slide' or 'fade'
            perPage: 3, // Number of slides to show
            perMove: 1, // Number of slides to move on arrow click
            gap: '1.5rem', // Space between slides (Tailwind: space-x-6 is 1.5rem)
            autoplay: true,
            interval: 3000,
            pauseOnHover: true,
            pagination: true, // Show pagination dots
            arrows: false, // Hide arrows for this one, rely on autoplay and pagination
            breakpoints: {
                1023: { // lg and down
                    perPage: 2,
                    gap: '1rem',
                },
                639: { // sm and down
                    perPage: 1,
                    gap: '0.5rem',
                }
            }
        }).mount();
    }

    // Photo Gallery Carousel
    var gallerySlider = document.getElementById('gallery-slider');
    if (gallerySlider) {
        new Splide(gallerySlider, {
            type: 'fade', // Using fade effect for full-width gallery
            rewind: true, // Go back to the first slide after the last
            perPage: 1,
            autoplay: true,
            interval: 4000,
            pagination: true, // Show pagination
            arrows: true, // Show navigation arrows
            heightRatio: 0.5625, // For 16:9 aspect ratio (9/16), adjust as needed
            // Or set fixed height: height: '40rem',
        }).mount();
    }

    // Testimonials Slider
    var testimonialsSlider = document.getElementById('testimonials-slider');
    if (testimonialsSlider) {
        new Splide(testimonialsSlider, {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
            pagination: true,
            arrows: false, // Typically testimonials don't need arrows if pagination is clear
        }).mount();
    }

    // Food Carousel (Optional)
    var foodCarousel = document.getElementById('food-carousel');
    if (foodCarousel) {
        new Splide(foodCarousel, {
            type: 'loop',
            perPage: 4,
            perMove: 1,
            gap: '1rem',
            autoplay: true,
            interval: 2500,
            pagination: true,
            arrows: false,
            breakpoints: {
                1023: { perPage: 3 },
                767: { perPage: 2 },
                639: { perPage: 1.5, gap: '0.5rem', focus: 'center' } // Show partial next slide on mobile
            }
        }).mount();
    }

    // --- Room Modal Functionality ---
    const roomCards = document.querySelectorAll('.room-card');
    const modal = document.getElementById('roomModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalRoomImage = document.getElementById('modalRoomImage');
    const modalRoomTitle = document.getElementById('modalRoomTitle');
    const modalRoomDetails = document.getElementById('modalRoomDetails');

    roomCards.forEach(card => {
        card.addEventListener('click', () => {
            modalRoomImage.src = card.dataset.roomImage;
            modalRoomImage.alt = card.dataset.roomTitle;
            modalRoomTitle.textContent = card.dataset.roomTitle;
            modalRoomDetails.textContent = card.dataset.roomDetails;
            modal.classList.remove('opacity-0', 'invisible');
            modal.classList.add('opacity-100', 'visible');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('opacity-0', 'invisible');
            modal.classList.remove('opacity-100', 'visible');
            document.body.style.overflow = 'auto';
        });
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('opacity-0', 'invisible');
                modal.classList.remove('opacity-100', 'visible');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Newsletter Form Validation & Submission ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmailInput = document.getElementById('newsletterEmail');
    const newsletterMessage = document.getElementById('newsletterMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = newsletterEmailInput.value;
            newsletterMessage.textContent = '';

            if (!validateEmail(email)) {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.classList.remove('text-green-300');
                newsletterMessage.classList.add('text-orange-300');
                newsletterEmailInput.focus();
                return;
            }

            newsletterMessage.textContent = 'Thank you for subscribing!';
            newsletterMessage.classList.remove('text-orange-300');
            newsletterMessage.classList.add('text-green-300');
            newsletterEmailInput.value = '';

            setTimeout(() => {
                newsletterMessage.textContent = '';
            }, 3000);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Scroll-to-Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Dynamic Pricing Toggler ---
    const pricingToggle = document.getElementById('pricingToggle');
    const prices = document.querySelectorAll('.price');
    const pricePeriods = document.querySelectorAll('.price-period');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function () {
            const isWeekly = this.checked;
            prices.forEach(priceEl => {
                priceEl.textContent = isWeekly ? priceEl.dataset.weekly : priceEl.dataset.daily;
            });
            pricePeriods.forEach(periodEl => {
                periodEl.textContent = isWeekly ? '/week' : '/night';
            });
        });
    }

    const playVideoButton = document.getElementById('playVideoButton');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');

    if (playVideoButton && videoThumbnail && videoPlayerContainer) {
        playVideoButton.addEventListener('click', () => {
        videoThumbnail.style.display = 'none';
        playVideoButton.style.display = 'none';
        videoPlayerContainer.classList.remove('hidden');

        // Inject and autoplay video
        videoPlayerContainer.innerHTML = `
        <video controls autoplay class="w-full h-full object-cover">
        <source src="Video Thumbnail.mp4" type="video/mp4">
        Your browser does not support the video tag.
          </video>
         `;
    });
 }

    // --- Interactive Map Pop-up ---
    const mapHighlightBtn = document.getElementById('mapHighlightBtn');
    const mapHighlightPopup = document.getElementById('mapHighlightPopup');
    if (mapHighlightBtn && mapHighlightPopup) {
        mapHighlightBtn.addEventListener('mouseenter', () => {
            mapHighlightPopup.classList.remove('hidden');
        });
        mapHighlightBtn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!mapHighlightPopup.matches(':hover')) {
                    mapHighlightPopup.classList.add('hidden');
                }
            }, 200);
        });
        mapHighlightPopup.addEventListener('mouseleave', () => {
            mapHighlightPopup.classList.add('hidden');
        });
    }

    // --- Set Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Simple Animation on Scroll ---
    const animatedElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                entry.target.style.opacity = 1;
                if (entry.target.dataset.aos === 'fade-up') entry.target.style.transform = 'translateY(0)';
                else if (entry.target.dataset.aos === 'fade-right') entry.target.style.transform = 'translateX(0)';
                else if (entry.target.dataset.aos === 'fade-left') entry.target.style.transform = 'translateX(0)';
                else entry.target.style.transform = 'none';

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = 0;
        if (el.dataset.aos === 'fade-up') el.style.transform = 'translateY(20px)';
        else if (el.dataset.aos === 'fade-right') el.style.transform = 'translateX(-20px)';
        else if (el.dataset.aos === 'fade-left') el.style.transform = 'translateX(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});