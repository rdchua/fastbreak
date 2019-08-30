import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 13,
        borderRadius: 15,
        overflow: 'hidden',
    },
    contentContainer: {
        flexDirection: 'row',
    },
    scores: {
        flex: 1.7,
    },
    teamRow: {
        flexDirection: 'row'
    },
    teamImage: {
        height: 35,
        width: 35,
        marginRight: 10,
    },
    teamNameWinner: {
        flex: 1,
        // fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    teamNameLoser: {
        flex: 1,
        color: 'gray',
        alignSelf: 'center',
    },
    teamScoreWinner: {
        width: 40,
        paddingVertical: 5,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    teamScoreLoser: {
        width: 40,
        paddingVertical: 5,
        color: 'gray',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    gameInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    gameDetails: {
        flex: 1.5,
        flexDirection: 'column'
    },
    gameClock: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        flex: 1
    },
    gameClockValue: {
        paddingLeft: 8
    },
    gameStream: {
        flex: 1,
        paddingHorizontal: 8,
    },
    gameStreamValue: {
        paddingLeft: 8,
        color: '#888'
    },
    gameActions: {
        flex: 1,
        justifyContent: 'center'
    },
    gameAlert: {
        alignSelf: 'flex-end',
        paddingRight: 8
    },
    nugget: {
        color: '#888',
        fontSize: 12,
        // fontStyle: 'italic',
        paddingLeft: 8,
        paddingTop: 5,
    },
    caret: {
        alignSelf: 'center',
        paddingRight: 10
    },
    roundedCornerTop: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4
    },
    roundedCornerBottom: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
    },
    collapsibleView: {
        marginVertical: 20,
        paddingHorizontal: 8,
        // justifyContent: 'center'
    },
    leaderContainer: {
        marginVertical: 5,
        borderColor: 'white',
        flexDirection: 'row'
    },
    hPlayerLeader: {
        flex: 1,
        color: 'white',
        textAlign: 'center'
    },
    vPlayerLeader: {
        flex: 1,
        color: 'white',
        textAlign: 'center'
    },
    statName: {
        color: '#888',
        fontSize: 12,
        alignSelf: 'center',
        // fontWeight: 'bold',
        marginHorizontal: 20,
        flex: 1,
        textAlign: 'center'
    },
    hTeamLeaderVal: {
        flex: 1,
        textAlign: 'center',
        // fontWeight: 'bold',
        color: 'white',
    },
    vTeamLeaderVal: {
        flex: 1,
        textAlign: 'center',
        // fontWeight: 'bold',
        color: 'white',
    }
})