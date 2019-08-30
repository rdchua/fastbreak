import { StyleSheet } from "react-native";
import * as theme from "../../../Theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgColor
    },
    legendContainer: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    legendItem: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    legendDot: {
        width: 7,
        height: 7,
        borderRadius: 7,
        marginRight: 3
    },
    legendText: {
        color: 'white',
        fontSize: 12
    },
    filterContainer: {
        flexDirection: 'row',
        marginTop: 10
    }
});
