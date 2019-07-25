import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
        flexDirection: 'row',
        backgroundColor: '#121314',
        height: 60
    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        marginRight: 20,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f',
        backgroundColor: '#1F2022',
        borderRadius: 20,
        flex: 2
    },
    icon: {
        alignSelf: 'center'
    },
    logo: {
        width: 40,
        height: 40
    }
});