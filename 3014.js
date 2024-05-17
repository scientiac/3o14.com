const emojis = ['ℼ','π','𝛑','𝜋','𝝅','𝝿'];
const sizes = [8, 10, 12, 16, 20];

function createEmoji(eventX, eventY) {
    const emojiElement = document.createElement('div');
    emojiElement.classList.add('emoji');
    const sizeIndex = Math.floor(Math.random() * sizes.length);
    emojiElement.style.fontSize = `${sizes[sizeIndex]}px`;
    emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(emojiElement);

    // Convert page coordinates to viewport coordinates for fixed positioning
    const posX = eventX - window.pageXOffset;
    const posY = eventY - window.pageYOffset;
    emojiElement.style.left = `${posX}px`;
    emojiElement.style.top = `${posY}px`;

    let directionX = (Math.random() - 0.5) * 2;
    let directionY = (Math.random() - 0.5) * 2;

    function moveEmoji() {
        if (!isTabActive) return;
	emojiElement.style.left = `${parseFloat(emojiElement.style.left) + directionX}px`;
	emojiElement.style.top = `${parseFloat(emojiElement.style.top) + directionY}px`;

	// Gradually decrease speed and fade out
	directionX *= 0.99;
	directionY *= 0.99;
	if (Math.abs(directionX) + Math.abs(directionY) < 0.5) {
	    emojiElement.style.opacity = 0;
	    setTimeout(() => document.body.removeChild(emojiElement), 3000);
	} else {
	    requestAnimationFrame(moveEmoji);
	}
    }

    moveEmoji();
}

function handleEvent(event) {
    let eventX, eventY;
    if (event.type.startsWith('touch')) {
	// Prevent the window from being scrolled
	event.preventDefault();
	eventX = event.touches[0].clientX;
	eventY = event.touches[0].clientY;
    } else {
	eventX = event.clientX;
	eventY = event.clientY;
    }
    createEmoji(eventX, eventY);
}

// Randomly spawn emojis to keep the site feeling fresh
let isTabActive = true;

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        isTabActive = false;
    } else {
        isTabActive = true;
	cleanUpEmojis();
	randomSpawnEmoji()
    }
});

function cleanUpEmojis() {
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        emoji.style.opacity = '0'; // Fade out the emoji
        // Once the fade-out transition is complete, remove the emoji from the DOM
        emoji.addEventListener('transitionend', () => {
            emoji.parentNode.removeChild(emoji);
        });
    });
}

function randomSpawnEmoji() {
    if (!isTabActive) return; // Do not spawn emojis if the tab is not active

    const eventX = Math.random() * window.innerWidth;
    const eventY = Math.random() * window.innerHeight;

    for (let i = 0; i < 5; i++) {
	createEmoji(eventX, eventY);
    }

    setTimeout(randomSpawnEmoji, Math.random() * 3500);
}

randomSpawnEmoji();

// Use `mousemove` for desktop
document.addEventListener('mousemove', handleEvent);
// Use `touchmove` for continuous touch events on mobile
document.addEventListener('touchmove', handleEvent, { passive: false });
