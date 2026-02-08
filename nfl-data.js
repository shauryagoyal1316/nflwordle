// NFL Player Data
// Automatically updates from API with fallback to cached/static data

let NFL_PLAYERS = [
    // AFC East
    { name: "Josh Allen", team: "Buffalo Bills", conference: "AFC", division: "AFC East", position: "QB", jersey: 17 },
    { name: "Tyreek Hill", team: "Miami Dolphins", conference: "AFC", division: "AFC East", position: "WR", jersey: 10 },
    { name: "Mac Jones", team: "New England Patriots", conference: "AFC", division: "AFC East", position: "QB", jersey: 10 },
    { name: "Aaron Rodgers", team: "New York Jets", conference: "AFC", division: "AFC East", position: "QB", jersey: 8 },
    
    // AFC North
    { name: "Lamar Jackson", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "QB", jersey: 8 },
    { name: "Joe Burrow", team: "Cincinnati Bengals", conference: "AFC", division: "AFC North", position: "QB", jersey: 9 },
    { name: "Deshaun Watson", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "QB", jersey: 4 },
    { name: "T.J. Watt", team: "Pittsburgh Steelers", conference: "AFC", division: "AFC North", position: "LB", jersey: 90 },
    
    // AFC South
    { name: "C.J. Stroud", team: "Houston Texans", conference: "AFC", division: "AFC South", position: "QB", jersey: 7 },
    { name: "Anthony Richardson", team: "Indianapolis Colts", conference: "AFC", division: "AFC South", position: "QB", jersey: 5 },
    { name: "Trevor Lawrence", team: "Jacksonville Jaguars", conference: "AFC", division: "AFC South", position: "QB", jersey: 16 },
    { name: "Derrick Henry", team: "Tennessee Titans", conference: "AFC", division: "AFC South", position: "RB", jersey: 22 },
    
    // AFC West
    { name: "Patrick Mahomes", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "QB", jersey: 15 },
    { name: "Justin Herbert", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "QB", jersey: 10 },
    { name: "Russell Wilson", team: "Denver Broncos", conference: "AFC", division: "AFC West", position: "QB", jersey: 3 },
    { name: "Davante Adams", team: "Las Vegas Raiders", conference: "AFC", division: "AFC West", position: "WR", jersey: 17 },
    
    // NFC East
    { name: "Dak Prescott", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "QB", jersey: 4 },
    { name: "Jalen Hurts", team: "Philadelphia Eagles", conference: "NFC", division: "NFC East", position: "QB", jersey: 1 },
    { name: "Daniel Jones", team: "New York Giants", conference: "NFC", division: "NFC East", position: "QB", jersey: 8 },
    { name: "Sam Howell", team: "Washington Commanders", conference: "NFC", division: "NFC East", position: "QB", jersey: 14 },
    
    // NFC North
    { name: "Justin Fields", team: "Chicago Bears", conference: "NFC", division: "NFC North", position: "QB", jersey: 1 },
    { name: "Jared Goff", team: "Detroit Lions", conference: "NFC", division: "NFC North", position: "QB", jersey: 16 },
    { name: "Jordan Love", team: "Green Bay Packers", conference: "NFC", division: "NFC North", position: "QB", jersey: 10 },
    { name: "Kirk Cousins", team: "Minnesota Vikings", conference: "NFC", division: "NFC North", position: "QB", jersey: 8 },
    
    // NFC South
    { name: "Derek Carr", team: "New Orleans Saints", conference: "NFC", division: "NFC South", position: "QB", jersey: 4 },
    { name: "Baker Mayfield", team: "Tampa Bay Buccaneers", conference: "NFC", division: "NFC South", position: "QB", jersey: 6 },
    { name: "Bryce Young", team: "Carolina Panthers", conference: "NFC", division: "NFC South", position: "QB", jersey: 9 },
    { name: "Desmond Ridder", team: "Atlanta Falcons", conference: "NFC", division: "NFC South", position: "QB", jersey: 9 },
    
    // NFC West
    { name: "Kyler Murray", team: "Arizona Cardinals", conference: "NFC", division: "NFC West", position: "QB", jersey: 1 },
    { name: "Matthew Stafford", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "QB", jersey: 9 },
    { name: "Brock Purdy", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "QB", jersey: 13 },
    { name: "Geno Smith", team: "Seattle Seahawks", conference: "NFC", division: "NFC West", position: "QB", jersey: 7 },
    
    // Additional notable players
    { name: "Travis Kelce", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "TE", jersey: 87 },
    { name: "Cooper Kupp", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "WR", jersey: 10 },
    { name: "Christian McCaffrey", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "RB", jersey: 23 },
    { name: "Nick Bosa", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "DL", jersey: 97 },
    { name: "Micah Parsons", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "LB", jersey: 11 },
    { name: "Myles Garrett", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "DL", jersey: 95 },
    { name: "Ja'Marr Chase", team: "Cincinnati Bengals", conference: "AFC", division: "AFC North", position: "WR", jersey: 1 },
    { name: "Justin Jefferson", team: "Minnesota Vikings", conference: "NFC", division: "NFC North", position: "WR", jersey: 18 },
    { name: "CeeDee Lamb", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "WR", jersey: 88 },
    { name: "Josh Jacobs", team: "Las Vegas Raiders", conference: "AFC", division: "AFC West", position: "RB", jersey: 8 },
    { name: "Jonathan Taylor", team: "Indianapolis Colts", conference: "AFC", division: "AFC South", position: "RB", jersey: 28 },
    { name: "Saquon Barkley", team: "New York Giants", conference: "NFC", division: "NFC East", position: "RB", jersey: 26 },
    { name: "Austin Ekeler", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "RB", jersey: 30 },
    { name: "Alvin Kamara", team: "New Orleans Saints", conference: "NFC", division: "NFC South", position: "RB", jersey: 41 },
    { name: "Stefon Diggs", team: "Buffalo Bills", conference: "AFC", division: "AFC East", position: "WR", jersey: 14 },
    { name: "A.J. Brown", team: "Philadelphia Eagles", conference: "NFC", division: "NFC East", position: "WR", jersey: 11 },
    { name: "DeAndre Hopkins", team: "Tennessee Titans", conference: "AFC", division: "AFC South", position: "WR", jersey: 10 },
    { name: "Mark Andrews", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "TE", jersey: 89 },
    { name: "George Kittle", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "TE", jersey: 85 },
    { name: "T.J. Hockenson", team: "Minnesota Vikings", conference: "NFC", division: "NFC North", position: "TE", jersey: 87 },
    { name: "Dallas Goedert", team: "Philadelphia Eagles", conference: "NFC", division: "NFC East", position: "TE", jersey: 88 },
    { name: "Aaron Donald", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "DL", jersey: 99 },
    { name: "Maxx Crosby", team: "Las Vegas Raiders", conference: "AFC", division: "AFC West", position: "DL", jersey: 98 },
    { name: "Fred Warner", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "LB", jersey: 54 },
    { name: "Roquan Smith", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "LB", jersey: 0 },
    { name: "Jalen Ramsey", team: "Miami Dolphins", conference: "AFC", division: "AFC East", position: "CB", jersey: 5 },
    { name: "Jaire Alexander", team: "Green Bay Packers", conference: "NFC", division: "NFC North", position: "CB", jersey: 23 },
    { name: "Derwin James", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "S", jersey: 33 },
    { name: "Minkah Fitzpatrick", team: "Pittsburgh Steelers", conference: "AFC", division: "AFC North", position: "S", jersey: 39 },
    { name: "Justin Tucker", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "K", jersey: 9 },
    { name: "Harrison Butker", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "K", jersey: 7 }
];

