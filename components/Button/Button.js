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
            <TouchableOpacity style={[styles.button, props.style]} onPress={props.handlePress}>
                <MyText 
                    style={[
                        styles.text, 
                        {
                            color: this.props.active ? this.props.color ? this.props.color : 'white' : '#888',
                        }
                    ]}
                    weight={this.props.active ? 700 : 500}>{props.text}</MyText>
            </TouchableOpacity>
        );
    }
}