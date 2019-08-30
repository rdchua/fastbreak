import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyText from '../MyText/MyText';
import moment from 'moment';
import { styles } from './ReportStyles';

export default class NewsCard extends Component {
    render() {
        const { title, description, image, link, author, date } = this.props;
        return (
            <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                <View style={styles.contentContainer}>
                    <View style={styles.headline}>
                        <MyText 
                            weight={500}
                            numberOfLines={2}
                            style={styles.headlineValue}>
                                {title.replace('&amp;#039;', "'")}
                        </MyText>
                    </View>
                    {
                        image ?
                        <View style={styles.newsImage}>
                            <Image source={{ uri: image }} style={styles.image}/>
                        </View> : null
                    }
                </View>
                <MyText style={[styles.author, {marginTop: image ? -10:10}]}>{author === '' ? 'NBA' : author} <MyText style={{color: 'gray'}}>
                    • {moment(date, 'YYYY-MM-DD hh:mm:ss').fromNow().replace('ago', '')}</MyText></MyText>
            </View>
        );
    }
}
