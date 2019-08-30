import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    /**
     * !General Styles
     */
    container: {
        flex: 1,
        backgroundColor: '#121314'
    },
    row: {
        marginVertical: 2,
        flexDirection: 'row'
    },
    /**
     * !Header styles
     */
    header: {
        flexDirection: 'row',
    },
    headerContentContainer: {
        flex: 1,
        justifyContent: 'center',
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    score: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    scoreDivider: {
        color: '#aaa',
        fontSize: 16,
        // fontWeight: 'bold'
    },
    teamName: {
        color: '#eee',
        fontWeight: 'bold',
        fontSize: 14
    },
    clock: {
        fontSize: 16,
        marginHorizontal: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    gameInfo: {
        marginTop: -10,
        marginBottom: 15
    },
    gameInfoVal: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 13
    },
    itemDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333'
    },
    /**
     * !Per quarter styles
     */
    teamRecord: {
        fontSize: 12,
        color: '#aaa'
    },
    quarterRow: {
        // flexDirection: 'row',
        borderWidth: 1,
        marginVertical: 0,
    },
    quarterTeamImage: {
        alignSelf: 'center',
        height: 70,
        width: 70,
    },
    quarterTeamName: {
        flex: 4,
        // fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        // fontWeight: 'bold'
    },
    quarterVal: {
        paddingVertical: 1,
        alignSelf: 'center',
        textAlign: 'center',
        // fontWeight: 'bold',
        color: 'white',
        // flex: 0.65
    },
    /**
     * !Toast Styles
     */
    toast: {
        backgroundColor: '#FFE0E0', 
        borderRadius: 20, 
        paddingHorizontal: 20, 
        paddingVertical: 10
    },
    toastText: {
        color:'#FC4F54',
        fontWeight: 'bold'
    },
    /**
     * !Article Styles
     */
    articleTitle: {
        fontSize: 17,
        lineHeight: 24,
        color: 'white'
    },
    articleBody: {
        lineHeight: 20,
        color: '#aaa',
        marginTop: 10,
    },
    quarterly: {
        flexDirection: 'row',
    },
    /**
     * !Team Leader Styles
     */
    leaderContainer: {
        flexDirection: 'row'
    },
    leaderPlayer: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leaderImage: {
        height: 55,
        width: 55,
        borderRadius: 50
    },
    leaderStatsContainer: {
        flex: 2,
    },
    leaderStats: {
        flex: 1,
        color: 'white',
        fontWeight: 'bold',
    },
    leaderName: {
        color: 'white',
        // fontSize: 12,
        // fontWeight: 'bold',
        textAlign: 'center'
    },
    leaderStatName: {
        flex: 1.5,
        fontSize: 12,
        color: '#888',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    /**
     * !Game Info Styles
     */
    gameDetails: {
        lineHeight: 22,
        fontSize: 14,
        color: '#fff',
        paddingHorizontal: 7,
    },
    infoContainer: {
        // flexDirection: 'row',
    },
    infoTitle: {
        flex: 1,
        color: '#aaa'
    },
    infoValue: {
        flex: 1,
        textAlign: 'right',
        color: 'white',
        fontWeight: 'bold'
    },
})