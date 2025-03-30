document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const loadingScreen = document.querySelector('.loading-screen');
    let progress = 0;

    // Loading animation
    const loadingInterval = setInterval(() => {
        progress += 2;
        const loadingText = document.querySelector('.loading-text');
        
        if (progress <= 100) {
            loadingText.textContent = `Loading ${progress}%`;
        } else {
            clearInterval(loadingInterval);
            showContent();
        }
    }, 50);

    function showContent() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            startMusic();
            
            // Redirect after 5 seconds
            setTimeout(() => {
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.navigateTo('pilihan.html');
                }, 1000);
            }, 5000);
        }, 1000);
    }

    function startMusic() {
        music.volume = 0.5;
        music.play().catch(error => {
            console.log("Audio playback failed:", error);
        });
    }

    // Backup music play on user interaction
    document.addEventListener('click', () => {
        if (music.paused) startMusic();
    }, { once: true });
});