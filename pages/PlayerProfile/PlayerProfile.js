import React, { Component } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { styles } from './PlayerProfileStyles';
import ScrollableTabView, {PlayerTabBar} from "react-native-scrollable-tab-view";
import PlayerStats from './PlayerStats/PlayerStats';
import MyText from '../../components/MyText/MyText';
import * as theme from '../../Theme';
import * as api from '../../api/stats_nba_endpoints';
import Axios from 'axios';
import reactotron from 'reactotron-react-native';
import PlayerNews from './PlayerNews/PlayerNews';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import PlayerLogs from './PlayerLogs/PlayerLogs';

export default class PlayerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childHeight: 0,
            height: 0,
            animationSet: false,
            isScrolling: false,
            scrollY: new Animated.Value(0),
            opacity: new Animated.Value(0),
        }
        params = { ...this.props.navigation.state.params };
        this.player = params.player;
        this.teamImage = params.teamImage;
        this.teamColor = params.teamColor;
        this.fetchGameLog();
        this.fetchGameStats();
        this.fetchNews();
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
                        hello
                    </MyText>
                </Animated.View>
            ),
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                elevation: 0,
                backgroundColor: theme.cardBgColor
            },
            headerTintColor: "#fff"
        };
    };

    fetchGameLog() {
        Axios.get(api.GAME_LOG(this.player.personId, 'Regular Season'), api.axiosHeaders)
            .then((data) => {
                const lastGame = data.data.resultSets[0].rowSet[data.data.resultSets[0].rowSet.length - 1];
                this.setState({ 
                    gameLogSeason: data.data.resultSets[0].rowSet,
                    lastGame: lastGame 
                });
            })
            .catch(err => {
                reactotron.log(err);
            })
        Axios.get(api.GAME_LOG(this.player.personId, 'Playoffs'), api.axiosHeaders)
            .then((data) => {
                const lastGame = data.data.resultSets[0].rowSet[data.data.resultSets[0].rowSet.length - 1];
                this.setState({ 
                    gameLogPlayoffs: data.data.resultSets[0].rowSet,
                    lastGame: lastGame 
                });
            })
            .catch(err => {
                reactotron.log(err);
            })
    }

    fetchGameStats() {
        Promise.all([
            Axios.get(api.PLAYER_SEASON_STATS(this.player.personId), api.axiosHeaders),
            Axios.get(api.PLAYER_CAREER_STATS(this.player.personId), api.axiosHeaders)
        ])
        .then(([season, career]) => {
            reactotron.display({ name: 'season', value: season });
            reactotron.display({ name: 'career', value: career });
            this.setState({ 
                statsByYear: season.data.resultSets[1].rowSet,
                statsSelectedYear: season.data.resultSets[1].rowSet[0],
                careerStats: career.data.resultSets[1].rowSet[0],
            })
        })
    }

    fetchNews() {
        Axios.get(api.FANTASY_NEWS(this.player.firstName, this.player.lastName), api.axiosHeaders)
            .then((data) => {
                this.setState({ news: data.data.PlayerRotowires });
            });
    }

    updateHeight = height => {
        this.setState({ height: height, paddingHeight: height });
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
        // this.setState({ paddingHeight: event.nativeEvent.contentOffset.y });
    };

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
                    <PlayerTabBar
                        player={this.player}
                        teamImage={this.teamImage}
                        teamColor={this.teamColor}
                        headerStyle={{ opacity: scrollOpacity }}
                        currentSeasonStats={this.state.statsByYear ? this.state.statsByYear[0] : null}
                        updateHeight={this.updateHeight.bind(this)}
                        style={{ transform }}/>
                )}>
                <PlayerStats
                    tabLabel='STATS'
                    lastGame={this.state.lastGame}
                    headerHeight={this.state.height}
                    careerStats={this.state.careerStats}
                    statsByYear={this.state.statsByYear}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <PlayerNews
                    tabLabel='NEWS'
                    news={this.state.news}
                    headerHeight={this.state.height}
                    paddingHeight={this.state.paddingHeight}
                    screenProps={{
                        scrollViewHeight: this.state.height,
                        scrollY: this.state.scrollY,
                        updateIsScrolling: this.updateIsScrolling.bind(this)
                    }}
                />
                <PlayerInfo
                    tabLabel='PROFILE'
                    player={this.player}
                    headerHeight={this.state.height}
                />
                <PlayerLogs
                    tabLabel='GAME LOG'
                    logsSeason={this.state.gameLogSeason}
                    logsPlayoffs={this.state.gameLogPlayoffs}
                    headerHeight={this.state.height}
                />
            </ScrollableTabView>
        );
    }
}