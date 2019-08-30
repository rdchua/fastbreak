import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { styles } from './ReportCardStyles';
import MyText from '../MyText/MyText';

export default class ReportCard extends Component {
    render() {
        const { image, title, style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Image source={{ uri: image }} style={styles.image}/>
                <MyText weight={500} numberOfLines={3} style={styles.title}>{title}</MyText>
            </View>            
        );
    }
}