// Team to Conference/Division mapping
const TEAM_DIVISIONS = {
    "Arizona Cardinals": { conference: "NFC", division: "NFC West" },
    "Atlanta Falcons": { conference: "NFC", division: "NFC South" },
    "Baltimore Ravens": { conference: "AFC", division: "AFC North" },
    "Buffalo Bills": { conference: "AFC", division: "AFC East" },
    "Carolina Panthers": { conference: "NFC", division: "NFC South" },
    "Chicago Bears": { conference: "NFC", division: "NFC North" },
    "Cincinnati Bengals": { conference: "AFC", division: "AFC North" },
    "Cleveland Browns": { conference: "AFC", division: "AFC North" },
    "Dallas Cowboys": { conference: "NFC", division: "NFC East" },
    "Denver Broncos": { conference: "AFC", division: "AFC West" },
    "Detroit Lions": { conference: "NFC", division: "NFC North" },
    "Green Bay Packers": { conference: "NFC", division: "NFC North" },
    "Houston Texans": { conference: "AFC", division: "AFC South" },
    "Indianapolis Colts": { conference: "AFC", division: "AFC South" },
    "Jacksonville Jaguars": { conference: "AFC", division: "AFC South" },
    "Kansas City Chiefs": { conference: "AFC", division: "AFC West" },
    "Las Vegas Raiders": { conference: "AFC", division: "AFC West" },
    "Los Angeles Chargers": { conference: "AFC", division: "AFC West" },
    "Los Angeles Rams": { conference: "NFC", division: "NFC West" },
    "Miami Dolphins": { conference: "AFC", division: "AFC East" },
    "Minnesota Vikings": { conference: "NFC", division: "NFC North" },
    "New England Patriots": { conference: "AFC", division: "AFC East" },
    "New Orleans Saints": { conference: "NFC", division: "NFC South" },
    "New York Giants": { conference: "NFC", division: "NFC East" },
    "New York Jets": { conference: "AFC", division: "AFC East" },
    "Philadelphia Eagles": { conference: "NFC", division: "NFC East" },
    "Pittsburgh Steelers": { conference: "AFC", division: "AFC North" },
    "San Francisco 49ers": { conference: "NFC", division: "NFC West" },
    "Seattle Seahawks": { conference: "NFC", division: "NFC West" },
    "Tampa Bay Buccaneers": { conference: "NFC", division: "NFC South" },
    "Tennessee Titans": { conference: "AFC", division: "AFC South" },
    "Washington Commanders": { conference: "NFC", division: "NFC East" }
};

