import { StyleSheet  } from 'react-native';
import * as theme from './../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#333'
    },
    playerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    teamContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    transactionContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    playerImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#D8D8D8'
    },
    playerName: {
        textAlign: 'left',
        alignSelf: 'center',
        color: 'white',
        fontSize: 17
    },
    playerInfo: {
        justifyContent: 'flex-start',
        marginLeft: 15
    },
    transaction: {
        fontSize: 15,
        color: 'gray',
        textAlign: 'left'
    },
    teamInfo: {
        marginRight: 5
    },
    teamImage: {
        height: 60,
        width: 60,
        borderRadius: 25,
    },
    teamName: {
        color: 'white',
        fontSize: 17,
        textAlign: 'right',
    },
    date: {
        textAlign: 'right',
        color: 'gray',
        fontSize: 15
    },
    iconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 20,
        width: 20,
        borderRadius: 15,
        marginRight: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tradeImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    }
})