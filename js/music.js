function handleMusic() {
    const music = document.querySelector('#bgMusic');
    if (music) {
        music.volume = 0.5;
        
        // Restore music position
        const musicTime = localStorage.getItem('musicTime');
        if (musicTime) {
            music.currentTime = parseFloat(musicTime);
        }
        
        // Auto play music
        music.play().catch(error => {
            // Fallback for browsers that require user interaction
            document.addEventListener('click', () => {
                if (music.paused) {
                    music.play();
                }
            }, { once: true });
        });
        
        // Save music position periodically
        setInterval(() => {
            localStorage.setItem('musicTime', music.currentTime);
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', handleMusic);