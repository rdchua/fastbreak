import React, { Component } from 'react';
import { View, Image } from 'react-native';
const PLAYER_WIDTH = { width: 150 * fontScale };
const MIN_WIDTH = { width: 45 * fontScale };
const NORMAL_WIDTH = { width: 43 * fontScale };
const PERCENT_WIDTH = { width: 50 * fontScale };


export default class GameLogs extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.playerContainer, PLAYER_WIDTH]}>
                    <MyText weight={700} style={[styles.tableHeader, { textAlign: 'left' }]}>PLAYER</MyText>
                    <FlatList
                        data={this.state.list}
                        extraData={this.state.list}
                        keyExtractor={(item) => item.personId}
                        renderItem={({item}) => this._renderPlayerNames(item)}/>
                </View>
                {
                    this.state.showShadow ?
                    <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                        colors={['rgba(18, 19, 20, 0.8)', 'rgba(18, 19, 20, 0)']} 
                        style={styles.shadow}/> : null
                }
                <ScrollView horizontal={true} onScroll={this.handleScroll}>
                    <FlatList
                        ListHeaderComponent={this._renderTableHeaderStats}
                        ItemSeparatorComponent={this._renderSeparator}
                        data={this.state.list}
                        extraData={this.state.list}
                        keyExtractor={(item) => item.personId}
                        renderItem={({item}) => this._renderStats(item)}/>
                </ScrollView>
            </View>
        );
    }
}