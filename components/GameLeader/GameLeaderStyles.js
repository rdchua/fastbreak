import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create({
    content: {
        paddingTop: 10,
        paddingBottom: 20
    },
    contentContainer: {
        flexDirection: 'row',
    },
    player: {
        flex: 6,
        flexDirection: 'row',
        paddingLeft: 5,
        width: 45,
        height: 45,
    },
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 40,
        position: 'absolute',
        bottom: 0,
    },
    team: {
        flex: 1,
        height: 50,
        width: 50,
        borderRadius: 9,
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    teamImage: {
        height: 40,
        width: 40,
    },
    playerDetails: {
        marginLeft: 0,
        flex: 1,
        alignSelf: 'center'
    },
    playerName: {
        marginBottom: 7,
        marginLeft: 7,
        color: 'white',
        fontSize: 15
    },
    statsContainer: {
        marginLeft: 7,
        flexDirection: 'row',
    },
    statValue: {
        color: 'white',
        // fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        // borderRightWidth: 2,
        // borderColor: '#333',
    },
    statName: {
        fontSize: 12,
        textAlign: 'left',
        color: '#aaa',
    },
    playerImageContainer: {
        width: 52.5, 
        height: 52.5,
        borderRadius: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    stat: {
        flex: 2,
        paddingRight: 10
    },
    playerNumber: {
        color: '#888',
        // fontWeight: 'bold'
        textAlign: 'center',
    }
})