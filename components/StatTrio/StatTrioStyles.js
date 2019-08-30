import { StyleSheet } from 'react-native';
import * as theme from './../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statContainer: {
        // flexDirection: 'row',
        // borderRadius: 4,
        // borderWidth: 1,
        // borderColor: '#333',
        // padding: 10,
        width: 80,
        marginRight: 15
    },
    statValue: {
        fontSize: 22,
        color: 'white',
    },
    statName: {
        color: 'gray',
        fontSize: 13,
        paddingRight: 8
    },
    divider: {
        borderRadius: 8,
        width: 2,
        marginTop: 5,
        height: 23,
        backgroundColor: '#333',
        position: 'absolute',
        right: 0
    }
})