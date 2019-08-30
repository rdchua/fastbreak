import { StyleSheet, Dimensions } from 'react-native';
import * as theme from './../../Theme';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
        flexDirection: 'row'
    },
    tweetInfo: {
        flexDirection: 'row'
    },
    userImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        marginRight: 15
    },
    userName: {
        color: 'white',
        fontSize: 15
    },
    createdAt: {
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        marginLeft: 5
    },
    tweetBody: {
        fontSize: 15,
        color: 'white'
    },
    mediaContainer: {
        marginTop: 10, 
        borderRadius: 8,
        // width: screenWidth - 13,
        // marginLeft: -15
    },
    image: {
        borderRadius: 5,
        resizeMode: 'cover'
    },
    link: {
        color: theme.accentColor
    },
})