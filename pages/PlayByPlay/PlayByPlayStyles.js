import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 10, 
        marginBottom: 20,
        paddingHorizontal: 8
    },
    segmentContainer: {
        flex: 1,
        marginBottom: 5,
        paddingBottom: 15,
        flexDirection: 'row',
        backgroundColor: '#1F2022',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
        elevation: 4
    },
    sgementButton: {
        paddingVertical: 10, 
        flex: 1, 
        paddingHorizontal: 0, 
        marginHorizontal: 5
    },
    row: {
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: '#333',
        paddingVertical: 10
    },
    playContainer: {
        // flexDirection: 'row', 
        // alignItems: 'center'
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    teamScoreWinner: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    teamScoreLoser: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        color: 'gray',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    roundedCornerLeft: {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginRight: 0.5
    },
    roundedCornerRight: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        marginLeft: 0.5
    },
    clock: {
        width: 45,
        color: '#fff',
    },
    imageContainer: {
        width: 65
    },
    image: {
        marginLeft: -25,
        height: 40, 
        width: 40,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    play: {
        flex: 2,
        fontSize: 13,
        paddingRight: 50,
        marginLeft: -15,
        alignSelf: 'center',
        color: '#aaa',
    }
})