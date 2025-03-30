document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const content = document.getElementById('content');
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-text');
    let progress = 0;
    
    function startMusic() {
        music.volume = 0.5;
        music.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    const loadingInterval = setInterval(() => {
        progress += 2;
        if (progress <= 100) {
            loadingText.textContent = `Loading... ${progress}%`;
        } else {
            clearInterval(loadingInterval);
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadContent();
            }, 800);
        }
    }, 50);

    async function loadContent() {
        try {
            const response = await fetch('content.html');
            const html = await response.text();
            content.innerHTML = html;
            content.style.opacity = '1';
            if (music.paused) startMusic();
            
            setTimeout(() => {
                content.style.opacity = '0';
                setTimeout(() => {
                    window.navigateTo('pilihan.html');
                }, 1000);
            }, 5000);
            
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    window.navigateTo = function(page) {
        content.style.opacity = 0;
        setTimeout(() => {
            loadPage(page);
            setTimeout(() => {
                content.style.opacity = 1;
            }, 100);
        }, 500);
    };

    function initializePilihanPage() {
        const rejectBtn = document.querySelector('.choice-btn.reject');
        const acceptBtn = document.querySelector('.choice-btn.accept');
        const card = document.querySelector('.card');
        let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        function moveDesktopButton(e) {
            const cardBounds = card.getBoundingClientRect();
            const buttonWidth = rejectBtn.offsetWidth;
            const buttonHeight = rejectBtn.offsetHeight;
            
            const safeArea = {
                minX: cardBounds.left + 20,
                maxX: cardBounds.right - buttonWidth - 20,
                minY: cardBounds.top + 20,
                maxY: cardBounds.bottom - buttonHeight - 20
            };
            
            const randomX = Math.floor(Math.random() * (safeArea.maxX - safeArea.minX)) + safeArea.minX;
            const randomY = Math.floor(Math.random() * (safeArea.maxY - safeArea.minY)) + safeArea.minY;

            rejectBtn.style.position = 'fixed';
            rejectBtn.style.zIndex = '1000';
            rejectBtn.style.transition = 'all 0.2s ease';
            rejectBtn.style.left = `${randomX}px`;
            rejectBtn.style.top = `${randomY}px`;
        }

        function handleMobileButton(e) {
            e.preventDefault();
            const directions = ['translateX(100px)', 'translateX(-100px)', 'translateY(50px)', 'translateY(-50px)'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            
            rejectBtn.style.transition = 'transform 0.3s ease';
            rejectBtn.style.transform = randomDirection;
            
            setTimeout(() => {
                rejectBtn.style.transform = 'translate(0, 0)';
            }, 300);
        }

        if (!isMobile) {
            rejectBtn.addEventListener('mouseover', moveDesktopButton);
        } else {
            rejectBtn.removeAttribute('style');
            rejectBtn.addEventListener('touchstart', handleMobileButton, { passive: false });
            rejectBtn.addEventListener('click', handleMobileButton);
        }

        acceptBtn.addEventListener('click', function() {
            card.style.transform = 'scale(0.95)';
            card.style.opacity = '0';
            setTimeout(() => {
                window.location.href = 'terima-kasih.html';
            }, 500);
        });
    }

    // Add initialization for terima-kasih page
    function initializeTerimaKasihPage() {
        const nextBtn = document.querySelector('.next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const card = document.querySelector('.card');
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0';
                setTimeout(() => {
                    window.navigateTo('thr.html');
                }, 500);
            });
        }
    }

    async function loadPage(page) {
        try {
            const response = await fetch(page);
            const html = await response.text();
            content.innerHTML = html;
            if (music.paused) startMusic();
            
            if (page === 'pilihan.html') {
                initializePilihanPage();
            } else if (page === 'terima-kasih.html') {
                initializeTerimaKasihPage();
            } else if (page === 'thr.html') {
                initializeTHRPage();
            }
        } catch (error) {
            console.error('Error loading page:', error);
        }
    }

    function initializeTHRPage() {
        function copyNumber(number) {
            navigator.clipboard.writeText(number);
            const btn = event.target;
            btn.textContent = 'Tersalin! ✅';
            
            // Add confetti effect
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            
            setTimeout(() => {
                const isBSI = number.length > 9;
                btn.textContent = isBSI ? 'Salin Nomor BSI 🏦' : 'Salin Nomor DANA 📱';
            }, 2000);
        }

        // Add event listeners for copy buttons
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const number = this.getAttribute('data-number');
                copyNumber(number);
            });
        });
    }

    document.addEventListener('click', () => {
        if (music.paused) startMusic();
    }, { once: true });
});