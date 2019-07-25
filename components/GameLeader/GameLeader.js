import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { styles } from './GameLeaderStyles';
import * as api from './../../api/data_nba_endpoints'

export default class GameLeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { player, teamColor, teamImage } = this.props;
        return (
            <View style={[styles.content, this.props.style]}>
                <View style={styles.contentContainer}>
                    <View style={styles.player}>
                        <View style={styles.playerImageContainer}>
                            <Image source={{ uri: api.HEADSHOT(player.personId) }} style={[styles.playerImage, {backgroundColor: teamColor}]}/>
                        </View>
                        <View style={styles.playerDetails}>
                            <Text style={styles.playerName}>{player.firstName} {player.lastName}</Text>
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>{player.points}</Text>
                                    <Text style={styles.statName}>PTS</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>{player.totReb}</Text>
                                    <Text style={styles.statName}>REB</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>{player.assists}</Text>
                                    <Text style={styles.statName}>AST</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>{player.steals}</Text>
                                    <Text style={styles.statName}>STL</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>{player.blocks}</Text>
                                    <Text style={styles.statName}>BLK</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.team}>
                        <Image source={teamImage} style={styles.teamImage}/>
                    </View>
                </View>
            </View>
        );
    }
}