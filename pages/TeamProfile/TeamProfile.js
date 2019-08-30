import React, { Component } from "react";
import { View, Image, ScrollView, Animated, StatusBar } from "react-native";
import { styles } from "./TeamProfileStyles";
import * as theme from "./../../Theme";
import Reactotron from "reactotron-react-native";
import * as api from "./../../api/data_nba_endpoints";
import * as api2 from "./../../api/other_endpoints";
import * as api3 from "./../../api/stats_nba_endpoints";
import ScrollableTabView, {
    ProfileTabBar
} from "react-native-scrollable-tab-view";
import * as utils from "./../../utilities/helper";
import axios from 'axios';
/**
 * import custom components
 */
import TeamOverview from "./TeamOverview/TeamOverview";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import TeamRoster from "./TeamRoster/TeamRoster";
import TeamSchedule from "./TeamSchedule/TeamSchedule";
import MyText from "../../components/MyText/MyText";
import reactotron from "reactotron-react-native";
import TeamStats from "./TeamStats/TeamStats";
import TeamTransactions from "./TeamTransactions/TeamTransactions";

export default class TeamProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: null,
            rss: null,
            teamStats: null,
            roster: null,
            isScrolling: false,
            scrollY: new Animated.Value(0),
            opacity: new Animated.Value(0),
            childHeight: 0,
            height: 0,
            animationSet: false
        };
        params = { ...this.props.navigation.state.params };
        this.team = params.team;
        this.teamImage = params.teamImage;
        this.fetchNews();
        this.fetchRss();
        this.fetchSchedule();
        this.fetchTeamStats();
        this.fetchRoster();
        this.fetchTransactions();
        this.animatedValue = new Animated.Value(0);
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldState.childHeight == 0 && !oldState.animationSet) {
            this.props.navigation.setParams({
                animatedValue: this.animatedValue.interpolate({
                    inputRange: [0, this.state.height],
                    outputRange: [25, 0],
                    extrapolate: "clamp"
                }),
                animatedOpacity: this.animatedValue.interpolate({
                    inputRange: [0, this.state.height],
                    outputRange: [0, 1],
                    extrapolate: "clamp"
                })
            });
            this.setState({ animationSet: true });
        }
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params;
        const translateY = params.animatedValue;
        const transform = [{ translateY }];
        return {
            headerTitle: (
                <Animated.View
                    style={[
                        styles.header,
                        transform,
                        { opacity: params.animatedOpacity ? params.animatedOpacity : 0 }
                    ]}>
                    <MyText weight={700} style={styles.headerTitle}>
                        {params.team.fullName}
                    </MyText>
                </Animated.View>
            ),
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    <ButtonIcon name='export' style={{ marginRight: 10 }} />
                    <ButtonIcon name='hearto' style={{ marginRight: 20 }} />
                </View>
            ),
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                elevation: 0,
                backgroundColor: theme.cardBgColor
            },
            headerTintColor: "#fff"
        };
    };

    updateHeight = height => {
        this.setState({ height: height });
    };

    updateChildHeight = height => {
        this.setState({ childHeight: height });
    };

    updateIsScrolling = event => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
        );
        this.animatedValue.setValue(event.nativeEvent.contentOffset.y);
    };

    fetchTransactions() {
        fetch(api3.TRANSACTIONS)
            .then(response => response.json())
            .then(data => {
                const transactions = data.NBA_Player_Movement.rows;
                const teamTransactions = transactions.filter(transaction => {
                    return transaction.TEAM_ID == this.team.teamId
                })
                this.setState({ transactions: teamTransactions });
            });
    }

    fetchRoster() {
        fetch(api.TEAM_ROSTER(this.team.urlName))
            .then(response => response.json())
            .then(data => {
                Reactotron.log(data.league.standard.players);
                this.setState({ roster: data.league.standard.players });
            });
    }

    fetchTeamStats() {
        fetch(api3.TEAM_STATS(this.team.teamId), api3.headers)
            .then(response => response.json())
            .then(data => {
                const allTeamStats = data.resultSets[0].rowSet;
                const teamStats = allTeamStats.find(team => team[0] == parseInt(this.team.teamId))
                this.setState({ teamStats: teamStats });
            });
    }

    fetchNews() {
        fetch(api2.TEAM_NEWS(this.team.urlName))
            .then(response => response.json())
            .then(data => {
                this.setState({
                    headline: data.results[0],
                    news: data.results
                });
            });
    }

    fetchRss() {
        fetch(api2.RSS_FEED(this.team.urlName))
            .then(response => response.json())
            .then(data => {
                this.setState({ rss: data.items });
            });
    }

    fetchSchedule() {
        fetch(api.TEAM_SCHEDULE(this.team.urlName))
            .then(response => response.json())
            .then(data => {
                const lastGame = data.league.standard[data.league.standard.length - 1];
                const hTeam = utils.getTeam({ teamId: lastGame.hTeam.teamId });
                const vTeam = utils.getTeam({ teamId: lastGame.vTeam.teamId });
                this.setState({
                    schedule: data.league.standard,
                    lastGame: {
                        hTeam: hTeam,
                        vTeam: vTeam,
                        hTeamScore: lastGame.hTeam.score,
                        vTeamScore: lastGame.vTeam.score,
                        hTeamImage: utils.getTeamImage(hTeam.tricode),
                        vTeamImage: utils.getTeamImage(vTeam.tricode),
                        statusNum: lastGame.statusNum,
                        startTimeUTC: lastGame.startTimeUTC
                    }
                });
            });
    }

    render() {
        const translateY = this.state.scrollY.interpolate({
            inputRange: [0, this.state.height],
            outputRange: [0, -(this.state.height - 35)],
            extrapolate: "clamp"
        });
        const scrollOpacity = this.state.scrollY.interpolate({
            inputRange: [0, this.state.height],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
        const transform = [{ translateY }];
        return (
            <ScrollableTabView
                initialPage={0}
                tabBarPosition='top'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor='#1e1f21'
                tabBarUnderlineStyle={{
                    backgroundColor: "#1988F4",
                    height: 2,
                    borderRadius: 9
                }}
                tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                prerenderingSiblingsNumber={2}
                tabBarTextStyle={{
                    fontSize: 12,
                    letterSpacing: 0.7,
                    marginTop: 10
                }}
                renderTabBar={() => (
                    <ProfileTabBar
                        team={this.team}
                        teamImage={this.teamImage}
                        roster={this.state.roster}
                        lastGame={this.state.lastGame}
                        teamStats={this.state.teamStats}
                        headerStyle={{ opacity: scrollOpacity }}
                        updateHeight={this.updateHeight.bind(this)}
                        style={{ transform }}
                    />
                )}>
                <TeamOverview
                    tabLabel='NEWS'
                    headline={this.state.headline}
                    rss={this.state.rss}
                    news={this.state.news}
                    stats={this.state.teamStats}
                    loading={this.state.headline ? false : true}
                    updateChildHeight={this.updateChildHeight.bind(this)}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <TeamRoster
                    tabLabel='ROSTER'
                    roster={this.state.roster}
                    loading={this.state.headline ? false : true}
                    updateChildHeight={this.updateChildHeight.bind(this)}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <TeamStats
                    tabLabel='STATS'
                    last5={this.state.schedule ? this.state.schedule.slice(-6) : null}
                    stats={this.state.teamStats}
                    loading={this.state.teamStats ? false : true}
                    updateChildHeight={this.updateChildHeight.bind(this)}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <TeamSchedule
                    tabLabel='SCHEDULE'
                    schedule={this.state.schedule ? this.state.schedule.reverse() : null}
                    loading={this.state.schedule ? false : true}
                    updateChildHeight={this.updateChildHeight.bind(this)}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <TeamTransactions
                    tabLabel='TRANSACTIONS'
                    transactions={this.state.transactions ? this.state.transactions : null}
                    loading={this.state.transactions ? true : false}
                    updateChildHeight={this.updateChildHeight.bind(this)}
                    team={this.team}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
            </ScrollableTabView>
        );
    }
}
