import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { styles } from './ReportTextStyles';
import MyText from '../MyText/MyText';
import moment from 'moment';

export default class ReportText extends Component {

    render() {
        const { title, date, description } = this.props;
        return (
            <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                <View style={styles.contentContainer}>
                    {/* <View style={{ width: 40 }}>
                        <MyText style={styles.day}>{moment(date, 'MM/DD/YYYY HH:mm:ss A').format('DD')}</MyText>
                        <MyText style={[styles.day, { color: 'gray' }]}>{moment(date, 'MM/DD/YYYY HH:mm:ss A').format('MMM')}</MyText>
                    </View> */}
                    <View style={styles.headline}>
                        <MyText 
                            weight={700}
                            // numberOfLines={2}
                            style={styles.headlineValue}>
                                {title}
                        </MyText>
                        <MyText 
                            style={styles.description}>
                                {description}
                        </MyText>
                    </View>
                </View>
            </View>
        );
    }
}