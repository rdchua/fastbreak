import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { styles } from './StatCompareCircleStyles';

export default class StatCompareCircle extends Component {

    hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.15)';
        }
        throw new Error('Bad Hex');
    }

    getPercentage(made, attempted) {
        return (made / attempted) * 100;
    }
    
    render() {
        const props = {...this.props};
        const hTeamPercentage = this.getPercentage(props.hTeamStat, props.hTeamStat2);
        const vTeamPercentage = this.getPercentage(props.vTeamStat, props.vTeamStat2);
        return (
            <View style={styles.container}>
                <View>
                    <AnimatedCircularProgress
                        size={80}
                        width={7}
                        fill={hTeamPercentage}
                        lineCap='round'
                        style={{flex: 1}}
                        rotation={360}
                        tintColor={props.hTeamColor}
                        backgroundColor={this.hexToRgbA(props.hTeamColor)}>
                            {
                                (fill) => (
                                    <Text style={styles.percentage}>{`${hTeamPercentage.toFixed(1)}`}%</Text>
                                )
                            }
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.statNameContainer}>
                    <Text style={styles.statName}>{props.statName}</Text>
                    <Text style={styles.text}>PERCENTAGE</Text>
                </View>
                <View>
                    <AnimatedCircularProgress
                        size={80}
                        width={7}
                        fill={vTeamPercentage}
                        lineCap='round'
                        style={{flex: 1, alignItems: 'flex-end'}}
                        rotation={360}
                        tintColor={props.vTeamColor}
                        backgroundColor={this.hexToRgbA(props.vTeamColor)}>
                            {
                                (fill) => (
                                    <Text style={styles.percentage}>{vTeamPercentage.toFixed(1)}%</Text>
                                )
                            }
                    </AnimatedCircularProgress>
                </View>
            </View>
        );
    }
};