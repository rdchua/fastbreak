import React, {Component} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import { styles} from './ScoreboardStyles';
import * as api from '../../api/data_nba_endpoints';
import * as api2 from '../../api/stats_nba_endpoints';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';
import Reactotron from 'reactotron-react-native';
import axios from 'axios';

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
            loading: true,
            isRefreshing: false
        };
        this.fetchData();
    }
    
    fetchData() {
        axios.get(api.SCOREBOARD(this.props.date))
            .then((data) => {
                this.setState({ 
                    games: data.data.games,
                    loading: false
                });
            })
            .catch((err) => {
                Reactotron.log({ display: 'Error fetching scoreboard from data.nba.net', value: err});
                this.refs.toast.show('Error fetching data. Check network connection.', DURATION.LENGTH_LONG);
            });
        const url = api2.SCOREBOARD(moment(this.props.date).format('MM/DD/YYYY'))
        fetch(url, api2.headers)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    gamesHeaders: data.resultSets[0].rowSet,
                    gamesLineScore: data.resultSets[1].rowSet,
                    gamesSeriesStandings: data.resultSets[2].rowSet,
                    gamesLastMeetings: data.resultSets[3].rowSet,
                    gamesTeamLeaders: data.resultSets[7].rowSet,
                    gamesWinProbabilities: data.resultSets[9].rowSet
                });
            })
            .catch((err) => {
                Reactotron.log({ display: 'Error fetching scoreboard from stats.nba.com', value: err});
                this.refs.toast.show('Error fetching data. Check network connection.', DURATION.LENGTH_LONG);
            });
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 2000);
    }

    render() {
        if(this.state.loading) {
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

