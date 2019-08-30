import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './GameFeedStyles';
import _ from 'underscore';
import moment from 'moment';
import * as twitterAPI from './../../api/twitter_endpoints';
const utils = require('./../../utilities/helper');
/**
 * import custom components here
 */
import MyText from './../../components/MyText/MyText';
import Tweet from '../../components/Tweet/Tweet';
import Card from '../../components/Card/Card';
import reactotron from 'reactotron-react-native';

export default class GameFeed extends Component {

    constructor(props){
        super(props);
        this.state = { 
            news: [],
            youtube: [],
            feed: [],
            loading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        utils.getTwitterToken.then((token) => {
            this.fetchTwitterFeed(token.access_token);
        });
    }

    fetchTwitterFeed(token) {
        console.log(token);
        const { params } = this.props;
        Promise.all([
            fetch(twitterAPI.getTeamFeed(params.hTeam.twitterName, 50), twitterAPI.headers(token)).then((response) => response.json()),
            fetch(twitterAPI.getTeamFeed(params.vTeam.twitterName, 50), twitterAPI.headers(token)).then((response) => response.json()),
        ]).then(([homeFeed, awayFeed]) => {
            console.log(homeFeed);
            console.log(awayFeed);
            const sorted = _.sortBy(homeFeed.concat(awayFeed), (data) => { 
                return sort = moment(data.created_at)
            }).reverse();
            this.setState({ 
                feed: sorted, 
                loading: false, 
                refreshing: false 
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    renderFeedItem(item) {
        return <Tweet tweet={item}/>
    }

    render() {
        return (
            <FlatList
                removeClippedSubviews={true}
                style={{paddingVertical: 50, paddingHorizontal: 8}}
                data={this.state.feed}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>  this.renderFeedItem(item)
            }/>
        );
    }
}