// Cache management
const CACHE_KEY = 'nfl_players_cache';
const CACHE_TIMESTAMP_KEY = 'nfl_players_cache_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Position mapping for API data
const POSITION_MAP = {
    'QB': 'QB', 'Quarterback': 'QB',
    'RB': 'RB', 'Running Back': 'RB', 'HB': 'RB', 'FB': 'RB',
    'WR': 'WR', 'Wide Receiver': 'WR',
    'TE': 'TE', 'Tight End': 'TE',
    'OL': 'OL', 'Offensive Lineman': 'OL', 'OT': 'OL', 'OG': 'OL', 'C': 'OL', 'T': 'OL', 'G': 'OL',
    'DL': 'DL', 'Defensive Lineman': 'DL', 'DE': 'DL', 'DT': 'DL', 'NT': 'DL',
    'LB': 'LB', 'Linebacker': 'LB', 'ILB': 'LB', 'OLB': 'LB', 'MLB': 'LB',
    'CB': 'CB', 'Cornerback': 'CB',
    'S': 'S', 'Safety': 'S', 'FS': 'S', 'SS': 'S',
    'K': 'K', 'Kicker': 'K',
    'P': 'P', 'Punter': 'P'
};

// Team name normalization
function normalizeTeamName(teamName) {
    const teamMap = {
        'ARI': 'Arizona Cardinals', 'Arizona': 'Arizona Cardinals',
        'ATL': 'Atlanta Falcons', 'Atlanta': 'Atlanta Falcons',
        'BAL': 'Baltimore Ravens', 'Baltimore': 'Baltimore Ravens',
        'BUF': 'Buffalo Bills', 'Buffalo': 'Buffalo Bills',
        'CAR': 'Carolina Panthers', 'Carolina': 'Carolina Panthers',
        'CHI': 'Chicago Bears', 'Chicago': 'Chicago Bears',
        'CIN': 'Cincinnati Bengals', 'Cincinnati': 'Cincinnati Bengals',
        'CLE': 'Cleveland Browns', 'Cleveland': 'Cleveland Browns',
        'DAL': 'Dallas Cowboys', 'Dallas': 'Dallas Cowboys',
        'DEN': 'Denver Broncos', 'Denver': 'Denver Broncos',
        'DET': 'Detroit Lions', 'Detroit': 'Detroit Lions',
        'GB': 'Green Bay Packers', 'Green Bay': 'Green Bay Packers',
        'HOU': 'Houston Texans', 'Houston': 'Houston Texans',
        'IND': 'Indianapolis Colts', 'Indianapolis': 'Indianapolis Colts',
        'JAX': 'Jacksonville Jaguars', 'Jacksonville': 'Jacksonville Jaguars',
        'KC': 'Kansas City Chiefs', 'Kansas City': 'Kansas City Chiefs',
        'LV': 'Las Vegas Raiders', 'Las Vegas': 'Las Vegas Raiders', 'OAK': 'Las Vegas Raiders', 'Oakland': 'Las Vegas Raiders',
        'LAC': 'Los Angeles Chargers', 'LA Chargers': 'Los Angeles Chargers', 'San Diego': 'Los Angeles Chargers',
        'LAR': 'Los Angeles Rams', 'LA Rams': 'Los Angeles Rams', 'St. Louis': 'Los Angeles Rams',
        'MIA': 'Miami Dolphins', 'Miami': 'Miami Dolphins',
        'MIN': 'Minnesota Vikings', 'Minnesota': 'Minnesota Vikings',
        'NE': 'New England Patriots', 'New England': 'New England Patriots',
        'NO': 'New Orleans Saints', 'New Orleans': 'New Orleans Saints',
        'NYG': 'New York Giants', 'NY Giants': 'New York Giants',
        'NYJ': 'New York Jets', 'NY Jets': 'New York Jets',
        'PHI': 'Philadelphia Eagles', 'Philadelphia': 'Philadelphia Eagles',
        'PIT': 'Pittsburgh Steelers', 'Pittsburgh': 'Pittsburgh Steelers',
        'SF': 'San Francisco 49ers', 'San Francisco': 'San Francisco 49ers',
        'SEA': 'Seattle Seahawks', 'Seattle': 'Seattle Seahawks',
        'TB': 'Tampa Bay Buccaneers', 'Tampa Bay': 'Tampa Bay Buccaneers',
        'TEN': 'Tennessee Titans', 'Tennessee': 'Tennessee Titans',
        'WAS': 'Washington Commanders', 'Washington': 'Washington Commanders'
    };
    return teamMap[teamName] || teamName;
}

