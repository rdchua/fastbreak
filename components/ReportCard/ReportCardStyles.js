import { StyleSheet } from 'react-native';
import * as theme from './../../Theme';

export const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: 180,
        height: 200,
        borderWidth: 1,
        borderColor: theme.cardBorderColor,
        borderRadius: 15,
        backgroundColor: theme.cardInsideBgColor
    },
    image: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        margin: -10,
        flex: 1.5
    },
    title: {
        marginTop: 20,
        color: 'white',
        lineHeight: 20,
        flex: 1
    }
})