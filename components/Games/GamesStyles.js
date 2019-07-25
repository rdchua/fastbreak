import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f',
        overflow: 'hidden'
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        borderBottomColor: '#333',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    subtitle: {
        flex: 1,
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    itemDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333'
    },
});