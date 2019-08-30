import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import Collapsible from '../Collapsible/Collapsible';
import Card from '../Card/Card';
import {styles} from './GamesStyles';
import reactotron from 'reactotron-react-native';

const utils = require('../../utilities/helper');

export default class Games extends Component {

    constructor(props) {
        super(props);
        console.log(props.games);
    }

    findTeamLeaders = (teamId) => {
        return this.props.gamesTeamLeaders.find(team => {
            return team[1] == teamId;
        });
    }

    _renderItem = ({item}) => {
        const { gamesTeamLeaders } = this.props;
        // reactotron.log({display: 'gameteamleaders', value: gamesTeamLeaders});
        const hTeam = item.hTeam;
        const vTeam = item.vTeam;
        const hTeamInfo = utils.getTeam(item.hTeam);
        const vTeamInfo = utils.getTeam(item.vTeam);
        const hTeamImage = utils.getTeamImage(hTeamInfo.tricode);
        const vTeamImage = utils.getTeamImage(vTeamInfo.tricode);
        const hTeamIsWinner = utils.isWinner(hTeam.score, vTeam.score);
        const gameTime = utils.getGameTime(item.statusNum, item.clock, item.period, item.startTimeUTC);
        return (
            <Collapsible
                nav={this.props.nav}
                date={this.props.date}
                status={item.statusNum}
                hTeam={hTeamInfo}
                vTeam={vTeamInfo}
                hTeamScore={item.hTeam}
                vTeamScore={item.vTeam}
                hTeamImage={hTeamImage}
                vTeamImage={vTeamImage}
                hTeamIsWinner={hTeamIsWinner}
                gameTime={gameTime}
                gameId={item.gameId}
                nugget={item.nugget}
                clock={item.clock}
                period={item.period}
                isCollapsible={true}
                hTeamLeaders={ gamesTeamLeaders ? this.findTeamLeaders(hTeam.teamId) : null}
                vTeamLeaders={ gamesTeamLeaders ? this.findTeamLeaders(vTeam.teamId) : null}
            />
        )
    }

    _renderItemSeparator = () => {
        return (
            <View style={styles.itemDivider}></View>
        );
    }

    render() {
        return (
            <Card
                title='Games'
                subtitle='Daily Leaders'>
                <FlatList
                    ItemSeparatorComponent={this._renderItemSeparator}
                    data={this.props.games}
                    keyExtractor={item => item.gameId}
                    renderItem={this._renderItem}/>
            </Card>
        );
    }
}
