import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Feather';
/**
 * Import screens here
 */
import DailyTabs from './DailyTabs';

export default createMaterialBottomTabNavigator({
    DailyTabs: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: (
                <Icon name="layout" color='#aaa' size={22}/>
            )
        }
    },
    News: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: (
                <Icon name="book-open" color='#aaa' size={22}/>
            )
        }
    },
    Standings: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: (
                <Icon name="list" color='#aaa' size={22}/>
            )
        }
    },
    Leaders: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: (
                <Icon name="star" color='#aaa' size={22}/>
            )
        }
    },
    Search: {
        screen: DailyTabs,
        navigationOptions: {
            tabBarIcon: (
                <Icon name="search" color='#aaa' size={22}/>
            )
        }
    },
}, {
    initialRouteName: 'DailyTabs',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    labeled: false,
    barStyle: {
        backgroundColor: '#151515',
        elevation: 8
    }
});