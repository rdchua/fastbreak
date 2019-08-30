import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './StatTrioStyles';
import MyText from '../MyText/MyText';

export default class StatTrio extends Component {

    render() {
        const { stat1, stat1Name, stat2, stat2Name, stat3, stat3Name, stat4, stat4Name} = this.props;
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.statContainer}>
                    <View>
                        <MyText weight={700} style={styles.statValue}>{stat1}</MyText>
                        <MyText style={styles.statName}>{stat1Name}</MyText>
                    </View>
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.statContainer}>
                    <View>
                        <MyText weight={700} style={styles.statValue}>{stat2}</MyText>
                        <MyText style={styles.statName}>{stat2Name}</MyText>
                    </View>
                    <View style={styles.divider}></View>
                </View>
                <View style={styles.statContainer}>
                    <View>
                        <MyText weight={700} style={styles.statValue}>{stat3}</MyText>
                        <MyText style={styles.statName}>{stat3Name}</MyText>
                    </View>
                    <View style={styles.divider}></View>
                </View>
                {
                    stat4 ?
                    <View style={styles.statContainer}>
                        <View>
                            <MyText weight={700} style={styles.statValue}>{stat4}</MyText>
                            <MyText style={styles.statName}>{stat4Name}</MyText>
                        </View>
                    </View> : null
                }
            </View>
        );
    }
}