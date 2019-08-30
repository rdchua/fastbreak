import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './LastGameStyles';
import MyText from '../MyText/MyText';
import { FlatList } from 'react-native-gesture-handler';
import reactotron from 'reactotron-react-native';

export default class LastGame extends Component {

    isWinner(game) {
        if(game.isHomeTeam) {
            return game.hTeam.score > game.vTeam.score ? true : false;
        } else {
            return game.vTeam.score > game.hTeam.score ? true : false;
        }
    }

    _renderCircle = ({item})  => {
        const backgroundColor = this.isWinner(item) ? '#49D861' : '#E1233B';
        const value = this.isWinner(item) ? 'W' : 'L';
        return (
            <View style={[styles.circle, { backgroundColor: backgroundColor }]}>
                <MyText weight={700} style={styles.win}>{value}</MyText>
            </View>
        )
    }

    render() {
        const { games } = this.props;
        reactotron.log(games);
        return (
            <View style={styles.container}>
                <MyText weight={600} style={styles.teamName}>BOS</MyText>
                <FlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
                    horizontal={true}
                    data={games}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderCircle}/>
                <MyText style={[styles.teamName, { textAlign: 'right' }]}>2/5</MyText>
            </View>
        );
    }
}