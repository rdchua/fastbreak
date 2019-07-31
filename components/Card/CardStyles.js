import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#2B2C2E',
        overflow: 'hidden'
    },
    cardTitle: {
        paddingBottom: 15,
        paddingHorizontal: 5,
        borderBottomColor: '#333',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        marginBottom: 10
    },
    title: {
        flex: 1,
        // fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    subtitle: {
        flex: 1,
        // fontWeight: 'bold',
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        textTransform: 'uppercase',
        textAlign: 'right'
    },
})