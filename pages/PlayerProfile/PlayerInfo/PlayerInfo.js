import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './PlayerInfoStyles';
import Card from '../../../components/Card/Card';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import MyText from '../../../components/MyText/MyText';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
import * as utils from '../../../utilities/helper';

export default class PlayerInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: []
        }
        this.getPlayers();
    }

    getPlayers() {
        utils.getPlayers.then(players => {
            this.setState({ players : players })
        })
    }

    render() {
        const { headerHeight, player } = this.props;
        const playerInfo = utils.getPlayer(this.state.players, player.personId);
        reactotron.log(playerInfo)
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingTop: headerHeight + 5, paddingHorizontal: 5 }}>
                    <Card title='info'>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.infoContainer}>
                                <Icon name='calendar' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{moment(playerInfo.dateOfBirthUTC).format("MMM DD YYYY")} ({moment().diff(playerInfo.dateOfBirthUTC, 'years')})</MyText>
                                    <MyText style={styles.infoName}>Birthday (Age)</MyText>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <Icon2 name='running' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.teamSitesOnly ? playerInfo.teamSitesOnly.posFull : playerInfo.pos}</MyText>
                                    <MyText style={styles.infoName}>Position</MyText>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={styles.infoContainer}>
                                <Icon2 name='flag' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.country}</MyText>
                                    <MyText style={styles.infoName}>Country</MyText>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <Icon2 name='school' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.collegeName}</MyText>
                                    <MyText style={styles.infoName}>College</MyText>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={styles.infoContainer}>
                                <Icon2 name='weight' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.weightPounds} lbs</MyText>
                                    <MyText style={styles.infoName}>Weight</MyText>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <Icon2 name='ruler-combined' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.heightFeet}' {playerInfo.heightInches}''</MyText>
                                    <MyText style={styles.infoName}>Height</MyText>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <View style={styles.infoContainer}>
                                <Icon2 name='award' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.yearsPro} lbs</MyText>
                                    <MyText style={styles.infoName}>Years Pro</MyText>
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <Icon2 name='handshake' size={20} color='#aaa' style={{marginRight: 10}}/>
                                <View>
                                    <MyText weight={700} style={styles.infoValue}>{playerInfo.nbaDebutYear}</MyText>
                                    <MyText style={styles.infoName}>NBA Debut</MyText>
                                </View>
                            </View>
                        </View>
                    </Card>
            </ScrollView>
        );
    }
}