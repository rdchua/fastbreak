export const BASE_URL = 'https://stats.nba.com/stats';
export const season = '2018-19'
export const SCOREBOARD = (date) => {
    return `${BASE_URL}/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=${date}`;
}

export const TEAM_STATS = (teamId) => {
    /**
     * 0:TEAM_ID
        1:TEAM_NAME
        2:GP
        3:W
        4:L
        5:W_PCT
        6:MIN
        7:FGM
        8:FGA
        9:FG_PCT
        10:FG3M
        11:FG3A
        12:FG3_PCT
        13:FTM
        14:FTA
        15:FT_PCT
        16:OREB
        17:DREB
        18:REB
        19:AST
        20:TOV
        21:STL
        22:BLK
        23:BLKA
        24:PF
        25:PFD
        26:PTS
        27:PLUS_MINUS
        28:GP_RANK
        29:W_RANK
        30:L_RANK
        31:W_PCT_RANK
        32:MIN_RANK
        33:FGM_RANK
        34:FGA_RANK
        35:FG_PCT_RANK
        36:FG3M_RANK
        37:FG3A_RANK
        38:FG3_PCT_RANK
        39:FTM_RANK
        40:FTA_RANK
        41:FT_PCT_RANK
        42:OREB_RANK
        43:DREB_RANK
        44:REB_RANK
        45:AST_RANK
        46:TOV_RANK
        47:STL_RANK
        48:BLK_RANK
        49:BLKA_RANK
        50:PF_RANK
        51:PFD_RANK
        52:PTS_RANK
        53:PLUS_MINUS_RANK
        54:CFID
        55:CFPARAMS
     */
    return `${BASE_URL}/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=`;
}

export const TEAM_ROSTER = (teamId) => {
    /**
     * 1"TeamID",
        2"SEASON",
        3"LeagueID",
        4"PLAYER",
        5"NUM",
        6"POSITION",
        7"HEIGHT",
        8"WEIGHT",
        9"BIRTH_DATE",
        10"AGE",
        11"EXP",
        12"SCHOOL",
        13"PLAYER_ID"
     */
    return `${BASE_URL}/commonteamroster?LeagueID=00&Season=2019-20&TeamID=${teamId}`;
}

export const GAME_LOG = (personId, type) => {
    // 0:SEASON_ID
    // 1:Player_ID
    // 2:Game_ID
    // 3:GAME_DATE
    // 4:MATCHUP
    // 5:WL
    // 6:MIN
    // 7:FGM
    // 8:FGA
    // 9:FG_PCT
    // 10:FG3M
    // 11:FG3A
    // 12:FG3_PCT
    // 13:FTM
    // 14:FTA
    // 15:FT_PCT
    // 16:OREB
    // 17:DREB
    // 18:REB
    // 19:AST
    // 20:STL
    // 21:BLK
    // 22:TOV
    // 23:PF
    // 24:PTS
    // 25:PLUS_MINUS
    // 26:VIDEO_AVAILABLE
    return `${BASE_URL}/playergamelog?PlayerID=${personId}&Season=2018-19&SeasonType=${type}`
}

export const PLAYER_SEASON_STATS = (personId) => {
    return `https://stats.nba.com/stats/playerdashboardbyyearoveryear?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID=${personId}&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=yoy&VsConference=&VsDivision=`;
}

export const PLAYER_CAREER_STATS = (personId) => {
    return `https://stats.nba.com/stats/playercareerstats?LeagueID=00&PerMode=PerGame&PlayerID=${personId}`;
}

export const FANTASY_NEWS = (firstName, lastName) => {
    return `https://stats-prod.nba.com/wp-json/statscms/v1/rotowire/player/?player=${firstName} ${lastName}&limit=25`;
}

export const TRANSACTIONS = `https://stats.nba.com/js/data/playermovement/NBA_Player_Movement.json`;

export const headers = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    }
}

export const axiosHeaders = {
    'headers' : {
        'X-Requested-With': 'XMLHttpRequest', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    }
}
