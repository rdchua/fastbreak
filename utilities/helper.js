import teams from  './../data/teams.json';
import moment from 'moment';

export const headers = {
    headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest', 
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    })
}

export const getTeam = (team) => {
    let found = teams.find(currTeam => {
        return currTeam.teamId === team.teamId;
    });
    if(found) return found;
    else {
        return found = {
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
    }
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
    }
}

export const isWinner = (thisTeam, otherTeam) => {
    if(thisTeam > otherTeam) {
        return true;
    } else {
        return false;
    }
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