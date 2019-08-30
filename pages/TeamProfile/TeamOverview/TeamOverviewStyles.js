import { StyleSheet } from 'react-native';
import * as theme from './../../../Theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.bgColor,
        flex: 1
    },
    header: {
    },
    headerContainer: {
        paddingHorizontal: 20,
        backgroundColor: theme.cardBgColor,
        borderBottomWidth: 1,
        borderColor: theme.cardBorderColor,
        paddingBottom: 10,
    },
    headerText: {
        color: 'white',
    },
    teamInfoContainer: {
        marginTop: -10,
        flexDirection: 'row',
    },
    teamImageContainer: {
        justifyContent: 'center'
    },
    teamImage: {
        marginRight: 15,
        height: 80,
        width: 80,
        borderRadius: 15,
        elevation: 8
    },
    teamDetails: {
        paddingVertical: 15,
        height: 100,
        justifyContent: 'flex-end'
    },
    teamName: {
        color: 'white',
        fontSize: 24,
    },
    teamSubName: {
        fontSize: 13,
        color: '#ccc'
    },
    sectionTitle: {
        paddingVertical: 15,
        paddingLeft: 5,
        fontSize: 13,
        color: '#fff'
    },
    nextMatchContainer: {

    }
})