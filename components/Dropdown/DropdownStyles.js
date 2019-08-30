import { StyleSheet } from 'react-native';
import * as theme from '../../Theme';

export const styles = StyleSheet.create({
    dropdownText: {
        color: '#aaa',
    },
    dropdown: { 
        width: 170,
        flexDirection: 'row',
    },
    dropdownIcon: {
        marginLeft: 5,
        marginTop: 3,
        alignSelf: 'center',
        color: '#fff'
    },
    dropdownList: {
        backgroundColor: '#333',
        borderWidth: 0,
        padding: 7,
    },
    dropdownListText: {
        fontSize: 14,
        color: '#eee',
        textAlign: 'center'
    },
    dropdownSeparator: {
        height: StyleSheet.hairlineWidth,
        color: '#aaa'
    },
})