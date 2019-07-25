import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 30,
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#121314',
    },
    pageHeader: {
        lineHeight: 35,
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold',
    },
    heroContainer: {
        marginHorizontal: -8,
        position: 'relative',
        height: 300,
        marginBottom: 10,
    },
    hero: {
        position: 'absolute',
        width: screenWidth,
        height: 300
    },
    heroTextContainer: {
        width: screenWidth,
        position: 'absolute',
        bottom: 40,
        left: 20,
        zIndex: 3,
        paddingRight: 100
    },
    heroText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    heroTextSnip: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 12,
        letterSpacing: 1
    }
})