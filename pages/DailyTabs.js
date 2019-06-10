import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

/**
 * Import custom components here
 */
import ScoreboardPage from '../pages/Scoreboard';

export default class DailyTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor='#121314' barStyle='light-content'/>
                <ScrollableTabView
                    initialPage={1}    
                    page={10}
                    tabBarPosition='top'
                    tabBarActiveTextColor='white'
                    tabBarBackgroundColor='#121314'
                    tabBarUnderlineStyle={{ backgroundColor: '#1988F4', height: 2, borderRadius: 9 }}
                    tabBarInactiveTextColor='rgba(255,255,255,0.2)'
                    prerenderingSiblingsNumber={2}
                    tabBarTextStyle={{
                        fontSize: 12, 
                        letterSpacing: 0.7,
                        fontWeight: 'bold', 
                        marginTop: 10, 
                        fontFamily: ''
                    }}
                    renderTabBar={() => 
                        <ScrollableTabBar
                            backgroundColor='#121314'
                        />}>
                            <ScoreboardPage tabLabel='YESTERDAY'/>
                            <ScoreboardPage tabLabel='TODAY'/>
                            <ScoreboardPage tabLabel='TOMORROW'/>
                            <ScoreboardPage tabLabel='JUN 06'/>
                            <ScoreboardPage tabLabel='JUN 07'/>
                            <ScoreboardPage tabLabel='JUN 08'/>
                            <ScoreboardPage tabLabel='JUN 09'/>
                            <ScoreboardPage tabLabel='JUN 10'/>
                            <ScoreboardPage tabLabel='JUN 11'/>
                            <ScoreboardPage tabLabel='JUN 12'/>
                            <ScoreboardPage tabLabel='JUN 13'/>
                            <ScoreboardPage tabLabel='JUN 14'/>
                </ScrollableTabView>
            </View>
        );
    }
}
