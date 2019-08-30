import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import * as api from './../../api/data_nba_endpoints';
import Store from 'react-native-simple-store';

/**
 * Import custom components here
 */
import Header from '../../components/Header/Header';
import ScoreboardPage from '../Scoreboard/Scoreboard';
import moment from 'moment-timezone';
import axios from 'axios';

export default class DailyTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        // this.loadPlayers();
        this.setState({ loading: false });
    }  

    async loadPlayers() {
        const players = await Store.get('players');
        if(!players) {
            axios.get(api.PLAYERS)
                .then((data) => {
                    this.setState({ 
                        players: data.league.standard, 
                        loading: false 
                    });
                });
        } else {
            this.setState({ 
                players: players,
                loading: false 
            });
        }
    }

    render() {
        // const date = moment.tz(moment().startOf('day'), 'America/New_York').format('YYYYMMDD');
        const date = '20190421';
        const navigation = this.props.navigation;
        if(this.state.loading) {
            return(<Text>Loading</Text>)
        }
        return (
            <View style={{ flex: 1 }}>
                <Header/>
                <ScrollableTabView
                    initialPage={1}    
                    page={10}
                    tabBarPosition='top'
                    tabBarActiveTextColor='white'
                    tabBarBackgroundColor='#121314'
                    tabBarUnderlineStyle={{ backgroundColor: '#1988F4', height: 2, borderRadius: 9 }}
                    tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                    prerenderingSiblingsNumber={2}
                    tabBarTextStyle={{
                        fontSize: 12, 
                        letterSpacing: 0.7,
                        marginTop: 10, 
                    }}
                    renderTabBar={() => 
                        <ScrollableTabBar backgroundColor='#121314'/>}>    
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='YESTERDAY'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='YESTERDAY'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='YESTERDAY'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='TODAY'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='TOMORROW'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 06'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 07'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 08'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 09'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 10'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 11'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 12'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 13'/>
                            <ScoreboardPage nav={navigation} date={date} players={this.state.players} tabLabel='JUN 14'/>
                </ScrollableTabView>
            </View>
        );
    }
}
