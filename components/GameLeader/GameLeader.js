import React, { Component } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { styles } from './GameLeaderStyles';
import * as api from './../../api/data_nba_endpoints';
import MyText from '../../components/MyText/MyText'

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
                            <MyText style={styles.playerName}>{player.firstName} {player.lastName}</MyText>
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <MyText weight={700} style={styles.statValue}>{player.points}</MyText>
                                    <MyText style={styles.statName}>PTS</MyText>
                                </View>
                                <View style={styles.stat}>
                                    <MyText weight={700} style={styles.statValue}>{player.totReb}</MyText>
                                    <MyText style={styles.statName}>REB</MyText>
                                </View>
                                <View style={styles.stat}>
                                    <MyText weight={700} style={styles.statValue}>{player.assists}</MyText>
                                    <MyText style={styles.statName}>AST</MyText>
                                </View>
                                <View style={styles.stat}>
                                    <MyText weight={700} style={styles.statValue}>{player.steals}</MyText>
                                    <MyText style={styles.statName}>STL</MyText>
                                </View>
                                <View style={styles.stat}>
                                    <MyText weight={700} style={[styles.statValue, {borderWidth: 0}]}>{player.blocks}</MyText>
                                    <MyText style={styles.statName}>BLK</MyText>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.team}>
                        <Image source={teamImage} style={styles.teamImage}/>
                    </View> */}
                </View>
            </View>
        );
    }
}