import { StyleSheet } from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor
    },
    infoName: {
        color: '#aaa'
    },
    infoValue: {
        fontSize: 15,
        color: 'white'
    },
    infoContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1
    }
})