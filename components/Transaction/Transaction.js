import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { styles } from './TransactionStyles';
import reactotron from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyText from '../MyText/MyText';
import * as api from './../../api/data_nba_endpoints';
import * as utils from './../../utilities/helper';
import * as theme from './../../Theme';
import moment from 'moment';

export default class Transaction extends Component {

    _renderIcon = (transactionType) => {
        let style, iconName;
        if(transactionType == 'Signing') {
            style = { backgroundColor: '#47D15E' };
            iconName = 'check';
        } else if(transactionType == 'Waive') {
            style = { backgroundColor: '#E7203C' };
            iconName = 'times';
        } else if(transactionType == 'Trade') {
            style = { backgroundColor: theme.accentColor };
            iconName = 'sync-alt'
        } else {
            style = { backgroundColor: '#47D15E' };
            iconName = 'check';
        }
        return (
            <View style={[styles.icon, style]}>
                <Icon name={iconName} size={10} color='white'/>
            </View>
        )
    }

    render() {
        let otherTeam, otherTeamImage;
        const { transaction, player } = this.props;
        const team = utils.getTeam({ teamId: transaction.TEAM_ID });
        const teamImage = utils.getTeamImage(team.tricode);
        if(transaction.Transaction_Type == 'Trade') {
            otherTeam = utils.getTeam({ teamId: transaction.Additional_Sort });
            otherTeamImage = utils.getTeamImage(otherTeam.tricode);
        }
        return (
            <View style={styles.container}>
                <View style={styles.playerContainer}>
                    <Image source={{ uri: api.HEADSHOT(transaction.PLAYER_ID )}} style={styles.playerImage}/>
                    <View style={styles.playerInfo}>
                        <MyText weight={500} style={styles.playerName}>{player.firstName.charAt(0)}. {player.lastName}</MyText>
                        <MyText weight={500} style={styles.transaction}>{transaction.Transaction_Type}</MyText>
                    </View>
                </View>
                <View style={styles.teamContainer}>
                    <View style={styles.teamInfo}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {this._renderIcon(transaction.Transaction_Type)}
                            <MyText weight={500} style={styles.teamName}>{team.nickname}</MyText>
                        </View>
                        <MyText weight={500} style={styles.date}>{moment(transaction.TRANSACTION_DATE).fromNow()}</MyText>
                    </View>
                    {
                        transaction.Transaction_Type == 'Trade' ? 
                        <View style={{width: 60, height: 60}}>
                            <Image source={teamImage} style={[styles.tradeImage, {position: 'absolute', top: 0, left: 0}]}/>
                            <Image source={otherTeamImage} style={[styles.tradeImage, {position: 'absolute', bottom: 0, right: 0}]}/>
                        </View> : 
                        <Image source={teamImage} style={styles.teamImage}/>
                    }
                </View>
            </View>
        );
    }
}