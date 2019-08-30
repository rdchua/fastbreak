import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import MyText from '../../../components/MyText/MyText';
import { styles } from './TeamStatsStyles';
import Card from '../../../components/Card/Card';
import reactotron from 'reactotron-react-native';
import StatTrio from '../../../components/StatTrio/StatTrio';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import LastGame from '../../../components/LastGames/LastGames';

export default class TeamStats extends Component {

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
        const { screenProps, stats, last5 } = this.props
        reactotron.display({ name: 'stats', value: stats})
        return (
            <ScrollView 
                style={styles.container}
                contentContainerStyle={{ paddingTop: screenProps.scrollViewHeight + 5, paddingHorizontal: 5, paddingBottom: 20 }}>               
                <Card title='Last 5 Games'>
                    {
                        last5 ? 
                        <LastGame
                            games={last5}/> : this._renderLoading()
                    }
                </Card>
                <Card title='STATISTICS'>
                    {
                        stats ?
                        <View>
                            <StatTrio
                                style={{paddingHorizontal: 5}}
                                stat1={stats[26]}
                                stat1Name='Points'
                                stat2={stats[18]}
                                stat2Name='Rebounds'
                                stat3={stats[19]}
                                stat3Name='Assists'
                                stat4={stats[21]}
                                stat4Name='Steals'/>
                            <StatTrio
                                style={{paddingHorizontal: 5, marginTop: 15}}
                                stat1={stats[22]}
                                stat1Name='Blocks'
                                stat2={(stats[9] * 100 ).toFixed(1)}
                                stat2Name='FG%'
                                stat3={(stats[12] * 100).toFixed(1)}
                                stat3Name='3P%'
                                stat4={(stats[15] * 100).toFixed(1)}
                                stat4Name='FT%'/>
                            <StatTrio
                                style={{paddingHorizontal: 5, marginTop: 15}}
                                stat1={stats[16]}
                                stat1Name='Offensive Rebounds'
                                stat2={stats[17]}
                                stat2Name='Defensive Rebounds'
                                stat3={stats[20]}
                                stat3Name='Turnovers'
                                stat4={stats[27]}
                                stat4Name='+/-'/>
                        </View> : this._renderLoading()
                    }
                </Card>
            </ScrollView>
        );
    }
}