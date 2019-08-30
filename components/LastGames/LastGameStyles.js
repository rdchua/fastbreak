import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamName: {
        color: 'white',
        fontSize: 12,
        flex: 0.5
    },
    circle: {
        width: 25,
        height: 25,
        marginHorizontal: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center'
    },
    win: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    },
    flatlist: {
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})