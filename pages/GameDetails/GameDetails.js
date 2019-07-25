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
import Loading from '../../components/Loading/Loading';

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
        return {
            headerTitle: (
                <View style={styles.header}>
                    <Image style={styles.teamImage} source={params.hTeamImage}/>
                    <Text style={styles.score}>111</Text>
                    <Text style={styles.clock}>Q1 11:49</Text>
                    <Text style={styles.score}>111</Text>
                    <Image style={styles.teamImage} source={params.vTeamImage}/>
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
        this.fetchPbp();
    }

    fetchPbp() {
        const params = this.props.navigation.state.params;
        let promises = [];
        for(let i = 1; i <= params.period.maxRegular; i++) {
            promises.push(fetch(api.PBP(params.date, params.gameId, i)));
        }
        Promise.all(promises).then(responses => {
            let pbp = [];
            responses.forEach(async (res) => {
                pbp.push(await res.json());
            });
            this.setState({ pbpLoading: false, pbp: pbp });
        });
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
                    style={{ marginTop: -10 }}
                    tabBarPosition='top'
                    tabBarActiveTextColor='white'
                    tabBarBackgroundColor='#1F2022'
                    tabBarTextStyle={{ paddingRight: 10, paddingLeft: 10 }}
                    tabBarUnderlineStyle={{ backgroundColor: '#1988F4', height: 2, borderRadius: 9 }}
                    tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                    prerenderingSiblingsNumber={2}
                    tabBarTextStyle={{
                        fontSize: 12, 
                        letterSpacing: 0.7,
                        fontWeight: 'bold', 
                        marginTop: 10
                    }}
                    renderTabBar={() => 
                        <ScrollableTabBar
                            style={{ borderColor: '#2f2f2f', borderBottomWidth: 1 }} 
                            backgroundColor='#121314' />}>
                            <GameStats
                                params={params} 
                                gameData={this.state.gameData}
                                gameStats={this.state.gameStats}
                                previousMatchup={this.state.previousMatchup}
                                tabLabel="STATS"/>
                            <Boxscore 
                                params={params}
                                gameStats={this.state.gameStats}
                                tabLabel="BOX SCORE"/>
                            <PlayByPlay
                                loading={this.state.pbpLoading}
                                pbp={this.state.pbp} 
                                tabLabel="PLAYS"/>
                            <GameStats 
                                params={params} 
                                tabLabel="FEED"/>
                </ScrollableTabView>
            </ScrollView>
        );
    }
}