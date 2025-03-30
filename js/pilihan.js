document.addEventListener('DOMContentLoaded', function() {
    const rejectBtn = document.querySelector('.choice-btn.reject');
    const acceptBtn = document.querySelector('.choice-btn.accept');
    const container = document.querySelector('.content-container');
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile behavior
        rejectBtn.addEventListener('touchstart', moveButton);
    } else {
        // Desktop behavior
        rejectBtn.addEventListener('mouseover', moveButton);
    }

    function moveButton() {
        const maxX = container.clientWidth - rejectBtn.clientWidth;
        const maxY = container.clientHeight - rejectBtn.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        rejectBtn.style.position = 'absolute';
        rejectBtn.style.left = randomX + 'px';
        rejectBtn.style.top = randomY + 'px';
    }

    // Accept button behavior remains normal
    acceptBtn.addEventListener('click', function() {
        window.navigateTo('terima-kasih.html');
    });
});