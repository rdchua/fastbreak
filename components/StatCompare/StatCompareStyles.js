import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    /**
     * !Team stats styles
     */
    teamStatsContainer: {
        marginVertical: 7
    },
    statValueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    teamStatHome: {
        color: '#fff', 
        fontWeight: 'bold', 
    },
    teamStatVisitor: {
        color: '#fff', 
        fontWeight: 'bold', 
    },
    teamStatName: {
        color: '#aaa',
    },
});