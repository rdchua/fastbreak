import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './ProgressBarStyles';

export default class ProgressBar extends Component {

    render() {
        const props = {...this.props};
        return (
            <View style={[styles.container, {
                backgroundColor: props.backgroundColor
            }, props.styles]}>
                <View style={[styles.progress, {
                    backgroundColor: props.barColor,
                    width: props.progress,
                    left: props.position == 'left' ? 0 : null,
                    right: props.position == 'right' ? 0 : null,
                }]}></View>
            </View>
        );
    }
}