import { StyleSheet } from 'react-native'; 

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 5
    },
    percentage: {
        color: '#fff',
    },
    statNameContainer: {
        flex: 1
    },
    statName: {
        textAlign: 'center', 
        color: '#aaa',
        letterSpacing: 0.5,
        textTransform: 'uppercase'
        // fontWeight: 'bold'
    },
    text: {
        color: '#666',
        marginTop: 2,
        fontSize: 12,
        textAlign: 'center'
    }
})