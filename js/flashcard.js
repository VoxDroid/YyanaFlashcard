const flashcardContainer = document.getElementById('flashcard-container');
const flashcard = document.getElementById('flashcard');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const hintEl = document.getElementById('hint');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const modeSelect = document.getElementById('mode-select');
const progressBar = document.getElementById('progress');
const squareRootTable = document.getElementById('square-root-table');
const cubeRootTable = document.getElementById('cube-root-table');
const squareTable = document.getElementById('square-table');
const cubeTable = document.getElementById('cube-table');

const numbers = Array.from({length: 25}, (_, i) => i + 1);
let currentIndex = 0;
let currentNumber;
let currentMode = 'square';

function showCard(index) {
    currentNumber = numbers[index];
    
    flashcard.classList.add('changing');
    setTimeout(() => {
        switch (currentMode) {
            case 'square':
                const squareResult = currentNumber * currentNumber;
                questionEl.textContent = `What is the square root of ${squareResult}?`;
                answerEl.textContent = currentNumber;
                hintEl.textContent = `Hint: Think of a number that, when multiplied by itself, gives ${squareResult}`;
                break;
            case 'cube':
                const cubeResult = currentNumber * currentNumber * currentNumber;
                questionEl.textContent = `What is the cube root of ${cubeResult}?`;
                answerEl.textContent = currentNumber;
                hintEl.textContent = `Hint: What number, when cubed, results in ${cubeResult}?`;
                break;
            case 'square-inverse':
                questionEl.textContent = `What is ${currentNumber} squared?`;
                answerEl.textContent = currentNumber * currentNumber;
                hintEl.textContent = `Hint: Multiply ${currentNumber} by itself`;
                break;
            case 'cube-inverse':
                questionEl.textContent = `What is ${currentNumber} cubed?`;
                answerEl.textContent = currentNumber * currentNumber * currentNumber;
                hintEl.textContent = `Hint: Multiply ${currentNumber} by itself, then by ${currentNumber} again`;
                break;
        }

        flashcard.classList.remove('flipped');
        flashcard.classList.remove('changing');
        updateProgress();
    }, 300);
}

function updateProgress() {
    const progress = ((currentIndex + 1) / numbers.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function createTables() {
    for (let i = 1; i <= 25; i++) {
        const squareRootItem = document.createElement('div');
        squareRootItem.className = 'table-item';
        squareRootItem.innerHTML = `<span style="font-size: 1.2em;">√</span><span style="font-size: 0.8em;">${i*i}</span> = ${i}`;
        squareRootTable.appendChild(squareRootItem);

        const cubeRootItem = document.createElement('div');
        cubeRootItem.className = 'table-item';
        cubeRootItem.innerHTML = `<span style="font-size: 1.2em;">∛</span><span style="font-size: 0.8em;">${i*i*i}</span> = ${i}`;
        cubeRootTable.appendChild(cubeRootItem);

        const squareItem = document.createElement('div');
        squareItem.className = 'table-item';
        squareItem.innerHTML = `${i}<sup>2</sup> = ${i*i}`;
        squareTable.appendChild(squareItem);

        const cubeItem = document.createElement('div');
        cubeItem.className = 'table-item';
        cubeItem.innerHTML = `${i}<sup>3</sup> = ${i*i*i}`;
        cubeTable.appendChild(cubeItem);
    }
}

flashcard.addEventListener('click', () => {
    if (!flashcard.classList.contains('changing')) {
        flashcard.classList.toggle('flipped');
    }
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + numbers.length) % numbers.length;
    showCard(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % numbers.length;
    showCard(currentIndex);
});

modeSelect.addEventListener('change', (e) => {
    currentMode = e.target.value;
    showCard(currentIndex);
});

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;

flashcardContainer.addEventListener('touchstart', handleDragStart, { passive: true });
flashcardContainer.addEventListener('touchmove', handleDragMove, { passive: false });
flashcardContainer.addEventListener('touchend', handleDragEnd, { passive: true });

flashcardContainer.addEventListener('mousedown', handleDragStart);
flashcardContainer.addEventListener('mousemove', handleDragMove);
flashcardContainer.addEventListener('mouseup', handleDragEnd);
flashcardContainer.addEventListener('mouseleave', handleDragEnd);

function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentX = startX;
}

function handleDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    flashcard.style.transform = `rotateY(${diff / 5}deg)`;
}

function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            prevBtn.click();
        } else {
            nextBtn.click();
        }
    }
    flashcard.style.transform = '';
}

// Background animation
function createBubbles() {
    const backgroundAnimation = document.getElementById('background-animation');
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 50 + 20}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        backgroundAnimation.appendChild(bubble);
    }
}

createTables();
createBubbles();
showCard(currentIndex);