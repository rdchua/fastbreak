import { StyleSheet } from 'react-native';
import * as theme from './../../../Theme';

export const styles = StyleSheet.create({
    bigImage: {
        height: 50, 
        width: 50,
        borderRadius: 30,
        backgroundColor: '#D8D8D8',
    },
    imageContainer: {
        paddingVertical: 12,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#2a2a2a'
    },
    nameContainer: {
        justifyContent: 'center',
        marginLeft: 0
    },
    name: {
        color: 'white',
        zIndex: 2,
        marginLeft: 15,
        fontSize: 17
    },
    sub: {
        color: 'gray',
        marginLeft: 15,
        fontSize: 15,
        marginTop: 1
    }
})