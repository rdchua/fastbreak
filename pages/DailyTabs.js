import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import Store from 'react-native-simple-store';

/**
 * Import custom components here
 */
import ScoreboardPage from '../pages/Scoreboard';
import moment from 'moment-timezone';

export default class DailyTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.loadPlayers();
    }  

    async loadPlayers() {
        const players = await Store.get('players');
        if(!players) {
            const response = await fetch('http://data.nba.net/prod/v1/2018/players.json');
            const data = await response.json();
            Store.push('players', data.league.standard);
            this.setState({ 
                players: data.league.standard, 
                loading: false 
            });
        } else {
            this.setState({ 
                players: players[0],
                loading: false 
            });
        }
    }

    render() {
        const date = moment.tz(moment().startOf('day'), 'America/New_York').format('YYYYMMDD');
        if(this.state.loading) {
            return(<Text>Loading</Text>)
        }
        return (
            <View style={{ flex: 1 }}>
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
                        fontWeight: 'bold', 
                        marginTop: 10, 
                        fontFamily: ''
                    }}
                    renderTabBar={() => 
                        <ScrollableTabBar
                            backgroundColor='#121314'
                        />}>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='YESTERDAY'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='TODAY'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='TOMORROW'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 06'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 07'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 08'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 09'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 10'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 11'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 12'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 13'/>
                            <ScoreboardPage date={'20190404'} players={this.state.players} tabLabel='JUN 14'/>
                </ScrollableTabView>
            </View>
        );
    }
}