// Normalize position
function normalizePosition(position) {
    return POSITION_MAP[position] || position;
}

// Get current NFL season year
function getCurrentSeason() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11
    // NFL season starts in September, so if we're before September, use previous year
    return month < 8 ? year - 1 : year;
}

// Team abbreviations for ESPN API
const TEAM_ABBREVIATIONS = {
    'Arizona Cardinals': 'ARI',
    'Atlanta Falcons': 'ATL',
    'Baltimore Ravens': 'BAL',
    'Buffalo Bills': 'BUF',
    'Carolina Panthers': 'CAR',
    'Chicago Bears': 'CHI',
    'Cincinnati Bengals': 'CIN',
    'Cleveland Browns': 'CLE',
    'Dallas Cowboys': 'DAL',
    'Denver Broncos': 'DEN',
    'Detroit Lions': 'DET',
    'Green Bay Packers': 'GB',
    'Houston Texans': 'HOU',
    'Indianapolis Colts': 'IND',
    'Jacksonville Jaguars': 'JAX',
    'Kansas City Chiefs': 'KC',
    'Las Vegas Raiders': 'LV',
    'Los Angeles Chargers': 'LAC',
    'Los Angeles Rams': 'LAR',
    'Miami Dolphins': 'MIA',
    'Minnesota Vikings': 'MIN',
    'New England Patriots': 'NE',
    'New Orleans Saints': 'NO',
    'New York Giants': 'NYG',
    'New York Jets': 'NYJ',
    'Philadelphia Eagles': 'PHI',
    'Pittsburgh Steelers': 'PIT',
    'San Francisco 49ers': 'SF',
    'Seattle Seahawks': 'SEA',
    'Tampa Bay Buccaneers': 'TB',
    'Tennessee Titans': 'TEN',
    'Washington Commanders': 'WAS'
};

