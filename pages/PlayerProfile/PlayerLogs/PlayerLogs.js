import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './PlayerLogsStyles';
import Card from '../../../components/Card/Card';
import * as utils from '../../../utilities/helper';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import MyText from '../../../components/MyText/MyText';
const fontScale = DeviceInfo.getFontScale();
const PLAYER_WIDTH = { width: 150 * fontScale };
const MIN_WIDTH = { width: 45 * fontScale };
const NORMAL_WIDTH = { width: 43 * fontScale };
const PERCENT_WIDTH = { width: 50 * fontScale };
import moment from 'moment';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';

export default class PlayerLogs extends Component {

    constructor(props){
        super(props);
        this.state = {
            showShadow: false,
            selected: 0
        }
    }

    componentDidMount() {
        const { logsSeason, logsPlayoffs } = this.props;
        if(logsSeason){
            this.setState({ data: logsSeason });
        }
    }

    handleScroll = (e) => {
        if(e.nativeEvent.contentOffset.x == 0 ) {
            this.setState({ showShadow: false });
        } else {
            this.setState({ showShadow: true });
        }
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

    _renderGames = (player) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.circle, { backgroundColor: player[5] == 'W' ? '#49D861' : '#E1233B'}]}>
                    <MyText weight={700} style={styles.win}>{player[5]}</MyText>
                </View>
                <MyText 
                    weight={500}
                    numberOfLines={1} 
                    style={[styles.playerName, {fontWeight: player.isOnCourt ? 'bold' : null}]}>
                        {moment(player[3], 'MMM DD, YYYY').format('MMM DD')} {player[4].substring(3)}
                </MyText>
            </View>
        );
    }

    _renderStats = (player) => {
        return (
            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#333' }}>
                <MyText style={[styles.tableData, MIN_WIDTH]}>{player[6]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[24]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[18]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[19]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[20]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[21]}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player[7]}/{player[8]}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{(player[9]*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player[10]}/{player[11]}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{(player[12]*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player[13]}/{player[14]}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{(player[15]*100).toFixed(1)}%</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player[16]}</MyText>
                <MyText style={[styles.tableData, PERCENT_WIDTH]}>{player[17]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[22]}</MyText>
                <MyText style={[styles.tableData, NORMAL_WIDTH]}>{player[25]}</MyText>
            </View>
        )
    }

    render() {
        const { headerHeight, logsSeason, logsPlayoffs } = this.props
        if(!logsSeason || !logsPlayoffs) {
            return <Loading/>
        }
        return (
            <ScrollView
                contentContainerStyle={{ paddingTop: headerHeight + 5, paddingHorizontal: 5 }} 
                style={styles.container}>
                    <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                        <Card>
                            <View style={styles.segmentContainer}>
                                <Button 
                                    style={{marginRight: 20}} 
                                    active={this.state.selected == 0}
                                    text='Regular Season' 
                                    handlePress={() => this.setState({ data: logsSeason, selected: 0 })}/>
                                <Button 
                                    active={this.state.selected == 1}
                                    text='Playoffs' 
                                    handlePress={() => this.setState({ data: logsPlayoffs, selected: 1})}/>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[styles.playerContainer, PLAYER_WIDTH]}>
                                    <MyText weight={700} style={[styles.tableHeader, { textAlign: 'left' }]}>GAME</MyText>
                                    <FlatList
                                        data={this.state.data}
                                        extraData={this.state.data}
                                        keyExtractor={(item) => item.personId}
                                        renderItem={({item}) => this._renderGames(item)}/>
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
                                        data={this.state.data}
                                        extraData={this.state.data}
                                        keyExtractor={(item) => item.personId}
                                        renderItem={({item}) => this._renderStats(item)}/>
                                </ScrollView>
                            </View>
                        </Card>
                    </View>
            </ScrollView>
        );
    }
}