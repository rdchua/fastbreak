import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { styles } from './HeadlineStyles';
import MyText from '../MyText/MyText';
import moment from 'moment';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
/**
 * import custom components here
 */

export default class Headline extends Component {
    
    constructor(props){
        super(props);
    }

    _renderLoading = () => {
        return (
            <Placeholder
                Animation={Fade}>
                    <PlaceholderLine width={80} style={{ backgroundColor: 'black' }}/>
                    <PlaceholderLine style={{ backgroundColor: 'black' }}/>
                    <PlaceholderLine width={30} style={{ backgroundColor: 'black' }}/>
            </Placeholder>
        )
    }

    render() {
        const { headline, loading } = this.props;
        return (
            <View style={styles.container}>
                {
                    loading ? 
                    this._renderLoading() :
                    <View>
                        <Image source={{ uri: headline.cover }} style={styles.cover}/>
                        <MyText weight={700} style={styles.title}>{headline.title}</MyText>
                        <MyText style={styles.author}>{headline.authors} 
                            <MyText style={styles.time}> • {moment(headline.date_time, 'MMM DD, hh:mma').fromNow()}</MyText>
                        </MyText>
                    </View>
                }
            </View>
        );
    }
}