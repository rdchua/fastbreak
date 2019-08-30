import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f'
    },
    content: {
        paddingVertical: 15,
        borderBottomColor: '#444'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        fontSize: 14,
        borderBottomColor: '#444',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    title2: {
        flex: 1,
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    headline: {
        flex: 1
    },
    headlineValue: {
        paddingLeft: 5,
        paddingRight: 10,
        lineHeight: 22,
        fontSize: 15,
        color: 'white',
    },
    newsImage: {
        height: 60,
        width: 60,
        borderRadius: 9,
        marginHorizontal: 15
    },
    image: {
        borderRadius: 9,
        height: '100%',
        width: '100%'
    },
    author: {
        paddingLeft: 5,
        fontSize: 12,
        color: 'white'
    }
});