// Reverse lookup for team abbreviations
const ABBREV_TO_TEAM = Object.fromEntries(
    Object.entries(TEAM_ABBREVIATIONS).map(([team, abbrev]) => [abbrev, team])
);

// Fetch players from ESPN API
async function fetchPlayersFromESPN() {
    try {
        const season = getCurrentSeason();
        const allPlayers = [];
        
        // Fetch all teams first
        const teamsResponse = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=50`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!teamsResponse.ok) throw new Error('Failed to fetch teams');
        const teamsData = await teamsResponse.json();
        
        if (!teamsData.sports || !teamsData.sports[0] || !teamsData.sports[0].leagues || !teamsData.sports[0].leagues[0]) {
            throw new Error('Invalid teams data structure');
        }
        
        const teams = teamsData.sports[0].leagues[0].teams || [];
        
        // Fetch rosters for each team (with rate limiting)
        const teamPromises = teams.map(async (teamObj, index) => {
            // Stagger requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, index * 50));
            
            const team = teamObj.team;
            const teamAbbrev = team.abbreviation;
            const teamName = ABBREV_TO_TEAM[teamAbbrev] || team.displayName;
            
            try {
                // Try to fetch roster from ESPN
                const rosterUrl = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${team.id}/roster`;
                const rosterResponse = await fetch(rosterUrl, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                
                if (!rosterResponse.ok) return [];
                
                const rosterData = await rosterResponse.json();
                
                if (!rosterData.athletes) return [];
                
                return rosterData.athletes.map(athlete => {
                    const position = normalizePosition(athlete.position?.abbreviation || athlete.position?.name || '');
                    const jersey = parseInt(athlete.jersey) || 0;
                    const teamInfo = TEAM_DIVISIONS[teamName];
                    
                    if (!teamInfo || !position) return null;
                    
                    return {
                        name: athlete.displayName || athlete.fullName || '',
                        team: teamName,
                        conference: teamInfo.conference,
                        division: teamInfo.division,
                        position: position,
                        jersey: jersey
                    };
                }).filter(p => p && p.name && p.position);
                
            } catch (e) {
                console.warn(`Failed to fetch roster for ${teamName}:`, e);
                return [];
            }
        });
        
        const teamResults = await Promise.all(teamPromises);
        const players = teamResults.flat().filter(p => p !== null);
        
        return players.length > 0 ? players : null;
        
    } catch (error) {
        console.error('Error fetching from ESPN API:', error);
        return null;
    }
}

// Fetch players from API (multiple fallback sources)
async function fetchPlayersFromAPI() {
    // Try ESPN API first
    const espnData = await fetchPlayersFromESPN();
    if (espnData && espnData.length > 0) {
        return espnData;
    }
    
    // Could add more API sources here as fallbacks
    return null;
}

// Process and normalize player data
function processPlayerData(rawData) {
    if (!rawData || !Array.isArray(rawData)) return null;
    
    return rawData
        .filter(player => {
            // Filter for active players with required fields
            return player.name && 
                   player.team && 
                   player.position && 
                   (player.jersey !== undefined && player.jersey !== null);
        })
        .map(player => {
            const teamInfo = TEAM_DIVISIONS[normalizeTeamName(player.team)];
            if (!teamInfo) return null;
            
            return {
                name: player.name,
                team: normalizeTeamName(player.team),
                conference: teamInfo.conference,
                division: teamInfo.division,
                position: normalizePosition(player.position),
                jersey: parseInt(player.jersey) || 0
            };
        })
        .filter(player => player !== null);
}

