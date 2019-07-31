import React, { Component } from 'react';
import { Text } from 'react-native';
import './TextStyles.js';

export default class MyText extends Component {

    // { fontWeight: '100' }, // Thin
    // { fontWeight: '200' }, // Ultra Light
    // { fontWeight: '300' }, // Light
    // { fontWeight: '400' }, // Regular
    // { fontWeight: '500' }, // Medium
    // { fontWeight: '600' }, // Semibold
    // { fontWeight: '700' }, // Bold
    // { fontWeight: '800' }, // Heavy
    // { fontWeight: '900' }, // Black

    getFontStyles(weight) {
        let font;
        switch (weight) {
            case 500:
                font = this.props.italic ? 'SF-Pro-Display-MediumItalic' : 'SF-Pro-Display-Medium';
                break;
            case 600:
                font = this.props.italic ? 'SF-Pro-Display-SemiboldItalic' : 'SF-Pro-Display-Semibold';
                break;
            case 700:
                font = this.props.italic ? 'SF-Pro-Display-BoldItalic' : 'SF-Pro-Display-Bold';
                break;
            default:
                font = this.props.italic ? 'SF-Pro-Display-RegularItalic' : 'SF-Pro-Display-Regular'
                break;
        }
        return {
            fontFamily: font,
        }
    }

    render() {
        const props = {...this.props};
        return (
            <Text style={[this.getFontStyles(props.weight), props.style]}>{props.children}</Text>
        );
    }
}