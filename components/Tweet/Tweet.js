import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { styles } from './TweetStyles';
import moment from 'moment';
const screenWidth = Dimensions.get('window').width;

import MyText from './../MyText/MyText';

export default class Tweet extends Component {

    getImageDimension(tweet) {
        return {
            width: '100%', 
            height: screenWidth * (tweet.extended_entities.media[0].sizes.small.h / tweet.extended_entities.media[0].sizes.small.w)
        }
    }

    renderMedia = (tweet) => {
        return (
            <View style={styles.mediaContainer}>
                {
                    tweet.extended_entities.media[0].type == 'photo' ?
                    <Image 
                        resizeMode='cover' 
                        style={[this.getImageDimension(tweet), styles.image]} 
                        source={{ uri: tweet.extended_entities.media[0].media_url_https }}/> : null
                }
            </View>
        )
    }

    render() {
        const { tweet } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.tweetInfo}>
                    <Image resizeMode='cover' style={styles.userImage} source={{ uri: tweet.user.profile_image_url_https }}/>
                    <View>
                        <MyText weight={600} style={styles.userName}>{tweet.user.name}</MyText>
                        <MyText style={styles.createdAt}>{moment(tweet.create_at).fromNow()}</MyText>
                    </View>
                </View>
                {tweet.extended_entities ? this.renderMedia(tweet) : null}
                <View style={styles.tweetBody}>
                    <MyText weight={400} style={styles.tweetBody}>{tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace('&amp;', '')}</MyText>
                </View>
            </View>
        );
    }
}