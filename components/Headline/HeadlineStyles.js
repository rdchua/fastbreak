import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
        paddingBottom: 15
    },
    cover: {
        marginTop: -10,
        height: 230,
        width: screenWidth,
        marginLeft: - 18
    },
    title: {
        marginTop: 15,
        lineHeight: 26,
        color: 'white',
        fontSize: 17
    },
    author: {
        marginTop: 15,
        color: 'white',
        fontSize: 12
    },
    time: {
        color: 'gray'
    }
})