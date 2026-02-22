// NFL Player Data - Using API-Sports NFL API
// API Documentation: https://api-sports.io/documentation/nfl/v1
// To use: Get a free API key from https://api-sports.io/ and replace API_KEY below

// API Key - Replace with your API key from https://api-sports.io/
const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key at https://api-sports.io/
const API_BASE_URL = 'https://v1.american-football.api-sports.io';

let NFL_PLAYERS = []; // Will be populated from API

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

// Team name normalization for API responses
function normalizeTeamName(apiTeamName) {
    const teamMap = {
        'Arizona': 'Arizona Cardinals',
        'Atlanta': 'Atlanta Falcons',
        'Baltimore': 'Baltimore Ravens',
        'Buffalo': 'Buffalo Bills',
        'Carolina': 'Carolina Panthers',
        'Chicago': 'Chicago Bears',
        'Cincinnati': 'Cincinnati Bengals',
        'Cleveland': 'Cleveland Browns',
        'Dallas': 'Dallas Cowboys',
        'Denver': 'Denver Broncos',
        'Detroit': 'Detroit Lions',
        'Green Bay': 'Green Bay Packers',
        'Houston': 'Houston Texans',
        'Indianapolis': 'Indianapolis Colts',
        'Jacksonville': 'Jacksonville Jaguars',
        'Kansas City': 'Kansas City Chiefs',
        'Las Vegas': 'Las Vegas Raiders',
        'LA Chargers': 'Los Angeles Chargers',
        'LA Rams': 'Los Angeles Rams',
        'Miami': 'Miami Dolphins',
        'Minnesota': 'Minnesota Vikings',
        'New England': 'New England Patriots',
        'New Orleans': 'New Orleans Saints',
        'NY Giants': 'New York Giants',
        'NY Jets': 'New York Jets',
        'Philadelphia': 'Philadelphia Eagles',
        'Pittsburgh': 'Pittsburgh Steelers',
        'San Francisco': 'San Francisco 49ers',
        'Seattle': 'Seattle Seahawks',
        'Tampa Bay': 'Tampa Bay Buccaneers',
        'Tennessee': 'Tennessee Titans',
        'Washington': 'Washington Commanders'
    };
    return teamMap[apiTeamName] || apiTeamName;
}

// Position normalization
function normalizePosition(apiPosition) {
    const positionMap = {
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
    return positionMap[apiPosition] || apiPosition;
}

// Fetch all players from API-Sports NFL API
async function fetchAllPlayersFromAPI() {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('API key not set. Please get a free API key from https://api-sports.io/ and update API_KEY in nfl-data.js');
        return null;
    }

    try {
        console.log('Fetching all NFL players from API-Sports...');
        
        const allPlayers = [];
        const season = new Date().getFullYear();
        
        // Get all teams first - API-Sports NFL endpoint
        // Try both authentication methods for compatibility
        let teamsResponse = await fetch(`${API_BASE_URL}/teams?league=1&season=${season}`, {
            method: 'GET',
            headers: {
                'x-apisports-key': API_KEY
            }
        });
        
        // Fallback to RapidAPI format if first fails
        if (!teamsResponse.ok) {
            teamsResponse = await fetch(`${API_BASE_URL}/teams?league=1&season=${season}`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v1.american-football.api-sports.io'
                }
            });
        }

        if (!teamsResponse.ok) {
            const errorText = await teamsResponse.text();
            console.error(`Teams API failed: ${teamsResponse.status}`, errorText);
            throw new Error(`Teams API failed: ${teamsResponse.status}`);
        }

        const teamsData = await teamsResponse.json();
        
        // API-Sports response structure: { get: "...", parameters: {...}, errors: [], results: N, response: [...] }
        if (!teamsData.response || !Array.isArray(teamsData.response)) {
            console.error('Invalid teams response structure:', teamsData);
            throw new Error('Invalid teams response structure');
        }

        const teams = teamsData.response;
        console.log(`Found ${teams.length} teams, fetching rosters...`);

        // Fetch players for each team
        const fetchPromises = teams.map(async (team, index) => {
            const teamId = team.id;
            const teamName = normalizeTeamName(team.name || team.team?.name || '');
            
            if (!TEAM_DIVISIONS[teamName]) {
                console.warn(`Unknown team: ${teamName}, skipping...`);
                return [];
            }

            try {
                // Fetch players for this team - API-Sports endpoint
                // Try primary authentication method first
                let playersResponse = await fetch(`${API_BASE_URL}/players?team=${teamId}&season=${season}`, {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': API_KEY
                    }
                });
                
                // Fallback to RapidAPI format if first fails
                if (!playersResponse.ok) {
                    playersResponse = await fetch(`${API_BASE_URL}/players?team=${teamId}&season=${season}`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': API_KEY,
                            'x-rapidapi-host': 'v1.american-football.api-sports.io'
                        }
                    });
                }

                if (!playersResponse.ok) {
                    console.warn(`Failed to fetch players for ${teamName}: ${playersResponse.status}`);
                    return [];
                }

                const playersData = await playersResponse.json();
                const teamPlayers = [];
                
                // API-Sports response structure: { get: "...", parameters: {...}, errors: [], results: N, response: [...] }
                if (playersData.response && Array.isArray(playersData.response)) {
                    playersData.response.forEach(player => {
                        // Handle different possible response structures
                        const playerObj = player.player || player;
                        const playerName = playerObj.name || '';
                        const playerPosition = playerObj.position || playerObj.positions?.primary || '';
                        const playerJersey = playerObj.number || playerObj.jersey || player.number || 0;
                        const isActive = playerObj.active !== false && player.active !== false && 
                                        (playerObj.injured !== true && player.injured !== true);
                        
                        // Only include active players with valid data
                        if (isActive && playerName && playerPosition) {
                            const position = normalizePosition(playerPosition);
                            const jersey = parseInt(playerJersey) || 0;
                            const teamInfo = TEAM_DIVISIONS[teamName];
                            
                            // Only include players with valid jersey numbers
                            if (position && teamInfo && playerName && jersey > 0) {
                                teamPlayers.push({
                                    id: playerObj.id || player.id || Math.random(),
                                    name: playerName,
                                    team: teamName,
                                    conference: teamInfo.conference,
                                    division: teamInfo.division,
                                    position: position,
                                    jersey: jersey
                                });
                            }
                        }
                    });
                }
                
                if (teamPlayers.length > 0) {
                    console.log(`✓ Fetched ${teamPlayers.length} players from ${teamName}`);
                }

                // Rate limiting - small delay between requests
                await new Promise(resolve => setTimeout(resolve, 100));
                
                return teamPlayers;
                
            } catch (error) {
                console.warn(`Error fetching players for ${teamName}:`, error);
                return [];
            }
        });

        // Fetch all teams in parallel with rate limiting
        const allTeamPlayers = await Promise.allSettled(fetchPromises);
        
        allTeamPlayers.forEach((result, index) => {
            if (result.status === 'fulfilled' && Array.isArray(result.value)) {
                allPlayers.push(...result.value);
            }
        });

        console.log(`Successfully fetched ${allPlayers.length} active NFL players from API-Sports`);
        return allPlayers.length > 0 ? allPlayers : null;

    } catch (error) {
        console.error('Error fetching from API-Sports:', error);
        return null;
    }
}

