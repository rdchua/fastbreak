import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Feather';
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
            backgroundColor: '#121314',
            elevation: 0
        },
        headerTitle: 'Fastbreak',
        headerTintColor: '#fff',
        headerTitleStyle: {
            flex: 1,
            fontSize: 26,
            textAlign: 'center',
            fontFamily: 'SF Sports Night',
            fontWeight: '1000',
        },
        headerRight: (
            <View style={{ flexDirection: 'row' }}>
                {/* <Icon name='search' size={20} color='#888' style={{ paddingHorizontal: 10 }}/> */}
                <Icon name='calendar' size={20} color='#888' style={{ paddingHorizontal: 10 }}/>
            </View>
        ),
        headerLeft: (
            <Image  style={{ marginLeft: 20, width: 25, height: 20 }} source={require('./assets/images/logo_white.png')}/>
        )
    }
});

const App = createAppContainer(MainNavigator);

export default App;