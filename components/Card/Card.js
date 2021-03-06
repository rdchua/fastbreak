import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './CardStyles';
import MyText from '../../components/MyText/MyText';

const fadeIn = {
    from: {
      opacity: 0,
      translateY: 10
    },
    to: {
      opacity: 1,
      translateY: 0
    },
};

export default class Card extends React.Component {

    _renderSubTitle = (subtitle) => {
        return subtitle ? <MyText weight={700} style={styles.subtitle}>{this.props.subtitle}</MyText> : null
    }

    _renderTitle = (title, subtitle) => {
        if(title) {
            return (
                <View style={styles.cardTitle}>
                    <MyText weight={700} style={styles.title}>{title}</MyText>
                    {this._renderSubTitle(subtitle)}
                </View>
            )
        } 
        return null;
    }

    render() {
        const props = {...this.props};
        return (
            <Animatable.View
                style={[styles.card, props.style]} 
                animation={fadeIn}
                duration={300}
                delay={100}>
                    {this._renderTitle(props.title, props.subtitle)}
                    <Animatable.View
                        animation={fadeIn}
                        duration={300}
                        delay={100}>
                        {this.props.children}
                    </Animatable.View>
            </Animatable.View>
        );
    }
}