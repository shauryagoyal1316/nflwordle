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
        // Current NFL season: 2026-2027
        const season = 2026;
        console.log(`Fetching players for season ${season}...`);
        
        // Get all teams first - API-Sports NFL endpoint
        // Try RapidAPI format first (most common for API-Sports)
        let teamsResponse = await fetch(`${API_BASE_URL}/teams?league=1&season=${season}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'v1.american-football.api-sports.io'
            }
        });
        
        // Fallback to alternative authentication if first fails
        if (!teamsResponse.ok) {
            console.log('Trying alternative authentication method...');
            teamsResponse = await fetch(`${API_BASE_URL}/teams?league=1&season=${season}`, {
                method: 'GET',
                headers: {
                    'x-apisports-key': API_KEY
                }
            });
        }

        if (!teamsResponse.ok) {
            const errorText = await teamsResponse.text();
            console.error(`Teams API failed: ${teamsResponse.status}`, errorText);
            
            // Check for CORS or authentication errors
            if (teamsResponse.status === 0 || teamsResponse.status === 403 || teamsResponse.status === 401) {
                console.error('API authentication or CORS issue. Check API key and CORS settings.');
            }
            
            throw new Error(`Teams API failed: ${teamsResponse.status} - ${errorText.substring(0, 200)}`);
        }

        const teamsData = await teamsResponse.json();
        
        // Log response for debugging
        console.log('Teams API Response:', JSON.stringify(teamsData).substring(0, 500));
        
        // Check for API errors in response
        if (teamsData.errors && teamsData.errors.length > 0) {
            console.error('API Errors:', teamsData.errors);
            throw new Error(`API Errors: ${JSON.stringify(teamsData.errors)}`);
        }
        
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
                // Try RapidAPI format first (most common)
                let playersResponse = await fetch(`${API_BASE_URL}/players?team=${teamId}&season=${season}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'v1.american-football.api-sports.io'
                    }
                });
                
                // Fallback to alternative authentication if first fails
                if (!playersResponse.ok) {
                    playersResponse = await fetch(`${API_BASE_URL}/players?team=${teamId}&season=${season}`, {
                        method: 'GET',
                        headers: {
                            'x-apisports-key': API_KEY
                        }
                    });
                }

                if (!playersResponse.ok) {
                    const errorText = await playersResponse.text();
                    console.warn(`Failed to fetch players for ${teamName}: ${playersResponse.status}`, errorText.substring(0, 200));
                    return [];
                }

                const playersData = await playersResponse.json();
                const teamPlayers = [];
                
                // Log response structure for debugging
                if (teamPlayers.length === 0 && playersData) {
                    console.log(`API Response for ${teamName}:`, JSON.stringify(playersData).substring(0, 500));
                }
                
                // API-Sports response structure: { get: "...", parameters: {...}, errors: [], results: N, response: [...] }
                if (playersData.response && Array.isArray(playersData.response)) {
                    playersData.response.forEach(player => {
                        // Handle different possible response structures
                        const playerObj = player.player || player;
                        const playerName = playerObj.name || playerObj.firstname + ' ' + playerObj.lastname || '';
                        const playerPosition = playerObj.position || playerObj.positions?.primary || playerObj.positions?.position || '';
                        const playerJersey = playerObj.number || playerObj.jersey || player.number || 0;
                        
                        // Check active status - API-Sports may use different fields
                        const isActive = playerObj.active !== false && 
                                        player.active !== false && 
                                        playerObj.injured !== true && 
                                        player.injured !== true &&
                                        (playerObj.status !== 'Inactive' && player.status !== 'Inactive');
                        
                        // Only include active players with valid data
                        if (isActive && playerName && playerPosition) {
                            const position = normalizePosition(playerPosition);
                            const jersey = parseInt(playerJersey) || 0;
                            const teamInfo = TEAM_DIVISIONS[teamName];
                            
                            // Include players with valid data (jersey can be 0 for some positions)
                            if (position && teamInfo && playerName) {
                                teamPlayers.push({
                                    id: playerObj.id || player.id || Math.random(),
                                    name: playerName.trim(),
                                    team: teamName,
                                    conference: teamInfo.conference,
                                    division: teamInfo.division,
                                    position: position,
                                    jersey: jersey
                                });
                            }
                        }
                    });
                } else if (playersData.errors && playersData.errors.length > 0) {
                    console.error(`API errors for ${teamName}:`, playersData.errors);
                } else {
                    console.warn(`Unexpected response structure for ${teamName}:`, playersData);
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

        if (allPlayers.length === 0) {
            console.error('No players fetched from API. Check API response structure and filters.');
        } else {
            console.log(`Successfully fetched ${allPlayers.length} active NFL players from API-Sports`);
        }
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
        
        // No API data - return empty (cached data only used temporarily in initializePlayerData)
        // Main requirement: Always call API, no fallback players
        
        // No data available - API must be called
        if (typeof updateDataStatus === 'function') {
            updateDataStatus(0, null);
        }
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        
        console.error('API fetch failed. No player data available. Please refresh the page to try again.');
        return [];
        
    } catch (error) {
        console.error('Error updating player data:', error);
        
        // On error, return empty - API must be called successfully
        NFL_PLAYERS = [];
        
        if (showLoading && typeof hideLoadingIndicator === 'function') {
            hideLoadingIndicator();
        }
        
        console.error('API call failed. Please refresh the page to try again.');
        return [];
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

// Initialize data on load - ALWAYS calls API, no fallback players
async function initializePlayerData() {
    // Always call API first - no fallback players
    const apiData = await updatePlayerData(true);
    
    if (apiData && apiData.length > 0) {
        NFL_PLAYERS = apiData;
        return;
    }
    
    // No data available - API must be called successfully
    NFL_PLAYERS = [];
    console.error('API call failed. No player data available. Please refresh the page to try again.');
}
