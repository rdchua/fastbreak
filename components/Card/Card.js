import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from './CardStyles';

export default class Card extends React.Component {

    _renderSubTitle = (subtitle) => {
        return subtitle ? <Text style={styles.subtitle}>{this.props.subtitle}</Text> : null
    }

    _renderTitle = (title, subtitle) => {
        if(title) {
            return (
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>{title}</Text>
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
                animation="fadeInUp"
                duration={300}
                delay={100}>
                    {this._renderTitle(props.title, props.subtitle)}
                    <Animatable.View
                        animation="fadeInUp"
                        duration={300}
                        delay={100}>
                        {this.props.children}
                    </Animatable.View>
            </Animatable.View>
        );
    }
}