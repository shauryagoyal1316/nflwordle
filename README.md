# NFL Wordle

A Wordle-style guessing game where you try to guess the mystery NFL player by typing their name! The game automatically fetches all player information and displays it in a beautiful Wordle-style format.

## Features

- 🎮 **Wordle-style gameplay**: Type a player's name to guess the mystery NFL player
- 🔍 **Smart autocomplete**: Real-time suggestions as you type
- 🧠 **Fuzzy matching**: Handles typos and partial names automatically
- 🔄 **Automatic updates**: Fetches ALL current NFL players from API-Sports NFL API
- 💾 **Smart caching**: Local cache for fast loading and offline play
- 🎨 **Modern UI**: Smooth animations and fluid user experience
- 📊 **Real-time data**: Updates automatically with current season players from all 32 teams
- ♾️ **Unlimited play**: Play as many games as you want!

## How to Play

1. Click "New Game" to start
2. Type a player's name in the input field (e.g., "Patrick Mahomes" or "pat mah")
3. Select a player from the autocomplete dropdown or press Enter
4. Click "Submit Guess" to see the Wordle-style comparison
5. The game shows 5 attributes with color-coded feedback:
   - **Conference**: 🟢 Green if correct, ⚫ Gray if incorrect
   - **Division**: 🟢 Green if correct, ⚫ Gray if incorrect
   - **Team**: 🟢 Green if correct, ⚫ Gray if incorrect
   - **Position**: 🟢 Green if correct, ⚫ Gray if incorrect
   - **Jersey Number**: 🟢 Green if exact match, ⬆ Higher if target is higher, ⬇ Lower if target is lower
6. Win by matching all 5 attributes correctly (up to 6 guesses)

### Tips

- The autocomplete helps you find players quickly
- You can type partial names (e.g., "Mahomes" instead of "Patrick Mahomes")
- The system handles typos automatically using fuzzy matching
- Use arrow keys to navigate the autocomplete dropdown

## Technical Details

- **Data Source**: API-Sports NFL API (https://v1.american-football.api-sports.io/)
- **API Key Required**: Get a free API key from https://api-sports.io/ and update `API_KEY` in `nfl-data.js`
- **Update Frequency**: Every 24 hours (configurable)
- **Cache Duration**: 24 hours
- **Browser Support**: Modern browsers with ES6+ support
- **Fetches**: ALL active players from ALL 32 NFL teams

## Setup Instructions

### 1. Get an API Key

1. Visit https://api-sports.io/ and sign up for a free account
2. Get your API key from the dashboard
3. Open `nfl-data.js` and replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'your-actual-api-key-here';
   ```

### 2. Run the Game

#### Option 1: Open Directly in Browser

1. Clone or download this repository
2. Update the API key in `nfl-data.js` (see above)
3. Open `index.html` in your web browser
4. The game will fetch all NFL players on first load

### Option 2: Using a Local Server (Recommended)

For the best experience, especially when fetching data from APIs, use a local web server:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

#### Using Node.js (if installed):
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

#### Using VS Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Deploy to GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Select the `main` branch as the source
4. Your site will be available at `https://shauryagoyal1316.github.io/nflwordle/`

## File Structure

```
nflwordle/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── game.js         # Game logic and player matching
├── nfl-data.js     # Player data fetching and caching
├── README.md       # This file
└── .gitignore      # Git ignore file
```

## License

MIT License - Feel free to use and modify as needed.
