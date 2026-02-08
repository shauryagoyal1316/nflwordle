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

// Input fields
const conferenceInput = document.getElementById('conference');
const divisionInput = document.getElementById('division');
const positionInput = document.getElementById('position');
const jerseyNumberInput = document.getElementById('jerseyNumber');
const teamInput = document.getElementById('team');

// Initialize game
function initGame() {
    currentPlayer = getRandomPlayer();
    guesses = [];
    gameWon = false;
    guessesList.innerHTML = '';
    gameStatus.textContent = `Guess the player! (${maxGuesses} guesses remaining)`;
    resetInputs();
    winModal.classList.remove('show');
    submitGuessBtn.disabled = false;
    
    console.log('Current player:', currentPlayer.name); // For debugging
}

// Reset input fields
function resetInputs() {
    conferenceInput.value = '';
    divisionInput.value = '';
    positionInput.value = '';
    jerseyNumberInput.value = '';
    teamInput.value = '';
}

// Validate guess
function validateGuess() {
    if (!conferenceInput.value || !divisionInput.value || !positionInput.value || 
        !jerseyNumberInput.value || !teamInput.value) {
        alert('Please fill in all fields!');
        return false;
    }
    
    const jerseyNum = parseInt(jerseyNumberInput.value);
    if (isNaN(jerseyNum) || jerseyNum < 0 || jerseyNum > 99) {
        alert('Jersey number must be between 0 and 99!');
        return false;
    }
    
    return true;
}

// Check if guess is correct
function checkGuess() {
    const guess = {
        conference: conferenceInput.value,
        division: divisionInput.value,
        position: positionInput.value,
        jersey: parseInt(jerseyNumberInput.value),
        team: teamInput.value
    };
    
    const result = {
        conference: checkConference(guess.conference),
        division: checkDivision(guess.division),
        position: checkPosition(guess.position),
        jersey: checkJersey(guess.jersey),
        team: checkTeam(guess.team)
    };
    
    guesses.push({ guess, result });
    displayGuess(guess, result);
    
    // Check if won
    const allCorrect = Object.values(result).every(r => r === 'correct');
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
    // Check if same conference
    const guessConference = guess.startsWith('AFC') ? 'AFC' : 'NFC';
    if (guessConference === currentPlayer.conference) {
        return 'partial';
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
    // Partial credit if within 5 numbers
    const diff = Math.abs(guess - currentPlayer.jersey);
    if (diff <= 5) {
        return 'partial';
    }
    return 'incorrect';
}

function checkTeam(guess) {
    if (guess === currentPlayer.team) {
        return 'correct';
    }
    // Check if same division
    const teamInfo = TEAM_DIVISIONS[guess];
    if (teamInfo && teamInfo.division === currentPlayer.division) {
        return 'partial';
    }
    return 'incorrect';
}

// Display guess result with smooth animation
function displayGuess(guess, result) {
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';
    
    const fields = [
        { value: guess.conference, result: result.conference },
        { value: guess.division, result: result.division },
        { value: guess.position, result: result.position },
        { value: guess.jersey.toString(), result: result.jersey },
        { value: guess.team, result: result.team }
    ];
    
    // Initially hide cells for animation
    fields.forEach((field, index) => {
        const cell = document.createElement('div');
        cell.className = `guess-cell ${field.result}`;
        cell.textContent = field.value;
        cell.style.opacity = '0';
        guessRow.appendChild(cell);
        
        // Animate each cell with a slight delay
        setTimeout(() => {
            cell.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            cell.style.opacity = '1';
        }, index * 100);
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

// Allow Enter key to submit
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !gameWon) {
        submitGuessBtn.click();
    }
});

// Update division options based on conference selection
conferenceInput.addEventListener('change', () => {
    const conference = conferenceInput.value;
    divisionInput.innerHTML = '<option value="">Select...</option>';
    
    if (conference === 'AFC') {
        divisionInput.innerHTML += `
            <option value="AFC East">AFC East</option>
            <option value="AFC North">AFC North</option>
            <option value="AFC South">AFC South</option>
            <option value="AFC West">AFC West</option>
        `;
    } else if (conference === 'NFC') {
        divisionInput.innerHTML += `
            <option value="NFC East">NFC East</option>
            <option value="NFC North">NFC North</option>
            <option value="NFC South">NFC South</option>
            <option value="NFC West">NFC West</option>
        `;
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

// Update data status display
function updateDataStatus(count, lastUpdate) {
    const dataStatus = document.getElementById('dataStatus');
    if (!dataStatus) return;
    
    if (count > 0) {
        const updateText = lastUpdate 
            ? `Updated ${formatTimeAgo(lastUpdate)}`
            : 'Using cached data';
        dataStatus.textContent = `${count} players • ${updateText}`;
        dataStatus.style.display = 'block';
    } else {
        dataStatus.style.display = 'none';
    }
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
    // Wait for player data to be ready
    await initializePlayerData();
    
    // Small delay to ensure data is loaded
    setTimeout(() => {
        initGame();
        const timestamp = localStorage.getItem('nfl_players_cache_timestamp');
        const lastUpdate = timestamp ? parseInt(timestamp) : null;
        updateDataStatus(NFL_PLAYERS.length, lastUpdate);
        gameStatus.textContent = `Ready to play!`;
    }, 100);
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