// Get cached data
function getCachedData() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cached && timestamp) {
            const age = Date.now() - parseInt(timestamp);
            if (age < CACHE_DURATION) {
                return JSON.parse(cached);
            }
        }
    } catch (e) {
        console.error('Error reading cache:', e);
    }
    return null;
}

// Save to cache
function saveToCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
        console.error('Error saving cache:', e);
    }
}

// Main update function
async function updatePlayerData(showLoading = true) {
    if (showLoading && typeof showLoadingIndicator === 'function') {
        showLoadingIndicator();
    }

    try {
        // Try to fetch from API
        const apiData = await fetchPlayersFromAPI();
        
        if (apiData && apiData.length > 0) {
            const processed = processPlayerData(apiData);
            if (processed && processed.length > 0) {
                NFL_PLAYERS = processed;
                saveToCache(processed);
                
                // Update UI status
                if (typeof updateDataStatus === 'function') {
                    updateDataStatus(processed.length, Date.now());
                }
                
                if (showLoading && typeof hideLoadingIndicator === 'function') {
                    hideLoadingIndicator();
                }
                return processed;
            }
        }
        
        // Fallback to cached data
        const cached = getCachedData();
        if (cached && cached.length > 0) {
            NFL_PLAYERS = cached;
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            const lastUpdate = timestamp ? parseInt(timestamp) : null;
            
            if (typeof updateDataStatus === 'function') {
                updateDataStatus(cached.length, lastUpdate);
            }
            
            if (showLoading && typeof hideLoadingIndicator === 'function') {
                hideLoadingIndicator();
            }
            return cached;
        }
        
        // Final fallback to static data
        if (typeof updateDataStatus === 'function') {
            updateDataStatus(NFL_PLAYERS.length, null);
        }
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        return NFL_PLAYERS;
        
    } catch (error) {
        console.error('Error updating player data:', error);
        
        // Try cached data on error
        const cached = getCachedData();
        if (cached && cached.length > 0) {
            NFL_PLAYERS = cached;
            const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            const lastUpdate = timestamp ? parseInt(timestamp) : null;
            
            if (typeof updateDataStatus === 'function') {
                updateDataStatus(cached.length, lastUpdate);
            }
        } else if (typeof updateDataStatus === 'function') {
            updateDataStatus(NFL_PLAYERS.length, null);
        }
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        return NFL_PLAYERS;
    }
}

// Function to get a random player
function getRandomPlayer() {
    if (!NFL_PLAYERS || NFL_PLAYERS.length === 0) {
        console.warn('No players available, using fallback');
        return { name: "Patrick Mahomes", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "QB", jersey: 15 };
    }
    const randomIndex = Math.floor(Math.random() * NFL_PLAYERS.length);
    return NFL_PLAYERS[randomIndex];
}

// Initialize data on load
async function initializePlayerData() {
    // Load cached data immediately for instant startup
    const cached = getCachedData();
    if (cached && cached.length > 0) {
        NFL_PLAYERS = cached;
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const lastUpdate = timestamp ? parseInt(timestamp) : null;
        
        // Show cached data status immediately
        if (typeof updateDataStatus === 'function') {
            updateDataStatus(cached.length, lastUpdate);
        }
    }
    
    // Check if cache is stale (older than 1 hour)
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const cacheAge = timestamp ? Date.now() - parseInt(timestamp) : Infinity;
    const shouldUpdate = cacheAge > CACHE_DURATION;
    
    // Update in background if cache is stale, otherwise do silent update
    if (shouldUpdate) {
        updatePlayerData(true);
    } else {
        // Silent update in background
        updatePlayerData(false);
    }
}

// Set up periodic updates (every hour)
setInterval(() => {
    updatePlayerData(false); // Silent update
}, CACHE_DURATION);
