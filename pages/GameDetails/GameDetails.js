import React, { Component } from 'react';
import { ScrollView, View, StatusBar, Image, Animated } from 'react-native';
import { styles } from './GameDetailsStyles';
import * as api from './../../api/data_nba_endpoints';
import * as theme from './../../Theme';
/**
 * import custom components here
 */
import ScrollableTabView, { GameStatsTabBar } from 'react-native-scrollable-tab-view';
import GameStats from '../GameStats/GameStats';
import Boxscore from '../Boxscore/Boxscore';
import PlayByPlay from '../PlayByPlay/PlayByPlay';
import GameFeed from '../GameFeed/GameFeed';
import Loading from '../../components/Loading/Loading';
import MyText from '../../components/MyText/MyText';
import reactotron from 'reactotron-react-native';

export default class GameDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pbpLoading: true,
            scrollY: new Animated.Value(0),
            opacity: new Animated.Value(0),
            headerHeight: 0,
            childHeight: 0,
            animationSet: false
        }
        this.animatedValue = new Animated.Value(0);
        this.offset = 0;
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldState.headerHeight != 0 && !oldState.animationSet) {
            this.props.navigation.setParams({
                animatedValue: this.animatedValue.interpolate({
                    inputRange: [0, this.state.headerHeight],
                    outputRange: [25, 0],
                    extrapolate: "clamp"
                }),
                animatedOpacity: this.animatedValue.interpolate({
                    inputRange: [0, this.state.headerHeight],
                    outputRange: [0, 1],
                    extrapolate: "clamp"
                })
            });
            this.setState({ animationSet: true });
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const translateY = params.animatedValue;
        const transform = [{ translateY }];
        reactotron.log(params.animatedOpacity)
        return {
            headerTitle: (
                <Animated.View style={[styles.header, transform, { opacity: params.animatedOpacity ? params.animatedOpacity : 0 }]}>
                    <Image style={styles.teamImage} source={params.hTeamImage}/>
                    {/* <MyText weight={700} style={styles.score}>{params.hTeam.tricode}</MyText> */}
                    <MyText weight={700} style={styles.score}>{params.hTeamScore.score  }</MyText>
                    <MyText weight={700} style={styles.clock}>FINAL</MyText>
                    <MyText weight={700} style={styles.score}>{params.vTeamScore.score}</MyText>
                    {/* <MyText weight={700} style={styles.score}>{params.vTeam.tricode}</MyText> */}
                    <Image style={styles.teamImage} source={params.vTeamImage}/>
                </Animated.View>
            ),
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                elevation: 0,
                backgroundColor: theme.cardBgColor,
            },
            headerTintColor: '#fff',
        };
    };

    componentDidMount() {
        this.setState({ loading: true });
        this.fetchStats();
    }

    fetchStats() {
        const params = this.props.navigation.state.params;
        fetch(api.BOXSCORE(params.date, params.gameId))
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    gameData: data.basicGameData,
                    gameStats: data.stats,
                    previousMatchup: data.previousMatchup,
                    loading: false
                });
            })
            .catch((err) => {
                this.refs.toast.show('Error fetching data. Check network connection.', DURATION.LENGTH_LONG);
            }); 
    }

    handleTabChange = (tabIndex, scrollOpacity) => {
        if(tabIndex != 0) {
            Animated.timing(this.state.scrollY, { 
                toValue: this.state.headerHeight,
                duration: 200,
                useNativeDriver: true 
            }).start();
            Animated.timing(this.animatedValue, { 
                toValue: this.state.headerHeight,
                duration: 200,
                useNativeDriver: true 
            }).start();
        } else {
            Animated.timing(this.state.scrollY, { 
                toValue: -(this.state.headerHeight - 35),
                duration: 200,
                useNativeDriver: true 
            }).start();
            Animated.timing(this.animatedValue, { 
                toValue: -(this.state.headerHeight - 35),
                duration: 200,
                useNativeDriver: true 
            }).start();
        }
    }

    handleNavigation = (isHomeTeam) => {
        const { params } = this.props.navigation.state;
        let parameters;
        if(isHomeTeam) {
            parameters = {
                team: params.hTeam,
                teamImage: params.hTeamImage,
                navigation: this.props.navigation
            }
        } else {
            parameters = {
                team: params.vTeam,
                teamImage: params.vTeamImage,
                navigation: this.props.navigation
            }
        }
        this.props.navigation.navigate('TeamProfile', parameters);
    }

    /**
     * Functions related to the header of the scrollable tab view starts here.
     */

    setHeaderHeight = (tabBarHeight) => {
        this.setState({ headerHeight: tabBarHeight });
    }

    setChildHeight = height => {
        this.setState({ childHeight: height });
    };

    onContentScroll = event => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
        );
        this.animatedValue.setValue(event.nativeEvent.contentOffset.y);
    }

    render() {
        const params = this.props.navigation.state.params;
        const translateY = this.state.scrollY.interpolate({
            inputRange: [0, this.state.headerHeight],
            outputRange: [0, -(this.state.headerHeight - 35)],
            extrapolate: "clamp"
        });
        const scrollOpacity = this.state.scrollY.interpolate({
            inputRange: [0, this.state.headerHeight],
            outputRange: [1, 0],
            extrapolate: "clamp"
        });
        const transform = [{ translateY }];
        if(this.state.loading) {
            return (<Loading/>)
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor={theme.cardBgColor}/>
                <ScrollableTabView
                    initialPage={0}
                    style={{ marginTop: -10 }}
                    onChangeTab={(event)=>{this.handleTabChange(event.i, scrollOpacity)}}
                    tabBarPosition='top'
                    tabBarActiveTextColor='white'
                    tabBarBackgroundColor={theme.cardBgColor}
                    tabBarUnderlineStyle={{ backgroundColor: '#1988F4', height: 2, borderRadius: 9 }}
                    tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                    prerenderingSiblingsNumber={2}
                    tabBarTextStyle={{
                        fontSize: 12, 
                        letterSpacing: 0.7,
                        marginTop: 10
                    }}
                    renderTabBar={() => 
                        <GameStatsTabBar
                            hTeam={params.hTeam}
                            vTeam={params.vTeam}
                            hTeamImage={params.hTeamImage}
                            vTeamImage={params.vTeamImage}
                            hTeamScore={params.hTeamScore}
                            vTeamScore={params.vTeamScore}
                            clock={'4:23'} //params.clock
                            period={params.period}
                            style={{ transform }}
                            headerStyle={{ opacity: scrollOpacity }}
                            handleNavigation={this.handleNavigation}
                            setHeaderHeight={this.setHeaderHeight.bind(this)}
                            backgroundColor='#121314' />}>
                            <GameStats
                                tabLabel="STATS"
                                params={params}
                                navigation={this.props.navigation}
                                gameData={this.state.gameData}
                                gameStats={this.state.gameStats}
                                previousMatchup={this.state.previousMatchup}
                                headerHeight={this.state.headerHeight}
                                scrollY={this.state.scrollY}
                                setChildHeight={this.setChildHeight.bind(this)}
                                handleScroll={this.onContentScroll.bind(this)}/>
                            <Boxscore
                                navigation={this.props.navigation}
                                tabLabel="BOX SCORE"
                                params={params}
                                gameStats={this.state.gameStats}
                                headerHeight={this.state.headerHeight}/>
                            <PlayByPlay
                                tabLabel="PLAY-BY-PLAY"
                                params={params}
                                handleScroll={this.onContentScroll}/>
                            <GameFeed
                                tabLabel="FEED"
                                params={params}
                                handleScroll={this.onContentScroll} />
                </ScrollableTabView>
            </ScrollView>
        );
    }
}