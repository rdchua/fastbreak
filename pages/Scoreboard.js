import React, {Component} from 'react';
import {ScrollView, Button, StyleSheet} from 'react-native';
import { createAnimatableComponent } from 'react-native-animatable';

/**
 * Import custom components
 */
import ScoreboardCard from '../components/ScoreboardCard';
import NewsCard from '../components/NewsCard';

const AnimatableScoreboardCard = createAnimatableComponent(ScoreboardCard);

export default class Scoreboard extends Component {

    handleViewRef = ref => this.view = ref;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <AnimatableScoreboardCard />
                {/* <NewsCard/> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121314',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
});