// Cache management
const CACHE_KEY = 'nfl_players_cache';
const CACHE_TIMESTAMP_KEY = 'nfl_players_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

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

function saveToCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (e) {
        console.error('Error saving cache:', e);
    }
}

// Main update function - fetches ALL players from API
async function updatePlayerData(showLoading = true) {
    if (showLoading && typeof showLoadingIndicator === 'function') {
        showLoadingIndicator();
    }

    try {
        // Try to fetch from API
        const apiData = await fetchAllPlayersFromAPI();
        
        if (apiData && apiData.length > 0) {
            NFL_PLAYERS = apiData;
            saveToCache(apiData);
            
            if (typeof updateDataStatus === 'function') {
                updateDataStatus(apiData.length, Date.now());
            }
            
            if (showLoading && typeof hideLoadingIndicator === 'function') {
                hideLoadingIndicator();
            }
            return apiData;
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
        
        // No data available - use fallback
        if (FALLBACK_PLAYERS && FALLBACK_PLAYERS.length > 0) {
            NFL_PLAYERS = FALLBACK_PLAYERS;
            console.log('Using fallback player data');
            
            if (typeof updateDataStatus === 'function') {
                updateDataStatus(FALLBACK_PLAYERS.length, null);
            }
            
            if (showLoading && typeof hideLoadingIndicator === 'function') {
                hideLoadingIndicator();
            }
            return FALLBACK_PLAYERS;
        }
        
        // No data available
        if (typeof updateDataStatus === 'function') {
            updateDataStatus(0, null);
        }
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        
        console.error('No player data available. Please check API key configuration.');
        return [];
        
    } catch (error) {
        console.error('Error updating player data:', error);
        
        const cached = getCachedData();
        if (cached && cached.length > 0) {
            NFL_PLAYERS = cached;
            if (typeof updateDataStatus === 'function') {
                updateDataStatus(cached.length, null);
            }
        }
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        return NFL_PLAYERS || [];
    }
}

// Function to get a random player
function getRandomPlayer() {
    if (!NFL_PLAYERS || NFL_PLAYERS.length === 0) {
        console.warn('No players available');
        return null;
    }
    const randomIndex = Math.floor(Math.random() * NFL_PLAYERS.length);
    return NFL_PLAYERS[randomIndex];
}

// Fallback static player list - ensures game works even without API
const FALLBACK_PLAYERS = [
    { name: "Patrick Mahomes", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "QB", jersey: 15 },
    { name: "Josh Allen", team: "Buffalo Bills", conference: "AFC", division: "AFC East", position: "QB", jersey: 17 },
    { name: "Lamar Jackson", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "QB", jersey: 8 },
    { name: "Joe Burrow", team: "Cincinnati Bengals", conference: "AFC", division: "AFC North", position: "QB", jersey: 9 },
    { name: "Justin Herbert", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "QB", jersey: 10 },
    { name: "Tua Tagovailoa", team: "Miami Dolphins", conference: "AFC", division: "AFC East", position: "QB", jersey: 1 },
    { name: "Trevor Lawrence", team: "Jacksonville Jaguars", conference: "AFC", division: "AFC South", position: "QB", jersey: 16 },
    { name: "C.J. Stroud", team: "Houston Texans", conference: "AFC", division: "AFC South", position: "QB", jersey: 7 },
    { name: "Jalen Hurts", team: "Philadelphia Eagles", conference: "NFC", division: "NFC East", position: "QB", jersey: 1 },
    { name: "Dak Prescott", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "QB", jersey: 4 },
    { name: "Brock Purdy", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "QB", jersey: 13 },
    { name: "Matthew Stafford", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "QB", jersey: 9 },
    { name: "Geno Smith", team: "Seattle Seahawks", conference: "NFC", division: "NFC West", position: "QB", jersey: 7 },
    { name: "Kyler Murray", team: "Arizona Cardinals", conference: "NFC", division: "NFC West", position: "QB", jersey: 1 },
    { name: "Jordan Love", team: "Green Bay Packers", conference: "NFC", division: "NFC North", position: "QB", jersey: 10 },
    { name: "Jared Goff", team: "Detroit Lions", conference: "NFC", division: "NFC North", position: "QB", jersey: 16 },
    { name: "Kirk Cousins", team: "Minnesota Vikings", conference: "NFC", division: "NFC North", position: "QB", jersey: 8 },
    { name: "Justin Fields", team: "Chicago Bears", conference: "NFC", division: "NFC North", position: "QB", jersey: 1 },
    { name: "Baker Mayfield", team: "Tampa Bay Buccaneers", conference: "NFC", division: "NFC South", position: "QB", jersey: 6 },
    { name: "Derek Carr", team: "New Orleans Saints", conference: "NFC", division: "NFC South", position: "QB", jersey: 4 },
    { name: "Desmond Ridder", team: "Atlanta Falcons", conference: "NFC", division: "NFC South", position: "QB", jersey: 9 },
    { name: "Bryce Young", team: "Carolina Panthers", conference: "NFC", division: "NFC South", position: "QB", jersey: 9 },
    { name: "Daniel Jones", team: "New York Giants", conference: "NFC", division: "NFC East", position: "QB", jersey: 8 },
    { name: "Sam Howell", team: "Washington Commanders", conference: "NFC", division: "NFC East", position: "QB", jersey: 14 },
    { name: "Aaron Rodgers", team: "New York Jets", conference: "AFC", division: "AFC East", position: "QB", jersey: 8 },
    { name: "Mac Jones", team: "New England Patriots", conference: "AFC", division: "AFC East", position: "QB", jersey: 10 },
    { name: "Russell Wilson", team: "Denver Broncos", conference: "AFC", division: "AFC West", position: "QB", jersey: 3 },
    { name: "Anthony Richardson", team: "Indianapolis Colts", conference: "AFC", division: "AFC South", position: "QB", jersey: 5 },
    { name: "Will Levis", team: "Tennessee Titans", conference: "AFC", division: "AFC South", position: "QB", jersey: 7 },
    { name: "Kenny Pickett", team: "Pittsburgh Steelers", conference: "AFC", division: "AFC North", position: "QB", jersey: 8 },
    { name: "Deshaun Watson", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "QB", jersey: 4 },
    { name: "Christian McCaffrey", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "RB", jersey: 23 },
    { name: "Derrick Henry", team: "Tennessee Titans", conference: "AFC", division: "AFC South", position: "RB", jersey: 22 },
    { name: "Josh Jacobs", team: "Las Vegas Raiders", conference: "AFC", division: "AFC West", position: "RB", jersey: 8 },
    { name: "Saquon Barkley", team: "New York Giants", conference: "NFC", division: "NFC East", position: "RB", jersey: 26 },
    { name: "Austin Ekeler", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "RB", jersey: 30 },
    { name: "Breece Hall", team: "New York Jets", conference: "AFC", division: "AFC East", position: "RB", jersey: 20 },
    { name: "Jonathan Taylor", team: "Indianapolis Colts", conference: "AFC", division: "AFC South", position: "RB", jersey: 28 },
    { name: "Travis Kelce", team: "Kansas City Chiefs", conference: "AFC", division: "AFC West", position: "TE", jersey: 87 },
    { name: "Mark Andrews", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "TE", jersey: 89 },
    { name: "George Kittle", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "TE", jersey: 85 },
    { name: "Tyreek Hill", team: "Miami Dolphins", conference: "AFC", division: "AFC East", position: "WR", jersey: 10 },
    { name: "CeeDee Lamb", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "WR", jersey: 88 },
    { name: "Justin Jefferson", team: "Minnesota Vikings", conference: "NFC", division: "NFC North", position: "WR", jersey: 18 },
    { name: "Ja'Marr Chase", team: "Cincinnati Bengals", conference: "AFC", division: "AFC North", position: "WR", jersey: 1 },
    { name: "Cooper Kupp", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "WR", jersey: 10 },
    { name: "Stefon Diggs", team: "Buffalo Bills", conference: "AFC", division: "AFC East", position: "WR", jersey: 14 },
    { name: "Davante Adams", team: "Las Vegas Raiders", conference: "AFC", division: "AFC West", position: "WR", jersey: 17 },
    { name: "A.J. Brown", team: "Philadelphia Eagles", conference: "NFC", division: "NFC East", position: "WR", jersey: 11 },
    { name: "DeAndre Hopkins", team: "Tennessee Titans", conference: "AFC", division: "AFC South", position: "WR", jersey: 10 },
    { name: "Mike Evans", team: "Tampa Bay Buccaneers", conference: "NFC", division: "NFC South", position: "WR", jersey: 13 },
    { name: "Keenan Allen", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "WR", jersey: 13 },
    { name: "Amari Cooper", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "WR", jersey: 2 },
    { name: "DK Metcalf", team: "Seattle Seahawks", conference: "NFC", division: "NFC West", position: "WR", jersey: 14 },
    { name: "Terry McLaurin", team: "Washington Commanders", conference: "NFC", division: "NFC East", position: "WR", jersey: 17 },
    { name: "T.J. Watt", team: "Pittsburgh Steelers", conference: "AFC", division: "AFC North", position: "DL", jersey: 90 },
    { name: "Myles Garrett", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "DL", jersey: 95 },
    { name: "Nick Bosa", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "DL", jersey: 97 },
    { name: "Aaron Donald", team: "Los Angeles Rams", conference: "NFC", division: "NFC West", position: "DL", jersey: 99 },
    { name: "Micah Parsons", team: "Dallas Cowboys", conference: "NFC", division: "NFC East", position: "LB", jersey: 11 },
    { name: "Roquan Smith", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "LB", jersey: 0 },
    { name: "Fred Warner", team: "San Francisco 49ers", conference: "NFC", division: "NFC West", position: "LB", jersey: 54 },
    { name: "Bobby Wagner", team: "Seattle Seahawks", conference: "NFC", division: "NFC West", position: "LB", jersey: 45 },
    { name: "Sauce Gardner", team: "New York Jets", conference: "AFC", division: "AFC East", position: "CB", jersey: 1 },
    { name: "Jalen Ramsey", team: "Miami Dolphins", conference: "AFC", division: "AFC East", position: "CB", jersey: 5 },
    { name: "Patrick Surtain II", team: "Denver Broncos", conference: "AFC", division: "AFC West", position: "CB", jersey: 2 },
    { name: "Denzel Ward", team: "Cleveland Browns", conference: "AFC", division: "AFC North", position: "CB", jersey: 21 },
    { name: "Minkah Fitzpatrick", team: "Pittsburgh Steelers", conference: "AFC", division: "AFC North", position: "S", jersey: 39 },
    { name: "Derwin James", team: "Los Angeles Chargers", conference: "AFC", division: "AFC West", position: "S", jersey: 33 },
    { name: "Justin Tucker", team: "Baltimore Ravens", conference: "AFC", division: "AFC North", position: "K", jersey: 9 }
];

// Initialize data on load
async function initializePlayerData() {
    // Load cached data immediately for instant startup
    const cached = getCachedData();
    if (cached && cached.length > 0) {
        NFL_PLAYERS = cached;
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const lastUpdate = timestamp ? parseInt(timestamp) : null;
        
        if (typeof updateDataStatus === 'function') {
            updateDataStatus(cached.length, lastUpdate);
        }
    } else {
        // Use fallback players if no cache
        NFL_PLAYERS = FALLBACK_PLAYERS;
        console.log('Using fallback player data');
    }
    
    // Then update in background
    const cacheAge = cached ? Date.now() - parseInt(localStorage.getItem(CACHE_TIMESTAMP_KEY) || '0') : Infinity;
    if (cacheAge > CACHE_DURATION) {
        updatePlayerData(true);
    } else {
        updatePlayerData(false);
    }
}
