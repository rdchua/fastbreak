import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import PlayerLeader from './../components/PlayerLeader';
const utils = require('./../utilities/helper');

export default class PlayerCard extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.leaders);
    }

    _renderItem = (player) => {
        return (
            <PlayerLeader player={player}/>
        )
    }

    _renderItemSeparator = () => {
        return (
            <View style={styles.itemDivider}></View>
        );
    }

    render() {
        return (
            <Animatable.View 
                style={styles.card}
                animation="fadeInUp"
                duration={300}
                delay={100}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>DAILY LEADERS</Text>
                    <Text style={styles.title2}>SEE ALL</Text>
                </View>
                <FlatList
                    ItemSeparatorComponent={this._renderItemSeparator}
                    data={this.props.leaders.pointLeaders}
                    keyExtractor={item => item.PLAYER_ID}
                    renderItem={this._renderItem}/>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f'
    },
    content: {
        paddingVertical: 10,
        borderBottomColor: '#444'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        borderBottomColor: '#444',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    title2: {
        flex: 1,
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5,
        width: 45,
        height: 45,
    },
    playerImage: {
        width: 45,
        height:45,
        borderRadius: 40,
        backgroundColor: '#555'
    },
    team: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        width: 50,
        borderRadius: 9,
        justifyContent: 'flex-end',
    },
    teamImage: {
        height: 50,
        width: 50,
        borderRadius: 9
    },
    playerDetails: {
        marginLeft: 15,
        alignSelf: 'center'
    },
    playerName: {
        color: 'white',
        fontWeight: 'bold'
    },
    playerStat: {
        color: 'gray',
        fontSize: 13
    },
    teamDetails: {
        alignSelf: 'center',
        marginRight: 15
    },
    teamName: {
        textAlign: 'right',
        color: 'white',
        fontWeight: 'bold'
    },
    teamStat: {
        textAlign: 'right',
        color: 'gray',
        fontSize: 13
    },
    itemDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333'
    },
});
