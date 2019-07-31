import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F2022',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#2B2C2E',
        marginVertical: 5,
    },
    tweetInfo: {
        flexDirection: 'row'
    },
    userImage: {
        width: 35,
        height: 35,
        borderRadius: 8,
        marginRight: 15
    },
    userName: {
        color: 'white',
    },
    createdAt: {
        color: 'gray',
        fontSize: 12
    },
    tweetBody: {
        marginTop: 5,
        fontSize: 17,
        color: 'white'
    },
    mediaContainer: {
        marginVertical: 10, 
        width: screenWidth - 18.5,
        marginLeft: -15
    }
})