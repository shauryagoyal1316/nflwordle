# NFL Wordle

A Wordle-style guessing game where you try to guess the mystery NFL player by their conference, division, position, jersey number, and team!

## Features

- 🎮 **Wordle-style gameplay**: Guess 5 attributes to identify the mystery NFL player
- 🔄 **Automatic updates**: Fetches current NFL rosters from ESPN API
- 💾 **Smart caching**: Local cache for fast loading and offline play
- 🎨 **Modern UI**: Smooth animations and fluid user experience
- 📊 **Real-time data**: Updates automatically with current 2026+ season players
- ♾️ **Unlimited play**: Play as many games as you want!

## How to Play

1. Click "New Game" to start
2. Fill in all 5 fields:
   - **Conference**: AFC or NFC
   - **Division**: One of the 8 NFL divisions
   - **Position**: Player position (QB, RB, WR, etc.)
   - **Jersey Number**: 0-99
   - **Team**: One of the 32 NFL teams
3. Click "Submit Guess" to see feedback
4. Use the color-coded feedback:
   - 🟢 **Green**: Correct!
   - 🟠 **Orange**: Close/Partial match
   - ⚫ **Gray**: Incorrect
5. Win by guessing all 5 attributes correctly (up to 6 guesses)

## Technical Details

- **Data Source**: ESPN API (with fallback to cached/static data)
- **Update Frequency**: Every hour (configurable)
- **Cache Duration**: 1 hour
- **Browser Support**: Modern browsers with ES6+ support

## Setup

Simply open `index.html` in your web browser. No build process or dependencies required!

## License

MIT License - Feel free to use and modify as needed.
