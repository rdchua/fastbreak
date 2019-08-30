import React, { Component } from 'react';
import { View, ScrollView, Animated, StatusBar, Image } from 'react-native';
import { styles } from './TeamRosterStyles';
import MyText from '../../../components/MyText/MyText';
import * as theme from './../../../Theme';
import * as api from './../../../api/data_nba_endpoints';
import * as utils from './../../../utilities/helper';
import Card from '../../../components/Card/Card';
import reactotron from 'reactotron-react-native';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../../components/Loading/Loading';
import moment from 'moment';

export default class TeamRoster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            players: null
        }
        utils.getPlayers.then((players) => {
            this.setState({ loading: false, players: players });
        });
    }

    _renderPlayer = (personId) => {
        const player = utils.getPlayer(this.state.players, personId);
        return (
            <View style={styles.imageContainer}>
                <Image source={{ uri: api.HEADSHOT(personId) }} style={styles.bigImage}/>
                <View style={styles.nameContainer}>
                    <MyText weight={600} style={styles.name}>{player.firstName} {player.lastName}</MyText>
                    <MyText weight={500} style={styles.sub}>#{player.jersey}</MyText>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end'}}>
                    <MyText weight={600} style={styles.name}>{player.teamSitesOnly.posFull}</MyText>
                    <MyText weight={500} style={styles.sub}>{player.heightFeet}' {player.heightInches}'' ({moment().diff(player.dateOfBirthUTC, 'years')})</MyText>
                </View>
            </View>
        )
    }

    render() {
        const { screenProps, roster } = this.props;
        if(this.state.loading) {
            return (<Loading/>)
        }
        reactotron.display({name: 'players', value: this.state.players });
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: theme.bgColor }}
                contentContainerStyle={{ paddingTop: screenProps.scrollViewHeight, backgroundColor: '#121314' }}
                onScroll={
                    Animated.event([{nativeEvent: {contentOffset: {
                        y: this.props.screenProps.scrollY}}
                    }], { listener: this.props.screenProps.updateIsScrolling})
                }>
                <StatusBar backgroundColor={theme.cardBgColor}/>

                <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                {
                    roster ?
                    <Card> 
                        <MyText weight={700} style={{color: 'white', paddingBottom: 10}}>TEAM</MyText>
                        <FlatList
                            data={roster}
                            keyExtractor={(item, index) => item.personId}
                            renderItem={({item, index}) => this._renderPlayer(item.personId)}/>
                    </Card> : null
                }
                </View>
            </ScrollView>
        );
    }
}