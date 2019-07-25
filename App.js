import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Store from 'react-native-simple-store';
/**
 * Import screens here
 */
import TabsPage from './pages/Tabs';
import GameDetailsPage from './pages/GameDetails/GameDetails';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    
    componentDidMount() {
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
    }
});

const Fastbreak = createAppContainer(MainNavigator);