import React, { Component } from 'react';
import { ScrollView, View, StatusBar, Image, Text } from 'react-native';
import { styles } from './GameDetailsStyles';
import * as api from './../../api/data_nba_endpoints';

/**
 * import custom components here
 */
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import GameStats from '../GameStats/GameStats';
import Boxscore from '../Boxscore/Boxscore';
import PlayByPlay from '../PlayByPlay/PlayByPlay';
import GameFeed from '../GameFeed/GameFeed';
import Loading from '../../components/Loading/Loading';
import MyText from '../../components/MyText/MyText';

export default class GameDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pbpLoading: true,
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        console.log(params);
        return {
            headerTitle: (
                <View style={styles.header}>
                    {/* <Image style={styles.teamImage} source={params.hTeamImage}/> */}
                    <MyText weight={700} style={styles.score}>{params.hTeam.tricode}</MyText>
                    <MyText weight={700} style={styles.score}>{params.hTeamScore.score  }</MyText>
                    <MyText weight={700} style={styles.clock}>FINAL</MyText>
                    <MyText weight={700} style={styles.score}>{params.vTeamScore.score}</MyText>
                    <MyText weight={700} style={styles.score}>{params.vTeam.tricode}</MyText>
                    {/* <Image style={styles.teamImage} source={params.vTeamImage}/> */}
                </View>
            ),
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                elevation: 0,
                backgroundColor: '#1F2022',
                textAlign: 'center',
            },
            headerTitleStyle: {
                flex: 1,
                paddingRight: 50,
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#fff',
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

    onContentScroll= (e) => {
        console.log(e.nativeEvent.contentOffset.y)
    }

    render() {
        const params = this.props.navigation.state.params;
        if(this.state.loading) {
            return (<Loading/>)
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar backgroundColor='#1F2022'/>
                <ScrollableTabView
                    initialPage={0}    
                    page={10}
                    style={{ marginTop: -20 }}
                    tabBarPosition='top'
                    tabBarActiveTextColor='white'
                    tabBarBackgroundColor='#1F2022'
                    tabBarUnderlineStyle={{ backgroundColor: '#1988F4', height: 2, borderRadius: 9 }}
                    tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                    prerenderingSiblingsNumber={2}
                    tabBarTextStyle={{
                        fontSize: 12, 
                        letterSpacing: 0.7,
                        marginTop: 10,
                        // fontFamily: 'SF-Pro-Display-Regular'
                    }}
                    renderTabBar={() => 
                        <ScrollableTabBar
                            style={{ borderColor: '#2f2f2f', borderBottomWidth: 1 }} 
                            backgroundColor='#121314' />}>
                            <GameStats
                                tabLabel="STATS"
                                params={params} 
                                gameData={this.state.gameData}
                                gameStats={this.state.gameStats}
                                previousMatchup={this.state.previousMatchup}
                                handleScroll={this.onContentScroll}/>
                            <Boxscore
                                tabLabel="BOX SCORE"
                                params={params}
                                gameStats={this.state.gameStats}
                                handleScroll={this.onContentScroll}/>
                            <PlayByPlay
                                tabLabel="PLAYS"
                                params={params}
                                handleScroll={this.onContentScroll}/>
                            <GameFeed
                                tabLabel="FEED"
                                params={params} 
                                handleScroll={this.onContentScroll}/>
                </ScrollableTabView>
            </ScrollView>
        );
    }
}