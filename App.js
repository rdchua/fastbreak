import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import _ from 'underscore';
const utils = require('./utilities/helper');
import * as api from './api/data_nba_endpoints';
import Store from 'react-native-simple-store';
/**
 * Import screens here
 */
import TabsPage from './pages/Tabs';
import GameDetailsPage from './pages/GameDetails/GameDetails';
import TeamProfile from './pages/TeamProfile/TeamProfile';
import reactotron from 'reactotron-react-native';
import PlayerProfile from './pages/PlayerProfile/PlayerProfile';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    oAuthTwitter() {
        utils.twitterAuth.then((data) => {
            Store.update('twitter_token', {access_token: data.access_token})
        });
    }
    
    componentDidMount() {
        this.oAuthTwitter();
        utils.getPlayers;
        this.setState({ loading: false });
    }

    render() {
        return (
            <Fastbreak/>
        )
    }
}

const MainNavigator = createStackNavigator({
    Tabs: {
        screen: TabsPage,
        navigationOptions: {
            header: null
        }
    },
    GameDetails: {
        screen: GameDetailsPage
    },
    TeamProfile: {
        screen: TeamProfile
    },
    PlayerProfile: {
        screen: PlayerProfile
    }
});

const Fastbreak = createAppContainer(MainNavigator);