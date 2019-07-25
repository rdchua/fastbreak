import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    contentConainer: {
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 8
    },
    tableHeader: {
        fontWeight: 'bold',
        color: '#888',
        marginBottom: 8,
        fontSize: 12,
        textAlign: 'center'
    },
    tableData: {
        color: 'white',
        paddingVertical: 8,
        textAlign: 'center'
    },
    playerContainer: {
        textAlign: 'left',
        elevation: 8
    },
    playerName: {
        flex: 1,
        paddingVertical: 8,
        color: 'white',
        textAlign: 'left',
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
        paddingBottom: 20,
        paddingTop: 10, 
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333'
    }
});