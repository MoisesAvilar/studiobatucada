document.addEventListener("DOMContentLoaded", function() {
    function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Alternar modo escuro');
    document.body.appendChild(darkModeToggle);

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled' || savedMode === null) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
    }

    initDarkMode();
    initFAQ();
    initForms();
    initSmoothScrolling();
    initAnimations();
    initScrollEffect();
    initServicesAnimation();
    
    function initServicesAnimation() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.service-icon');
        const titleLine = item.querySelector('.service-content h3::after');
        
        icon.style.transform = 'rotate(10deg) scale(1.1)';
        
        if (titleLine) {
            titleLine.style.width = '80px';
        }
        });
        
        item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.service-icon');
        const titleLine = item.querySelector('.service-content h3::after');
        
        icon.style.transform = 'rotate(0) scale(1)';
        
        if (titleLine) {
            titleLine.style.width = '50px';
        }
        });
    });
    }

    function initFAQ() {
        const faqItems = document.querySelectorAll(".faq-item");
        
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });
                
                item.classList.toggle("active", !isActive);
            });
        });
    }
    
    function initForms() {
        const forms = document.querySelectorAll(".contact-form");
        
        forms.forEach(form => {
            form.addEventListener("submit", handleFormSubmit);
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const button = form.querySelector(".btn-primary");
        
        if (!validateForm(form)) {
            showMessage("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }
        
        const originalText = button.textContent;
        button.textContent = "Enviando...";
        button.disabled = true;
        form.classList.add("loading");
        
        setTimeout(() => {
            form.reset();
            
            button.textContent = originalText;
            button.disabled = false;
            form.classList.remove("loading");
            
            showMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
            
            trackFormSubmission(form.id);
            
        }, 2000);
    }
    
    function validateForm(form) {
        const requiredFields = form.querySelectorAll("input[required]");
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add("error");
                isValid = false;
            } else {
                field.classList.remove("error");
            }
        
            if (field.type === "email" && field.value.trim()) {
                const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add("error");
                    isValid = false;
                }
            }
            
            if (field.type === "tel" && field.value.trim()) {
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(field.value)) {
                    field.value = formatPhone(field.value);
                }
            }
        });
        
        return isValid;
    }
    
    function formatPhone(phone) {
        const numbers = phone.replace(/\D/g, "");
        
        if (numbers.length === 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (numbers.length === 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        
        return phone;
    }
    
    function showMessage(message, type) {
        const existingMessages = document.querySelectorAll(".form-message");
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement("div");
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        
        if (type === "success") {
            messageDiv.style.background = "linear-gradient(135deg, #48bb78, #38a169)";
        } else {
            messageDiv.style.background = "linear-gradient(135deg, #f56565, #e53e3e)";
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = "slideOutRight 0.3s ease-out";
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    function initSmoothScrolling() {
        const links = document.querySelectorAll("a[href^=\"#\"]");
        
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute("href");
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector(".header").offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }
    
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in-up");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll(".service-item, .testimonial-item, .faq-item, .section-title");
        animatedElements.forEach(el => observer.observe(el));
    }
    
    
    function initFieldFormatting() {
        const phoneFields = document.querySelectorAll("input[type=\"tel\"]");
        phoneFields.forEach(field => {
            field.addEventListener("input", (e) => {
                e.target.value = formatPhone(e.target.value);
            });
        });
        
        const nameFields = document.querySelectorAll("input[placeholder*=\"Nome\"]");
        nameFields.forEach(field => {
            field.addEventListener("blur", (e) => {
                const words = e.target.value.toLowerCase().split(" ");
                const capitalizedWords = words.map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                );
                e.target.value = capitalizedWords.join(" ");
            });
        });
    }
    
    function trackFormSubmission(formId) {
        console.log(`Form submitted: ${formId}`);

        if (typeof gtag !== "undefined") {
            gtag("event", "form_submit", {
                "form_id": formId,
                "event_category": "engagement"
            });
        }
    }
    
    const ctaButtons = document.querySelectorAll(".btn-primary");
    ctaButtons.forEach(button => {
        if (!button.closest("form")) {
            button.addEventListener("click", () => {
                const heroForm = document.querySelector(".hero-form");
                if (heroForm) {
                    heroForm.scrollIntoView({ 
                        behavior: "smooth",
                        block: "center"
                    });

                    setTimeout(() => {
                        const firstInput = heroForm.querySelector("input");
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            });
        }
    });
    
    initFieldFormatting();
    
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .contact-form input.error {
            border-color: #e53e3e !important;
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .service-item,
        .testimonial-item,
        .faq-item {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .service-item.fade-in-up,
        .testimonial-item.fade-in-up,
        .faq-item.fade-in-up {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    console.log("Landing page initialized successfully!");

    function initScrollEffect() {
        const header = document.getElementById("mainHeader");
        const logo = header.querySelector(".logo");
        const logoImg = header.querySelector(".logo-img");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("studioVideo");
  const playButton = document.getElementById("playButton");

  if (video && playButton) {
    playButton.addEventListener("click", () => {
      video.play();
      playButton.style.display = "none";
      video.setAttribute("controls", true);
    });
  }
});


