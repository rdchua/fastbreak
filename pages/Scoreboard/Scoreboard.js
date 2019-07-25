import React, {Component} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import { styles} from './ScoreboardStyles';
import * as api from '../../api/data_nba_endpoints';
import * as api2 from '../../api/stats_nba_endpoints';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';

/**
 * Import custom components
 */
import Games from '../../components/Games/Games';
import PullToRefresh from 'react-native-pull-refresh';
import Loading from '../../components/Loading/Loading';

export default class Scoreboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
        this.fetchData();
    }
    
    fetchData() {
        Promise.all([
            fetch(api.SCOREBOARD(this.props.date))
                .then((response) => response.json()),
            fetch(api2.SCOREBOARD(moment(this.props.date).format('MM/DD/YYYY')), api2.headers)
                .then((response) => response.json())
        ]).then(([api1, api2]) => {
            this.setState({
                games: api1.games,
                gamesHeaders: api2.resultSets[0].rowSet,
                gamesLineScore: api2.resultSets[1].rowSet,
                gamesSeriesStandings: api2.resultSets[2].rowSet,
                gamesLastMeetings: api2.resultSets[3].rowSet,
                gamesTeamLeaders: api2.resultSets[7].rowSet,
                gamesWinProbabilities: api2.resultSets[9].rowSet,
                loading: false 
            });
        }).catch((err) => {
            this.refs.toast.show('Error fetching data. Check network connection.', DURATION.LENGTH_LONG);
            console.log(err)
        });
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 2000);
    }

    render() {
        const { games } = this.state;
        if(!games) {
            return (<Loading/>)
        }
        return (
            <View style={{flex: 1}}>
            <PullToRefresh
                isRefreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                animationBackgroundColor = {'#121314'}
                pullHeight={120}
                contentView={
                    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                        <Toast
                            ref="toast"
                            style={styles.toast}
                            position='bottom'
                            positionValue={200}
                            fadeInDuration={750}
                            fadeOutDuration={1000}
                            opacity={1}
                            textStyle={styles.toastText}
                        />  
                        <StatusBar backgroundColor='#121314' barStyle='light-content'/>
                        <Games 
                            nav={this.props.nav} 
                            date={this.props.date}
                            games={this.state.games}
                            gamesHeaders={this.state.gamesHeaders}
                            gamesLinescores={this.state.gamesLineScore}
                            gamesSeriesStandings={this.state.gamesSeriesStandings}
                            gamesTeamLeaders={this.state.gamesTeamLeaders}
                            gamesWinProbabilities={this.state.gamesWinProbabilities}
                        />
                    </ScrollView>
                }
                onPullAnimationSrc ={require('../../assets/animations/dribble.json')}
                onStartRefreshAnimationSrc ={require('../../assets/animations/dribble.json')}
                onRefreshAnimationSrc = {require('../../assets/animations/dribble.json')}
                onEndRefreshAnimationSrc = {require('../../assets/animations/dribble.json')}
            />
                
            </View>
        );
    }
}

