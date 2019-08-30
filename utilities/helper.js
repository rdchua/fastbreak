/* eslint-disable radix */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
import moment from 'moment';
import Store from 'react-native-simple-store';
import _ from 'underscore';
import * as twitterAPI from "../api/twitter_endpoints";
import * as nbaAPI from "../api/data_nba_endpoints";
import reactotron from 'reactotron-react-native';
import teams from  "../data/teams";

export const headers = {
    headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    })
}

export const twitterAuth = fetch(twitterAPI.oAuth, twitterAPI.authHeaders).then((response) => response.json());
export const leaguePlayers = fetch(nbaAPI.PLAYERS).then((response) => response.json());

export const getTwitterToken = 
    Store.get('twitter_token').then((twitter_token) => {
        if(!twitter_token) {
            twitterAuth.then((data) => {
                Store.update('twitter_token', {access_token: data.access_token});
                return data.access_token
            });
        } else {
            return twitter_token;
        }
    });

export const loadPlayers = 
    leaguePlayers.then((data) => {
        Store.get('players').then((response) => {
            if(!response) {
                Store.push('players', data.league.standard);
            } else {
                Store.delete('players');
                Store.push('players', data.league.standard);
            }
        })
    });

export const getPlayers =
    Store.get('players').then((players) => {
        return players[0];
    });

export const getPlayer = (players, personId) => {
    const found = players.find((currPlayer) => {
        return currPlayer.personId === personId;
    });
    if(found) return found;
    return {};
}

export const getTeam = (team) => {
    let found = teams.find(currTeam => {
        return parseInt(currTeam.teamId) === parseInt(team.teamId);
    });
    if(found) {
        return found;
    }
    found = {
        isNBAFranchise: false,
        primaryColorRgba: "rgba(85,85,85,1)",
        city: "",
        altCityName: "",
        fullName: "",
        tricode: team.triCode,
        teamId: "",
        nickname: "Team",
        urlName: "",
        confName: "",
        divName: "",
        primaryColor: "#555",
        twitterName: ""
    }
    return found;
}

export const getGameTime = (status, clock, period, startTimeUTC) => {
    /**
     * statusNum: 3 = Game finished
     * statusNum: 2 = Game on going
     * statusNum: 1 = Game not yet started
     */
    switch(status) {
        case 3: {
            return 'FINAL';
        }
        case 2: {
            return period.isHalfTime ? 'HALF' : `${clock == '' ? '0.0' : clock} - Q${period.current}`;
        }
        case 1: {
            return moment(startTimeUTC).local().format('hh:mm a');
        }
        default: {
            return ''
        }
    }
}

export const isWinner = (thisTeam, otherTeam) => {
    if(thisTeam > otherTeam) {
        return true;
    } 
    return false;
}

export const hexToRgba = (hex, alpha) => {
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+`,${alpha})`;
    }
    throw new Error('Bad Hex');
} 

export const getTeamImage = (teamTriCode) => {
    let source;
    switch (teamTriCode) {
        case 'ATL':
            source = require('../assets/images/ATL_logo.png');
            break;
        case 'BOS':
            source = require('../assets/images/BOS_logo.png');
            break;
        case 'BKN':
            source = require('../assets/images/BKN_logo.png');
            break;
        case 'CHA':
            source = require('../assets/images/CHA_logo.png');
            break;
        case 'CHI':
            source = require('../assets/images/CHI_logo.png');
            break;
        case 'CLE':
            source = require('../assets/images/CLE_logo.png');
            break;
        case 'DAL':
            source = require('../assets/images/DAL_logo.png');
            break;
        case 'DEN':
            source = require('../assets/images/DEN_logo.png');
            break;
        case 'DET':
            source = require('../assets/images/DET_logo.png');
            break;
        case 'GSW':
            source = require('../assets/images/GSW_logo.png');
            break;
        case 'GS':
            source = require('../assets/images/GSW_logo.png');
            break;
        case 'HOU':
            source = require('../assets/images/HOU_logo.png');
            break;
        case 'IND':
            source = require('../assets/images/IND_logo.png');
            break;
        case 'LAC':
            source = require('../assets/images/LAC_logo.png');
            break;
        case 'LAL':
            source = require('../assets/images/LAL_logo.png');
            break;
        case 'MEM':
            source = require('../assets/images/MEM_logo.png');
            break;
        case 'MIA':
            source = require('../assets/images/MIA_logo.png');
            break;
        case 'MIL':
            source = require('../assets/images/MIL_logo.png');
            break;
        case 'MIN':
            source = require('../assets/images/MIN_logo.png');
            break;
        case 'NOP':
            source = require('../assets/images/NOP_logo.png');
            break;
        case 'NYK' || 'NY':
            source = require('../assets/images/NYK_logo.png');
            break;
        case 'NY':
            source = require('../assets/images/NYK_logo.png');
            break;
        case 'OKC':
            source = require('../assets/images/OKC_logo.png');
            break;
        case 'ORL':
            source = require('../assets/images/ORL_logo.png');
            break;
        case 'PHI':
            source = require('../assets/images/PHI_logo.png');
            break;
        case 'PHX':
            source = require('../assets/images/PHX_logo.png');
            break;
        case 'Pho':
            source = require('../assets/images/PHX_logo.png');
            break;
        case 'POR':
            source = require('../assets/images/POR_logo.png');
            break;
        case 'SAC':
            source = require('../assets/images/SAC_logo.png');
            break;
        case 'SAS':
            source = require('../assets/images/SAS_logo.png');
            break;
        case 'SA':
            source = require('../assets/images/SAS_logo.png');
            break;
        case 'TOR':
            source = require('../assets/images/TOR_logo.png');
            break;
        case 'UTA':
            source = require('../assets/images/UTA_logo.png');
            break;
        case 'WAS':
            source = require('../assets/images/WAS_logo.png');
            break;
        case 'NBA':
            source = require('../assets/images/NBA_logo.png');
            break;
        default:
            source = require('../assets/images/NBA_logo.png');
            break;
    }
    return source;
}