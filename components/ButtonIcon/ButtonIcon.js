import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './ButtonIconStyles';
import Icon from 'react-native-vector-icons/AntDesign'

export default class ButtonIcon extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.style]}>
                <Icon name={this.props.name} size={14} color='gray'/>
            </TouchableOpacity>            
        );
    }
}