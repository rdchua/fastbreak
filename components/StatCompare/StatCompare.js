import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './StatCompareStyles';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

export default class StatCompare extends Component {

    calculateBarProgress(thisTeam, otherTeam) {
        return `${((parseInt(thisTeam) / (parseInt(thisTeam) + parseInt(otherTeam))) * 100) * 1.1}%`;
    }

    printValue = (val, val2) => {
        if(this.props.isPct) {
            return `${((parseInt(val) / parseInt(val2)) * 100).toFixed(1)}%`;
        }
        return val;
    }

    render() {
        const props = {...this.props}
        return (
            <View style={styles.teamStatsContainer}>
                {/* <View style={styles.teamStatValues}>
                    <Text style={styles.teamStatHome}>{this.printValue(props.hTeamStat, props.hTeamStat2)}</Text>
                    <Text style={styles.teamStatName}>{props.statName}</Text>
                    <Text style={styles.teamStatVisitor}>{this.printValue(props.vTeamStat, props.vTeamStat2)}</Text>
                </View> */}
                <View style={styles.teamStatBarContainer}>
                <Text style={styles.teamStatHome}>{this.printValue(props.hTeamStat, props.hTeamStat2)}</Text>
                    <ProgressBar
                        progress={this.calculateBarProgress(
                            props.hTeamStat,
                            props.vTeamStat
                        )}
                        styles={{ marginHorizontal: 5, alignSelf: 'center' }}
                        position='right'
                        backgroundColor='#333'
                        barColor={props.hTeamColor}/>
                <Text style={styles.teamStatName}>{props.statName}</Text>
                    <ProgressBar
                        progress={this.calculateBarProgress(
                            props.vTeamStat,
                            props.hTeamStat
                        )}
                        styles={{ marginHorizontal: 5, alignSelf: 'center' }}
                        position='left'
                        backgroundColor='#333'
                        barColor={props.vTeamColor}/>

                <Text style={styles.teamStatVisitor}>{this.printValue(props.vTeamStat, props.vTeamStat2)}</Text>
                </View>
            </View>
        );
    }
}