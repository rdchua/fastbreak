import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './HeaderStyles'; 

export default class Header extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./../../assets/images/GSW_logo.png')} style={styles.logo}/>
                <TextInput style={styles.input} placeholder="Search" placeholderTextColor='#666'/>
                <Icon name='calendar' color='#666' size={24} style={styles.icon}/>
            </View>
        );
    }
}