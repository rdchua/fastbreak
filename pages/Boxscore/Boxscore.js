import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from './BoxscoreStyles';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
const fontScale = DeviceInfo.getFontScale();
/**
 * Import custom components here
 */
import Card from './../../components/Card/Card';
import Button from './../../components/Button/Button';

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
            <Text 
                numberOfLines={1} 
                style={[styles.playerName, {fontWeight: player.isOnCourt ? 'bold' : null}]}>
                    {player.firstName.charAt(0)}. {player.lastName}
                    {
                        player.isOnCourt ? 
                        <Text style={styles.playerPos}> ({player.pos})</Text> : null
                    }
            </Text>
        );
    }

    _renderTableHeaderStats = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableHeader, MIN_WIDTH]}>MIN</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>PTS</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>REB</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>AST</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>STL</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>BLK</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>FG</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>FG%</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>3P</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>3P%</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>FT</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>FT%</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>OREB</Text>
                <Text style={[styles.tableHeader, PERCENT_WIDTH]}>DREB</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>TO</Text>
                <Text style={[styles.tableHeader, NORMAL_WIDTH]}>+/-</Text>
            </View>
        )
    }

    _renderStats = (player) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.tableData, MIN_WIDTH]}>{player.min}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.points}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.totReb}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.assists}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.steals}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.blocks}</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{player.fgm}/{player.fga}</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{((player.fgm/player.fga)*100).toFixed(1)}%</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{player.tpm}/{player.tpa}</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{((player.tpm/player.tpa)*100).toFixed(1)}%</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{player.ftm}/{player.fta}</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{((player.ftm/player.fta)*100).toFixed(1)}%</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{player.offReb}</Text>
                <Text style={[styles.tableData, PERCENT_WIDTH]}>{player.defReb}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.turnovers}</Text>
                <Text style={[styles.tableData, NORMAL_WIDTH]}>{player.plusMinus}</Text>
            </View>
        )
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
            <ScrollView contentContainerStyle={styles.contentConainer}>
                <Card>
                    <View style={styles.segmentContainer}>
                        <Button 
                            style={{marginRight: 20}} 
                            active={this.state.homeSelected}
                            text={`${params.hTeam.tricode} ${params.hTeam.nickname}`} 
                            handlePress={() => this.changeTeams(0)}
                            backgroundColor={params.hTeam.primaryColor}/>
                        <Button 
                            active={!this.state.homeSelected}
                            text={`${params.vTeam.tricode} ${params.vTeam.nickname}`} 
                            handlePress={() => this.changeTeams(1)}
                            backgroundColor={params.vTeam.primaryColor}/>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.playerContainer, PLAYER_WIDTH]}>
                            <Text style={[styles.tableHeader, { textAlign: 'left' }]}>PLAYER</Text>
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