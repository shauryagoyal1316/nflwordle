// Game state
let currentPlayer = null;
let guesses = [];
let gameWon = false;
let maxGuesses = 6;

// DOM elements
const newGameBtn = document.getElementById('newGameBtn');
const submitGuessBtn = document.getElementById('submitGuess');
const gameStatus = document.getElementById('gameStatus');
const guessesList = document.getElementById('guessesList');
const winModal = document.getElementById('winModal');
const playAgainBtn = document.getElementById('playAgainBtn');
const winMessage = document.getElementById('winMessage');
const playerNameInput = document.getElementById('playerName');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');
const playerMatchInfo = document.getElementById('playerMatchInfo');

// Autocomplete state
let autocompleteItems = [];
let selectedIndex = -1;
let matchedPlayer = null;

// Fuzzy matching algorithm (Levenshtein distance)
function levenshteinDistance(str1, str2) {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

    if (len1 === 0) return len2;
    if (len2 === 0) return len1;

    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[len1][len2];
}

// Find best matching player with improved accuracy
function findPlayerByName(input) {
    if (!input || input.trim().length < 2) {
        return null;
    }

    const normalizedInput = input.toLowerCase().trim().replace(/[.,'"]/g, '');
    let bestMatch = null;
    let bestScore = Infinity;
    const matches = [];

    // First try exact match (case insensitive)
    for (const player of NFL_PLAYERS) {
        const playerName = player.name.toLowerCase().replace(/[.,'"]/g, '');
        if (playerName === normalizedInput) {
            return player;
        }
    }

    // Try partial matches - check if input matches first/last name or is contained
    for (const player of NFL_PLAYERS) {
        const playerName = player.name.toLowerCase().replace(/[.,'"]/g, '');
        const nameParts = playerName.split(' ');
        const inputParts = normalizedInput.split(' ');
        
        // Check if all input parts match player name parts
        let allPartsMatch = true;
        if (inputParts.length > 1) {
            for (const part of inputParts) {
                if (part.length < 2) continue;
                if (!nameParts.some(np => np.startsWith(part) || np.includes(part))) {
                    allPartsMatch = false;
                    break;
                }
            }
        }
        
        // Check if input is contained in player name or vice versa
        const isContained = playerName.includes(normalizedInput) || normalizedInput.includes(playerName);
        const startsWith = nameParts.some(part => part.startsWith(normalizedInput)) || 
                          nameParts.some(part => normalizedInput.startsWith(part));
        
        if (allPartsMatch || isContained || startsWith) {
            const distance = levenshteinDistance(normalizedInput, playerName);
            matches.push({ player, distance, type: 'partial' });
            if (distance < bestScore) {
                bestScore = distance;
                bestMatch = player;
            }
        }
    }

    // If no good partial match, try fuzzy matching with stricter threshold
    if (!bestMatch || bestScore > 3) {
        for (const player of NFL_PLAYERS) {
            const playerName = player.name.toLowerCase().replace(/[.,'"]/g, '');
            const distance = levenshteinDistance(normalizedInput, playerName);
            const maxLen = Math.max(normalizedInput.length, playerName.length);
            const similarity = 1 - (distance / maxLen);
            
            // Stricter threshold: 80% similarity and max 3 character difference for short names
            const threshold = normalizedInput.length < 5 ? 0.8 : 0.75;
            if (similarity >= threshold && distance <= 3 && distance < bestScore) {
                bestScore = distance;
                bestMatch = player;
            }
        }
    }

    return bestMatch;
}

// Get autocomplete suggestions
function getAutocompleteSuggestions(input) {
    if (!input || input.trim().length < 2) {
        return [];
    }

    const normalizedInput = input.toLowerCase().trim();
    const suggestions = [];

    for (const player of NFL_PLAYERS) {
        const playerName = player.name.toLowerCase();
        
        if (playerName.includes(normalizedInput) || 
            playerName.split(' ').some(part => part.startsWith(normalizedInput))) {
            const distance = levenshteinDistance(normalizedInput, playerName);
            suggestions.push({ player, distance });
        }
    }

    // Sort by distance and limit to 8 results
    return suggestions
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8)
        .map(item => item.player);
}

// Display autocomplete dropdown
function showAutocomplete(suggestions) {
    autocompleteDropdown.innerHTML = '';
    autocompleteItems = suggestions;
    selectedIndex = -1;

    if (suggestions.length === 0) {
        autocompleteDropdown.classList.remove('show');
        return;
    }

    suggestions.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.innerHTML = `
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-details">${player.position} • ${player.team} • #${player.jersey}</div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            selectPlayer(player);
        });

        item.addEventListener('mouseenter', () => {
            selectedIndex = index;
            updateAutocompleteSelection();
        });

        autocompleteDropdown.appendChild(item);
    });

    autocompleteDropdown.classList.add('show');
}

// Update autocomplete selection
function updateAutocompleteSelection() {
    const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Select a player from autocomplete
function selectPlayer(player) {
    playerNameInput.value = player.name;
    matchedPlayer = player;
    autocompleteDropdown.classList.remove('show');
    showPlayerMatchInfo(player);
    submitGuessBtn.disabled = false;
}

// Show player match info
function showPlayerMatchInfo(player) {
    playerMatchInfo.innerHTML = `
        <strong class="matched-name">${player.name}</strong> - ${player.position} • ${player.team} • #${player.jersey}
    `;
    playerMatchInfo.classList.add('show');
}

// Hide player match info
function hidePlayerMatchInfo() {
    playerMatchInfo.classList.remove('show');
    matchedPlayer = null;
}

// Initialize game
function initGame() {
    currentPlayer = getRandomPlayer();
    guesses = [];
    gameWon = false;
    guessesList.innerHTML = '';
    gameStatus.textContent = `Guess the player! (${maxGuesses} guesses remaining)`;
    resetInputs();
    winModal.classList.remove('show');
    submitGuessBtn.disabled = true;
    
    console.log('Current player:', currentPlayer.name); // For debugging
}

// Reset input fields
function resetInputs() {
    playerNameInput.value = '';
    autocompleteDropdown.classList.remove('show');
    hidePlayerMatchInfo();
    matchedPlayer = null;
}

// Validate guess
function validateGuess() {
    const input = playerNameInput.value.trim();
    
    if (!input) {
        alert('Please enter a player name!');
        return false;
    }

    // Try to find the player
    if (!matchedPlayer) {
        const found = findPlayerByName(input);
        if (found) {
            matchedPlayer = found;
            playerNameInput.value = found.name;
            showPlayerMatchInfo(found);
        } else {
            alert(`Player "${input}" not found. Please check the spelling or try a different player.`);
            return false;
        }
    }

    // Check if already guessed
    if (guesses.some(g => g.player.name === matchedPlayer.name)) {
        alert('You already guessed this player!');
        return false;
    }

    return true;
}

// Check if guess is correct
function checkGuess() {
    if (!matchedPlayer) {
        if (!validateGuess()) return;
    }

    const guessedPlayer = matchedPlayer;
    
    const result = {
        conference: checkConference(guessedPlayer.conference),
        division: checkDivision(guessedPlayer.division),
        team: checkTeam(guessedPlayer.team),
        position: checkPosition(guessedPlayer.position),
        jersey: checkJersey(guessedPlayer.jersey)
    };
    
    guesses.push({ player: guessedPlayer, result });
    displayGuess(guessedPlayer, result);
    
    // Check if won - all attributes must match
    const allCorrect = result.conference === 'correct' && 
                       result.division === 'correct' && 
                       result.team === 'correct' && 
                       result.position === 'correct' && 
                       result.jersey === 'correct';
    
    if (allCorrect) {
        gameWon = true;
        endGame(true);
    } else if (guesses.length >= maxGuesses) {
        endGame(false);
    } else {
        gameStatus.textContent = `Keep guessing! (${maxGuesses - guesses.length} guesses remaining)`;
    }
    
    resetInputs();
}

// Check individual fields
function checkConference(guess) {
    if (guess === currentPlayer.conference) {
        return 'correct';
    }
    return 'incorrect';
}

function checkDivision(guess) {
    if (guess === currentPlayer.division) {
        return 'correct';
    }
    return 'incorrect';
}

function checkPosition(guess) {
    if (guess === currentPlayer.position) {
        return 'correct';
    }
    return 'incorrect';
}

function checkJersey(guess) {
    if (guess === currentPlayer.jersey) {
        return 'correct';
    }
    if (guess < currentPlayer.jersey) {
        return 'higher'; // Guessed number is lower, target is higher
    }
    if (guess > currentPlayer.jersey) {
        return 'lower'; // Guessed number is higher, target is lower
    }
    return 'incorrect';
}

function checkTeam(guess) {
    if (guess === currentPlayer.team) {
        return 'correct';
    }
    return 'incorrect';
}

// Display guess result with Wordle-style tile flip
function displayGuess(player, result) {
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';
    
    // Format jersey number with arrow indicators
    let jerseyDisplay = `#${player.jersey}`;
    if (result.jersey === 'higher') {
        jerseyDisplay = `#${player.jersey} ⬆`;
    } else if (result.jersey === 'lower') {
        jerseyDisplay = `#${player.jersey} ⬇`;
    }
    
    const fields = [
        { label: 'Conference', value: player.conference, result: result.conference },
        { label: 'Division', value: player.division, result: result.division },
        { label: 'Team', value: player.team, result: result.team },
        { label: 'Position', value: player.position, result: result.position },
        { label: 'Jersey', value: jerseyDisplay, result: result.jersey }
    ];
    
    // Create cells with Wordle-style flip animation
    fields.forEach((field, index) => {
        const cell = document.createElement('div');
        cell.className = `guess-cell tile`;
        cell.setAttribute('data-result', field.result);
        cell.innerHTML = `
            <div class="tile-front">
                <div class="cell-label">${field.label}</div>
                <div class="cell-value">${field.value}</div>
            </div>
            <div class="tile-back ${field.result}">
                <div class="cell-label">${field.label}</div>
                <div class="cell-value">${field.value}</div>
            </div>
        `;
        guessRow.appendChild(cell);
        
        // Trigger flip animation with delay (Wordle-style)
        setTimeout(() => {
            cell.classList.add('flip');
        }, index * 150);
    });
    
    guessesList.appendChild(guessRow);
    
    // Scroll to show new guess
    setTimeout(() => {
        guessRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// End game
function endGame(won) {
    submitGuessBtn.disabled = true;
    
    if (won) {
        gameStatus.textContent = `🎉 You got it! The player was ${currentPlayer.name}!`;
        winMessage.textContent = `Congratulations! You guessed ${currentPlayer.name} in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!`;
        winModal.classList.add('show');
    } else {
        gameStatus.textContent = `Game Over! The player was ${currentPlayer.name}.`;
        setTimeout(() => {
            alert(`Game Over! The player was ${currentPlayer.name} (${currentPlayer.position}, #${currentPlayer.jersey}, ${currentPlayer.team}).`);
        }, 500);
    }
}

// Event listeners
newGameBtn.addEventListener('click', () => {
    initGame();
});

playAgainBtn.addEventListener('click', () => {
    initGame();
});

submitGuessBtn.addEventListener('click', () => {
    if (gameWon) return;
    
    if (validateGuess()) {
        checkGuess();
    }
});

// Player name input event listeners
playerNameInput.addEventListener('input', (e) => {
    const input = e.target.value.trim();
    submitGuessBtn.disabled = true;
    hidePlayerMatchInfo();
    
    if (input.length >= 2) {
        const suggestions = getAutocompleteSuggestions(input);
        showAutocomplete(suggestions);
        
        // Try to find exact match
        const found = findPlayerByName(input);
        if (found && found.name.toLowerCase() === input.toLowerCase()) {
            matchedPlayer = found;
            showPlayerMatchInfo(found);
            submitGuessBtn.disabled = false;
            autocompleteDropdown.classList.remove('show');
        }
    } else {
        autocompleteDropdown.classList.remove('show');
    }
});

playerNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (autocompleteItems.length > 0) {
            selectedIndex = Math.min(selectedIndex + 1, autocompleteItems.length - 1);
            updateAutocompleteSelection();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, -1);
        updateAutocompleteSelection();
    } else if (e.key === 'Enter' && selectedIndex >= 0 && autocompleteItems[selectedIndex]) {
        e.preventDefault();
        selectPlayer(autocompleteItems[selectedIndex]);
    } else if (e.key === 'Enter' && !gameWon) {
        submitGuessBtn.click();
    } else if (e.key === 'Escape') {
        autocompleteDropdown.classList.remove('show');
    }
});

// Close autocomplete when clicking outside
document.addEventListener('click', (e) => {
    if (!playerNameInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
        autocompleteDropdown.classList.remove('show');
    }
});

// Loading indicator functions
function showLoadingIndicator() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
        indicator.style.display = 'flex';
    }
}

function hideLoadingIndicator() {
    const indicator = document.getElementById('loadingIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

// Update data status display (removed per requirements)
function updateDataStatus(count, lastUpdate) {
    // Status display removed per requirements
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

// Initialize on page load
async function initialize() {
    gameStatus.textContent = 'Loading players...';
    
    // Wait for player data to be ready
    await initializePlayerData();
    
    // Wait a moment for data to populate
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Ensure we have players before starting
    if (!NFL_PLAYERS || NFL_PLAYERS.length === 0) {
        console.error('No players loaded!');
        gameStatus.textContent = 'Error: No player data available. Please refresh the page.';
        return;
    }
    
    // Initialize game with available players
    initGame();
    gameStatus.textContent = `Ready to play! (${NFL_PLAYERS.length} players available)`;
}

// Override new game to refresh data occasionally
let gameCount = 0;
const originalInitGame = initGame;
initGame = function() {
    gameCount++;
    // Refresh data every 5 games
    if (gameCount % 5 === 0) {
        updatePlayerData(false);
    }
    originalInitGame();
};

// Start initialization
initialize();
