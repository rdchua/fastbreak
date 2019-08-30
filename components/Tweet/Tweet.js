import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { styles } from './TweetStyles';
import ParsedText from 'react-native-parsed-text';
import moment from 'moment';
const screenWidth = Dimensions.get('window').width;

import MyText from './../MyText/MyText';
import VideoPlayer from 'react-native-video-player';

export default class Tweet extends Component {

    getImageDimension(tweet) {
        return {
            width: '100%', 
            height: screenWidth * (tweet.extended_entities.media[0].sizes.small.h / tweet.extended_entities.media[0].sizes.small.w)
        }
    }

    renderMedia = (tweet) => {
        const media = tweet.extended_entities.media[0];
        return (
            <View style={styles.mediaContainer}>
                {
                    media.type == 'photo' ?
                    <Image 
                        resizeMode='cover' 
                        style={[this.getImageDimension(tweet), styles.image]} 
                        source={{ uri: tweet.extended_entities.media[0].media_url_https }}/> : 
                    media.type == 'video' ? 
                    <VideoPlayer
                        customStyles={{borderRadius: 6}}
                        thumbnail={{ uri: media.media_url }}
                        video={{ uri: media.video_info.variants[0].url }}
                        videoWidth={screenWidth - 50}
                        videoHeight={media.video_info.aspect_ratio[0] == 1 ? screenWidth - 50 : ((screenWidth - 50)*9)/16}
                        ref={r => this.player = r}
                    /> : null
                }
            </View>
        )
    }

    render() {
        const { tweet } = this.props;
        return (
            <View style={styles.container}>
                <Image resizeMode='cover' style={styles.userImage} source={{ uri: tweet.user.profile_image_url_https }}/>
                <View style={{ flex: 1 }}>
                    <View style={styles.tweetInfo}>
                        <MyText weight={600} style={styles.userName}>{tweet.user.name}</MyText>
                        <MyText style={styles.createdAt}>{moment(tweet.created_at).fromNow()}</MyText>
                    </View>
                    <View>
                        <MyText>
                            <ParsedText
                                style={styles.tweetBody}
                                parse={[
                                    {type: 'url',                       style: styles.link},
                                    {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.link},
                                    {pattern: /#(\w+)/,                 style: styles.link},
                                ]}
                                childrenProps={{allowFontScaling: false}}>
                                {tweet.text}
                            </ParsedText>
                        </MyText>
                    </View>
                    {tweet.extended_entities ? this.renderMedia(tweet) : null}
                </View>
            </View>
        );
    }
}