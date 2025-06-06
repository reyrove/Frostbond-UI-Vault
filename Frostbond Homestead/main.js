document.addEventListener('DOMContentLoaded', () => {
    const createStar = () => {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize left position to anywhere across the viewport width
        star.style.left = Math.random() * 100 + 'vw';

        // Randomize initial top position to start falling from random heights
        star.style.top = Math.random() * -100 + 'px'; // Starts above the viewport

        // Randomize the duration of the falling animation for each star
        star.style.animationDuration = Math.random() * 5 + 5 + 's'; // Between 5-10 seconds

        // Randomize the delay before the animation starts to make falling staggered
        star.style.animationDelay = Math.random() * 5 + 's'; // Random delay between 0-5 seconds

        // Set opacity to make some stars more faint
        star.style.opacity = Math.random() * 0.8 + 0.2; // Between 0.2-1 opacity

        document.body.appendChild(star);

        // Remove star after the animation is complete to prevent memory leaks
        setTimeout(() => {
            star.remove();
        }, 15000); // Slightly longer than the max animation duration to ensure removal
    }

    setInterval(createStar, 200); // Every 200ms a new star is created
});