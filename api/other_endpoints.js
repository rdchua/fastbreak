export const RSS_FEED = (urlName) => {
    return `https://api.rss2json.com/v1/api.json?rss_url=https://www.nba.com/${urlName}/rss.xml`
}

export const TEAM_NEWS = (urlName) => {
    return `https://clutchpoints.4taps.me/articles/?term=${urlName}&limit=20&user_id=undefined`
}