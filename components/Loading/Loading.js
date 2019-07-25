import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './LoadingStyles';
import LottieView from 'lottie-react-native';

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loadingContainer}>
                <LottieView source={require('../../assets/animations/dribble.json')} autoPlay loop style={{ width: 120, height: 120}} />
            </View>
        );
    }
}