import React, { Component } from 'react';
import { Animated, View, ScrollView } from 'react-native';
import { styles } from './TeamTransactionStyles';
import reactotron from 'reactotron-react-native';
import Transaction from '../../../components/Transaction/Transaction';
import Card from '../../../components/Card/Card';
import { FlatList } from 'react-native-gesture-handler';
import * as utils from './../../../utilities/helper';

export default class TeamTransactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: null
        }
        this.getPlayers();
    }

    getPlayers = () => {
        utils.getPlayers.then((players) => {
            this.setState({ players: players });
        })
    }

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

    _renderTransaction = ({item}) => {
        const { team } = this.props;
        const player = this.state.players.find(player => player.personId == item.PLAYER_ID);
        if(player) {
            return (
                <Transaction
                    player={player}
                    team={team}
                    transaction={item}/>
            )
        }
    }

    render() {
        const { transactions, screenProps, team } = this.props;
        if(!this.state.players) {
            return <View></View>
        }
        return (
            <ScrollView 
            contentContainerStyle={{ paddingTop: screenProps.scrollViewHeight + 5, backgroundColor: '#121314', paddingHorizontal: 5 }}
            onScroll={
                Animated.event([{nativeEvent: {contentOffset: {
                    y: screenProps.scrollY}}
                }], { listener: screenProps.updateIsScrolling})
            }
            style={styles.container}>
                <Card title='Recent Transactions'>
                    {
                        this.state.players ?
                        <FlatList
                            data={transactions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this._renderTransaction}/> : this._renderLoading()
                    }
                </Card>
            </ScrollView>
        );
    }
}