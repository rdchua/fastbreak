import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
/**
 * Import screens here
 */
import TabsPage from './pages/Tabs';

const MainNavigator = createStackNavigator({
    Tabs: {
        screen: TabsPage
    }
}, {
    defaultNavigationOptions: {
        header: null,
        headerStyle: {
            backgroundColor: '#1F2022',
            elevation: 0
        },
        headerTitle: 'Fastbreak',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 24,
            fontWeight: 'bold',
        },
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                <Icon name='search' size={20} color='#888' style={{ paddingHorizontal: 10 }}/>
                <Icon name='calendar' size={20} color='#888' style={{ paddingHorizontal: 10 }}/>
            </View>
        )
    }
});

const App = createAppContainer(MainNavigator);

export default App;