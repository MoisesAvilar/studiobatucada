// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
        // Dark Mode Toggle
    function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.setAttribute('aria-label', 'Alternar modo escuro');
    document.body.appendChild(darkModeToggle);

    // Check for saved user preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled' || savedMode === null) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Update button icon
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
        
        // Save user preference
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    });
    }

    // Chame a função de inicialização
    initDarkMode();
    // Inicialização de todas as funcionalidades
    initFAQ();
    initForms();
    initSmoothScrolling();
    initAnimations();
    initScrollEffect(); // Nova função para o efeito de scroll
    
    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll(".faq-item");
        
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            
            question.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });
                
                // Toggle do item atual
                item.classList.toggle("active", !isActive);
            });
        });
    }
    
    // Validação e envio de formulários
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
        
        // Validação básica
        if (!validateForm(form)) {
            showMessage("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }
        
        // Estado de loading
        const originalText = button.textContent;
        button.textContent = "Enviando...";
        button.disabled = true;
        form.classList.add("loading");
        
        // Simula envio (aqui você integraria com seu backend)
        setTimeout(() => {
            // Reset do formulário
            form.reset();
            
            // Reset do botão
            button.textContent = originalText;
            button.disabled = false;
            form.classList.remove("loading");
            
            // Mensagem de sucesso
            showMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success");
            
            // Analytics/tracking (opcional)
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
            
            // Validação específica para email
            if (field.type === "email" && field.value.trim()) {
                const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.classList.add("error");
                    isValid = false;
                }
            }
            
            // Validação específica para telefone
            if (field.type === "tel" && field.value.trim()) {
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!phoneRegex.test(field.value)) {
                    // Auto-formatação do telefone
                    field.value = formatPhone(field.value);
                }
            }
        });
        
        return isValid;
    }
    
    function formatPhone(phone) {
        // Remove tudo que não é número
        const numbers = phone.replace(/\D/g, "");
        
        // Formata para (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        if (numbers.length === 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (numbers.length === 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        
        return phone;
    }
    
    function showMessage(message, type) {
        // Remove mensagens existentes
        const existingMessages = document.querySelectorAll(".form-message");
        existingMessages.forEach(msg => msg.remove());
        
        // Cria nova mensagem
        const messageDiv = document.createElement("div");
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Estilos da mensagem
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
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            messageDiv.style.animation = "slideOutRight 0.3s ease-out";
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // Smooth scrolling para links internos
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
    
    // Animações on scroll
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
        
        // Observa elementos que devem ser animados
        const animatedElements = document.querySelectorAll(".service-item, .testimonial-item, .faq-item, .section-title");
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Menu mobile (se necessário)
    function initMobileMenu() {
        // Adiciona funcionalidade de menu mobile se houver navegação
        const mobileMenuButton = document.querySelector(".mobile-menu-button");
        const mobileMenu = document.querySelector(".mobile-menu");
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener("click", () => {
                mobileMenu.classList.toggle("active");
                mobileMenuButton.classList.toggle("active");
            });
        }
    }
    
    // Formatação automática de campos
    function initFieldFormatting() {
        // Formatação de telefone em tempo real
        const phoneFields = document.querySelectorAll("input[type=\"tel\"]");
        phoneFields.forEach(field => {
            field.addEventListener("input", (e) => {
                e.target.value = formatPhone(e.target.value);
            });
        });
        
        // Formatação de nome (primeira letra maiúscula)
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
    
    // Tracking de eventos (opcional - para analytics)
    function trackFormSubmission(formId) {
        // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
        console.log(`Form submitted: ${formId}`);
        
        // Exemplo para Google Analytics (se estiver configurado)
        if (typeof gtag !== "undefined") {
            gtag("event", "form_submit", {
                "form_id": formId,
                "event_category": "engagement"
            });
        }
    }
    
    // Scroll suave para botões CTA
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
                    
                    // Foca no primeiro campo do formulário
                    setTimeout(() => {
                        const firstInput = heroForm.querySelector("input");
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            });
        }
    });
    
    // Efeito parallax sutil no hero
    function initParallax() {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector(".hero");
            
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Inicializa formatação de campos
    initFieldFormatting();
    
    // Inicializa parallax (opcional)
    // initParallax();
    
    // Adiciona estilos CSS para animações via JavaScript
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
    
    // Log de inicialização
    console.log("Landing page initialized successfully!");

    // Função para o efeito de scroll da logo
    function initScrollEffect() {
        const header = document.getElementById("mainHeader");
        const logo = header.querySelector(".logo");
        const logoImg = header.querySelector(".logo-img");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) { // Ajuste este valor conforme a necessidade
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


