import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Animated } from 'react-native';
import { styles } from './BoxscoreStyles';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScale();
/**
 * Import custom components here
 */
import Card from './../../components/Card/Card';
import Button from './../../components/Button/Button';
import MyText from './../../components/MyText/MyText';

const PLAYER_WIDTH = { width: 150 * fontScale };
const MIN_WIDTH = { width: 45 * fontScale };
const NORMAL_WIDTH = { width: 43 * fontScale };
const PERCENT_WIDTH = { width: 50 * fontScale };

export default class Boxscore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            homeSelected: true,
            showShadow: false,
            list: null
        };
        this.separateTeams(this.props.gameStats.activePlayers);
    }

    separateTeams(players) {
        const { params } = this.props;
        let hTeam = [];
        let vTeam = [];
        players.forEach(player => {
            if(player.teamId == params.hTeam.teamId) {
                hTeam.push(player);
            } else if(player.teamId == params.vTeam.teamId) {
                vTeam.push(player);
            }
        });
        this.state.hTeam = hTeam;
        this.state.vTeam = vTeam;
        this.state.list = hTeam; //set default list to be home team
    }

    _renderPlayerNames = (player) => {
        return (
            <MyText 
                weight={500}
                numberOfLines={1} 
                style={[styles.playerName, {fontWeight: player.isOnCourt ? 'bold' : null}]}>
                    {player.firstName.charAt(0)}. {player.lastName}
                    {
                        player.isOnCourt ? 
                        <MyText style={styles.playerPos}> ({player.pos})</MyText> : null
                    }
            </MyText>
        );
    }

    _renderTableHeaderStats = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <MyText weight={700} style={[styles.tableHeader, MIN_WIDTH]}>MIN</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>PTS</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>REB</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>AST</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>STL</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>BLK</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>FG</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>FG%</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>3P</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>3P%</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>FT</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>FT%</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>OREB</MyText>
                <MyText weight={700} style={[styles.tableHeader, PERCENT_WIDTH]}>DREB</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>TO</MyText>
                <MyText weight={700} style={[styles.tableHeader, NORMAL_WIDTH]}>+/-</MyText>
            </View>
        )
    }

    _renderStats = (player) => {
        return (
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#333' }}>
                <MyText style={[styles.tableData, MIN_WIDTH]}>{player.min}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.points}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.totReb}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.assists}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.steals}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.blocks}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player.fgm}/{player.fga}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{((player.fgm/player.fga)*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player.tpm}/{player.tpa}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{((player.tpm/player.tpa)*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player.ftm}/{player.fta}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{((player.ftm/player.fta)*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player.offReb}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player.defReb}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.turnovers}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player.plusMinus}</MyText>
            </View>
        )
    }

    __renderSeparator = () => {
        return <View style={styles.itemSeparator}></View>
    }

    handleScroll = (e) => {
        if(e.nativeEvent.contentOffset.x == 0 ) {
            this.setState({ showShadow: false });
        } else {
            this.setState({ showShadow: true });
        }
    }

    changeTeams(team) {
        if(team == 0) {
            this.setState({ list: this.state.hTeam, homeSelected: !this.state.homeSelected });
        } else {
            this.setState({ list: this.state.vTeam, homeSelected: !this.state.homeSelected });
        }
    }

    render() {
        if(this.props.loading) {
            return <Loading/>
        }
        const { params } = this.props;
        return (
            <ScrollView
                contentContainerStyle={[styles.contentConainer, { paddingTop: 50 }]}>
                <Card>
                    <View style={styles.segmentContainer}>
                        <Button 
                            style={{marginRight: 20}} 
                            active={this.state.homeSelected}
                            text={`${params.hTeam.tricode} ${params.hTeam.nickname}`} 
                            handlePress={() => this.changeTeams(0)}/>
                        <Button 
                            active={!this.state.homeSelected}
                            text={`${params.vTeam.tricode} ${params.vTeam.nickname}`} 
                            handlePress={() => this.changeTeams(1)}/>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.playerContainer, PLAYER_WIDTH]}>
                            <MyText weight={700} style={[styles.tableHeader, { textAlign: 'left' }]}>PLAYER</MyText>
                            <FlatList
                                data={this.state.list}
                                extraData={this.state.list}
                                keyExtractor={(item) => item.personId}
                                renderItem={({item}) => this._renderPlayerNames(item)}/>
                        </View>
                        {
                            this.state.showShadow ?
                            <LinearGradient
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                                colors={['rgba(18, 19, 20, 0.8)', 'rgba(18, 19, 20, 0)']} 
                                style={styles.shadow}/> : null
                        }
                        <ScrollView horizontal={true} onScroll={this.handleScroll}>
                            <FlatList
                                ListHeaderComponent={this._renderTableHeaderStats}
                                ItemSeparatorComponent={this._renderSeparator}
                                data={this.state.list}
                                extraData={this.state.list}
                                keyExtractor={(item) => item.personId}
                                renderItem={({item}) => this._renderStats(item)}/>
                        </ScrollView>
                    </View>
                </Card>
            </ScrollView>
        );
    }
}