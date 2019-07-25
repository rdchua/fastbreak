import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121314',
    },
    header: {
        backgroundColor: '#1F2022',
        height: 150,
    },
    headerContentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    hTeamImageHeader: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    vTeamImageHeader: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    scoreContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreDivider: {
        color: '#aaa',
        fontSize: 16,
        // fontWeight: 'bold'
    },
    header: {
        flex: 1, 
        flexDirection: 'row', 
        marginRight: 40, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    teamImage: {
        height: 40, 
        width: 40
    },
    score: {
        fontSize: 15,
        marginHorizontal: 5, 
        color: 'white', 
        fontWeight: 'bold'
    },
    clock: {
        fontSize: 15,
        marginHorizontal: 10, 
        color: 'white', 
        fontWeight: 'bold'
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#121314',
        justifyContent: 'center',
        alignItems: 'center'
    },
})