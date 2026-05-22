// Application State
const appState = {
    currentDifficulty: 'beginner',
    currentCards: [],
    currentCardIndex: 0,
    learnedCards: [],
    currentStreak: 0,
    isFlipped: false,
    sessionStarted: false
};

// DOM Elements
const difficultySection = document.getElementById('difficultySection');
const cardSection = document.getElementById('cardSection');
const flashcard = document.getElementById('flashcard');
const charDisplay = document.getElementById('charDisplay');
const morseDisplay = document.getElementById('morseDisplay');
const dotDashDisplay = document.getElementById('dotDashDisplay');
const cardBack = document.getElementById('cardBack');
const remainingDisplay = document.getElementById('remaining');
const learnedDisplay = document.getElementById('learned');
const streakDisplay = document.getElementById('streak');
const progressDisplay = document.getElementById('progress');
const completeMsg = document.getElementById('completeMsg');

// Event Listeners for Difficulty Selection
document.querySelectorAll('input[name="difficulty"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        appState.currentDifficulty = e.target.value;
    });
});

document.getElementById('startBtn').addEventListener('click', startLearning);
document.getElementById('skipBtn').addEventListener('click', skipCard);
document.getElementById('learnedBtn').addEventListener('click', markLearned);
document.getElementById('playAudioBtn').addEventListener('click', playAudio);
document.getElementById('restartBtn').addEventListener('click', restartSession);
document.getElementById('backBtn').addEventListener('click', backToMenu);

// Flashcard click to flip
flashcard.addEventListener('click', flipCard);

// Initialize
function startLearning() {
    appState.sessionStarted = true;
    appState.learnedCards = [];
    appState.currentCardIndex = 0;
    appState.currentStreak = 0;
    appState.currentCards = [...getMorseItems(appState.currentDifficulty)];
    
    // Shuffle cards
    appState.currentCards.sort(() => Math.random() - 0.5);
    
    // Show card section and hide difficulty section
    difficultySection.style.display = 'none';
    cardSection.style.display = 'block';
    completeMsg.style.display = 'none';
    
    // Display first card
    displayCard();
}

function displayCard() {
    if (appState.currentCardIndex >= appState.currentCards.length) {
        showCompletion();
        return;
    }
    
    const card = appState.currentCards[appState.currentCardIndex];
    
    // Reset flip state
    appState.isFlipped = false;
    flashcard.classList.remove('flipped');
    cardBack.style.display = 'none';
    
    // Update front of card
    charDisplay.textContent = card.char;
    
    // Prepare back of card
    morseDisplay.textContent = card.morse;
    dotDashDisplay.textContent = morseToVisual(card.morse);
    
    // Update statistics
    updateStatistics();
}

function flipCard() {
    appState.isFlipped = !appState.isFlipped;
    flashcard.classList.toggle('flipped');
    
    if (appState.isFlipped) {
        cardBack.style.display = 'flex';
    } else {
        cardBack.style.display = 'none';
    }
}

function skipCard() {
    appState.currentCardIndex++;
    displayCard();
}

function markLearned() {
    const card = appState.currentCards[appState.currentCardIndex];
    appState.learnedCards.push(card.char);
    appState.currentStreak++;
    
    appState.currentCardIndex++;
    displayCard();
}

function playAudio() {
    const card = appState.currentCards[appState.currentCardIndex];
    morseAudio.playMorse(card.morse);
}

function updateStatistics() {
    const remaining = appState.currentCards.length - appState.currentCardIndex - appState.learnedCards.length;
    const learned = appState.learnedCards.length;
    const total = appState.currentCards.length;
    const progress = total > 0 ? Math.round((learned / total) * 100) : 0;
    
    remainingDisplay.textContent = Math.max(0, remaining);
    learnedDisplay.textContent = learned;
    streakDisplay.textContent = appState.currentStreak;
    progressDisplay.textContent = progress + '%';
}

function showCompletion() {
    cardSection.style.display = 'none';
    completeMsg.style.display = 'block';
    
    // Update progress to 100%
    progressDisplay.textContent = '100%';
}

function restartSession() {
    startLearning();
}

function backToMenu() {
    appState.sessionStarted = false;
    appState.isFlipped = false;
    flashcard.classList.remove('flipped');
    cardBack.style.display = 'none';
    
    difficultySection.style.display = 'block';
    cardSection.style.display = 'none';
    completeMsg.style.display = 'none';
    
    progressDisplay.textContent = '0%';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (!appState.sessionStarted) return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            flipCard();
            break;
        case 'ArrowRight':
            skipCard();
            break;
        case 'Enter':
            markLearned();
            break;
    }
});
