// Reasons database
const reasons = [
    { 
        text: "You're such a kind and wonderful person, and I feel truly lucky to share such a special bond with you. 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Wishing you a day filled with love, laughter, and endless joy. 🌸", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Wishing you all the success, happiness, and everything your heart desires most. ✨", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Keep being the amazing girl you are, always spreading positivity around you. Wishing you the happiest year ahead! 🥳", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with separated emoji and text
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    // الإيموجي العلوي منفصل
    const topEmoji = document.createElement('div');
    topEmoji.className = 'reason-top-emoji';
    topEmoji.textContent = reason.emoji;

    // النص بدون الإيموجي اللي في نهايته
    const text = document.createElement('div');
    text.className = 'reason-text';
    const cleanText = reason.text.replace(/\p{Emoji_Presentation}\s*$/u, '').trim();
    text.textContent = cleanText;

    // الإيموجي اللي كان في نهاية الجملة — منفصل
    const bottomEmoji = document.createElement('div');
    bottomEmoji.className = 'reason-bottom-emoji';
    const emojiMatch = reason.text.match(/(\p{Emoji_Presentation})\s*$/u);
    bottomEmoji.textContent = emojiMatch ? emojiMatch[1] : '💖';

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

    card.appendChild(topEmoji);
    card.appendChild(text);
    card.appendChild(bottomEmoji);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html';
                            }
                        });
                    });
                }
            });
        }

        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        window.location.href = "#storylane";
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);