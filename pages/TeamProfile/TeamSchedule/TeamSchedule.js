import React, { Component } from 'react';
import { View, ScrollView, Animated, StatusBar } from 'react-native';
import * as theme from './../../../Theme';
import { styles } from './TeamScheduleStyles';
import { FlatList } from 'react-native-gesture-handler';
import reactotron from 'reactotron-react-native';
import * as utils from './../../../utilities/helper';
import Card from '../../../components/Card/Card';
import Collapsible from '../../../components/Collapsible/Collapsible';
import Loading from '../../../components/Loading/Loading';

export default class TeamSchedule extends Component {

    _renderEvent = (event) => {
        const hTeamInfo = utils.getTeam(event.hTeam);
        const vTeamInfo = utils.getTeam(event.vTeam);
        const hTeamImage = utils.getTeamImage(hTeamInfo.tricode);
        const vTeamImage = utils.getTeamImage(vTeamInfo.tricode);
        const hTeamIsWinner = utils.isWinner(event.hTeam.score, event.vTeam.score);
        const gameTime = utils.getGameTime(event.statusNum, event.clock, event.period, event.startTimeUTC);
        return (
            <Collapsible
                date={event.startTimeUTC}
                status={event.statusNum}
                hTeam={hTeamInfo}
                vTeam={vTeamInfo}
                hTeamScore={event.hTeam}
                vTeamScore={event.vTeam}
                hTeamImage={hTeamImage}
                vTeamImage={vTeamImage}
                hTeamIsWinner={hTeamIsWinner}
                gameTime={gameTime}
                gameId={event.gameId}
                nugget={event.nugget}
                clock={event.clock ? event.clock : ''}
                period={event.period}
                isCollapsible={true}
            />
        )
    }
    
    _renderItemSeparator = () => {
        return (
            <View style={styles.itemDivider}></View>
        );
    }

    render() {
        const { screenProps, loading, schedule } = this.props;
        if(loading) {
            return (<Loading/>)
        }
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
                    <Card title='GAMES'>
                        <FlatList
                            removeClippedSubviews={true}
                            ItemSeparatorComponent={this._renderItemSeparator}
                            data={schedule}
                            keyExtractor={(item) => item.gameId}
                            renderItem={({item, index}) => this._renderEvent(item)}/>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}