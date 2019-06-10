import React, {Component} from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import { createAnimatableComponent } from 'react-native-animatable';

/**
 * Import custom components
 */
import ScoreboardCard from '../components/ScoreboardCard';
import PlayerCard from '../components/PlayerCard';
import NewsCard from '../components/NewsCard';

const AnimatableScoreboardCard = createAnimatableComponent(ScoreboardCard);
import PullToRefresh from 'react-native-pull-refresh';

export default class Scoreboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.setState({isRefreshing: false});
        }, 2000);
    }

    render() {
        return (
            <PullToRefresh
                isRefreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                animationBackgroundColor = {'#121314'}
                pullHeight={120}
                contentView={
                    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>    
                        <StatusBar backgroundColor='#121314' barStyle='light-content'/>
                        <AnimatableScoreboardCard />
                        <PlayerCard/>
                        {/* <NewsCard/> */}
                    </ScrollView>
                }
                onPullAnimationSrc ={require('../assets/animations/dribble.json')}
                onStartRefreshAnimationSrc ={require('../assets/animations/dribble.json')}
                onRefreshAnimationSrc = {require('../assets/animations/dribble.json')}
                onEndRefreshAnimationSrc = {require('../assets/animations/dribble.json')}
            />
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 30,
        paddingHorizontal: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#121314',
        paddingVertical: 10
    },
});

