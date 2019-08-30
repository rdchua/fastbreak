import { StyleSheet } from "react-native";
import * as theme from './../../Theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121314",
        paddingTop: 8
    },
    header: {
        flex: 1,
        flexDirection: "row",
        marginRight: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    headerContentContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    hTeamImageHeader: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignSelf: "center"
    },
    vTeamImageHeader: {
        width: 70,
        height: 70,
        justifyContent: "center",
        alignSelf: "center"
    },
    scoreContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    scoreDivider: {
        color: "#aaa",
        fontSize: 16
        // fontWeight: 'bold'
    },
    teamImage: {
        height: 40,
        width: 40
    },
    score: {
        fontSize: 15,
        marginHorizontal: 3.5,
        color: "white"
    },
    clock: {
        fontSize: 15,
        marginHorizontal: 10,
        color: "white"
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#121314",
        justifyContent: "center",
        alignItems: "center"
    },
    tabBarHeaderContainer: {
        height: 100
    }
});
