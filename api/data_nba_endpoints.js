const base_url = 'https://data.nba.net/prod';
const v = 'v2';
const v1 = 'v1'
const year = '2019';

export const TEAMS = `${base_url}/${v}/teams.json`;
export const PLAYERS = `${base_url}/${v}/${year}/players.json`;

export const SCOREBOARD = (date) => {
    return `${base_url}/${v}/${date}/scoreboard.json`;
}

export const BOXSCORE = (date, gameId) => {
    return `${base_url}/v1/${date}/${gameId}_boxscore.json`;
}

export const PREVIEW_ARTICLE = (date, gameId) => {
    return `${base_url}/v1/${date}/${gameId}_preview_article.json`;
}

export const RECAP_ARTICLE = (date, gameId) => {
    return `${base_url}/v1/${date}/${gameId}_recap_article.json`;
}

export const PBP = (date, gameId, period) => {
    return `${base_url}/v1/${date}/${gameId}_pbp_${period}.json`;
}

export const HEADSHOT = (personId) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`;;
}

