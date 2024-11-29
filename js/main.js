// Word categories and their corresponding words
const wordCategories = {
    animals: ['elephant', 'giraffe', 'penguin', 'kangaroo', 'dolphin', 'butterfly', 'octopus'],
    objects: ['umbrella', 'telephone', 'computer', 'glasses', 'backpack', 'camera', 'clock'],
    actions: ['dancing', 'swimming', 'cooking', 'reading', 'jumping', 'singing', 'painting'],
    places: ['beach', 'mountain', 'library', 'restaurant', 'park', 'museum', 'airport']
};

// Difficulty levels and their corresponding word filters
const difficultyLevels = {
    easy: (words) => words.filter(word => word.length <= 6),
    medium: (words) => words.filter(word => word.length > 6 && word.length <= 8),
    hard: (words) => words.filter(word => word.length > 8)
};

// Function to get a random word from a specific category and difficulty
function getRandomWord(category = 'all', difficulty = 'medium') {
    let wordPool = [];
    
    // If category is 'all', combine all categories
    if (category === 'all') {
        wordPool = Object.values(wordCategories).flat();
    } else {
        wordPool = wordCategories[category] || [];
    }

    // Apply difficulty filter if specified
    if (difficulty in difficultyLevels) {
        wordPool = difficultyLevels[difficulty](wordPool);
    }

    // Return a random word from the pool
    return wordPool[Math.floor(Math.random() * wordPool.length)];
}

// Function to update the displayed word
function updateDisplayedWord() {
    const wordDisplay = document.querySelector('#word-display');
    const categoryDisplay = document.querySelector('#category-display');
    
    if (wordDisplay && categoryDisplay) {
        const selectedCategory = document.querySelector('#category-select')?.value || 'all';
        const selectedDifficulty = document.querySelector('#difficulty-select')?.value || 'medium';
        
        const newWord = getRandomWord(selectedCategory, selectedDifficulty);
        wordDisplay.textContent = newWord?.toUpperCase() || 'NO WORD AVAILABLE';
        categoryDisplay.textContent = `Category: ${selectedCategory}`;
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for category and difficulty selects
    const categorySelect = document.querySelector('#category-select');
    const difficultySelect = document.querySelector('#difficulty-select');
    const generateButton = document.querySelector('#generate-button');

    if (generateButton) {
        generateButton.addEventListener('click', updateDisplayedWord);
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', updateDisplayedWord);
    }

    if (difficultySelect) {
        difficultySelect.addEventListener('change', updateDisplayedWord);
    }

    // Initial word generation
    updateDisplayedWord();
});
