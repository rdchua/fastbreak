export const BASE_URL = 'https://stats.nba.com/stats';
export const SCOREBOARD = (date) => {
    return `${BASE_URL}/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=${date}`;
}

export const headers = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    }
}
