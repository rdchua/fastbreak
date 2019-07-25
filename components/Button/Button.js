import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './ButtonStyles';

export default class Button extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const props = {...this.props}
        return (
            <TouchableOpacity style={[styles.button, props.style, {
                backgroundColor: this.props.active ? props.backgroundColor : '#2B2C2E'
            }]} onPress={props.handlePress}>
                <Text style={[styles.text, {
                    color: this.props.active ? '#fff' : '#888',
                    fontWeight: this.props.active ? 'bold' : null
                }]}>{props.text}</Text>
            </TouchableOpacity>
        );
    }
}