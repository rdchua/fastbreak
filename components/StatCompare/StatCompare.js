import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './StatCompareStyles';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
const utils = require('./../../utilities/helper');

export default class StatCompare extends Component {

    calculateBarProgress(thisTeam, otherTeam) {
        return `${((parseInt(thisTeam) / (parseInt(thisTeam) + parseInt(otherTeam))) * 100) * 1}%`;
    }

    printValue = (val, val2) => {
        if(this.props.isPct) {
            return `${((parseInt(val) / parseInt(val2)) * 100).toFixed(1)}%`;
        }
        return val;
    }

    isLoser(thisTeam, otherTeam) {
        return thisTeam < otherTeam ? true : false
    }

    render() {
        const props = {...this.props}
        return (
            <View style={styles.teamStatsContainer}>
                <View style={styles.teamStatBarContainer}>
                    <View style={styles.statValueRow}>
                        <Text style={styles.teamStatHome}>{this.printValue(props.hTeamStat, props.hTeamStat2)}</Text>
                        <Text style={styles.teamStatName}>{props.statName}</Text>
                        <Text style={styles.teamStatVisitor}>{this.printValue(props.vTeamStat, props.vTeamStat2)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7 }}>
                        <ProgressBar
                            progress={this.calculateBarProgress(
                                props.hTeamStat,
                                props.vTeamStat
                            )}
                            position='right'
                            backgroundColor='#333'
                            barColor={this.isLoser(props.hTeamStat, props.vTeamStat) ? utils.hexToRgba(props.hTeamColor, 1) : props.hTeamColor}/>
                        <View style={{ marginHorizontal: 5 }}></View>
                        <ProgressBar
                            progress={this.calculateBarProgress(
                                props.vTeamStat,
                                props.hTeamStat
                            )}
                            position='left'
                            backgroundColor='#333'
                            barColor={this.isLoser(props.vTeamStat, props.hTeamStat) ? utils.hexToRgba(props.vTeamColor, 1) : props.vTeamColor}/>
                    </View>
                </View>
            </View>
        );
    }
}