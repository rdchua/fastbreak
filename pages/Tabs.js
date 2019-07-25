import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Feather';
/**
 * Import screens here
 */
import DailyTabs from './DailyTabs/DailyTabs';
import News from './News/News';

export default createMaterialBottomTabNavigator({
    Games: {
        screen: DailyTabs,
        navigationOptions: {
            header: null,
            tabBarIcon: ({tintColor}) => (
                <Icon name="layout" color={tintColor} size={22}/>
            )
        }
    },
    News: {
        screen: News,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="book-open" color={tintColor} size={22}/>
            )
        }
    },
    Standings: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="list" color={tintColor} size={22}/>
            )
        }
    },
    Leaders: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="star" color={tintColor} size={22}/>
            )
        }
    },
    Search: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Icon name="search" color={tintColor} size={22}/>
            )
        }
    },
}, {
    initialRouteName: 'Games',
    inactiveColor: 'gray',
    // labeled: false,
    activeTintColor: 'blue',
    activeColor: '#1988F4',
    barStyle: {
        backgroundColor: '#111',
        elevation: 8
    }
});