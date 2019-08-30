import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './ButtonStyles';
import MyText from '../MyText/MyText';

export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = {...this.props}
        return (
            <TouchableOpacity style={[styles.button, props.style, {
                backgroundColor: this.props.active ?  '#178cff' : '#2B2C2E',
                borderWidth: this.props.active ? 0 : 1,
                borderColor: this.props.active ? null : '#343639'}]} onPress={props.handlePress}>
                <MyText 
                    style={[styles.text, {color: 'white'}]}
                    weight={this.props.active ? 700 : 500}>{props.text}</MyText>
            </TouchableOpacity>
        );
    }
}