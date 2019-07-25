import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    /**
     * !Team stats styles
     */
    teamStatsContainer: {
        marginVertical: 10
    },
    teamStatValues: {
        flexDirection: 'row',
        marginBottom: 5
    },
    teamStatHome: {
        // flex: 1,
        // textAlign: 'left',
        // color: 'white',
        // fontWeight: 'bold'
        marginRight: 5,
        width: 30, 
        textAlign: 'center', 
        color: '#fff', 
        fontWeight: 'bold', 
        alignSelf: 'center'
    },
    teamStatVisitor: {
        // flex: 1,
        // textAlign: 'right',
        // color: 'white',
        // fontWeight: 'bold'
        marginLeft: 5,
        width: 30, 
        textAlign: 'center', 
        color: '#fff', 
        fontWeight: 'bold', 
        alignSelf: 'center'
    },
    teamStatName: {
        // flex: 1,
        // textAlign: 'center',
        // color: '#888',
        // fontWeight: 'bold'
        width: 40,
        textAlign: 'center',
        color: '#aaa',
    },
    teamStatBarContainer: {
        flexDirection: 'row'
    },
});