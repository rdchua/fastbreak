import { StyleSheet } from 'react-native';
import * as theme from '../../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor
    },
    contentConainer: {
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 5
    },
    tableHeader: {
        color: '#888',
        marginBottom: 8,
        fontSize: 12,
        textAlign: 'center',
    },
    tableData: {
        color: 'white',
        paddingVertical: 10,
        textAlign: 'center'
    },
    playerContainer: {
        textAlign: 'left',
        elevation: 8
    },
    playerName: {
        flex: 1,
        paddingVertical: 10,
        color: 'white',
        textAlign: 'left',
        borderBottomWidth: 0.5, 
        borderColor: '#333'
    },
    shadow: {
        // marginLeft: -20,
        position: 'absolute',
        width: 20,
        left: 150,
        height: '110%',
        elevation: 3,
    },
    playerPos: {
        color: '#888'
    },
    segmentContainer: {
        flexDirection: 'row', 
        paddingBottom: 15,
        marginBottom: 10,
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // borderColor: '#333',
        // justifyContent: 'space-between',
        // justifyContent: 'center'
    },
    itemSeparator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333',
    },
    circle: {
        width: 25,
        height: 25,
        marginHorizontal: 2,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 15
    },
    win: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12
    },
})