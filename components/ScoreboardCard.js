import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import * as Animatable from 'react-native-animatable';

const utils = require('./../utilities/helper');

export default class ScoreboardCard extends Component {

    constructor(props) {
        super(props);
        console.log(props.games);
    }

    _renderItem = ({item}) => {
        const hTeam = item.hTeam;
        const vTeam = item.vTeam;
        const hTeamInfo = utils.getTeam(item.hTeam.teamId);
        const vTeamInfo = utils.getTeam(item.vTeam.teamId);
        const hTeamImage = utils.getTeamImage(hTeamInfo.tricode);
        const vTeamImage = utils.getTeamImage(vTeamInfo.tricode);
        const gameTime = utils.getGameTime(item.statusNum, item.clock, item.period);
        const hTeamIsWinner = utils.isWinner(hTeam.score, vTeam.score);
        return (
            <View style={[styles.content]}>
                <View style={styles.contentContainer}>
                    <View style={styles.scores}>
                        <View style={[styles.teamRow, { zIndex: 2 }]}>
                            <Image style={styles.teamImage} source={hTeamImage}/>
                            <Text style={hTeamIsWinner ? styles.teamNameWinner : styles.teamNameLoser}>{`${hTeamInfo.tricode} ${hTeamInfo.nickname}`}</Text>
                            <Text style={[
                                hTeamIsWinner ? styles.teamScoreWinner : styles.teamScoreLoser, 
                                { borderTopLeftRadius: 4, borderTopRightRadius: 4 }
                            ]}>{hTeam.score}</Text>
                        </View>
                        <View style={[styles.teamRow, { marginTop: -15 }]}>
                            <Image style={styles.teamImage} source={vTeamImage}/>
                            <Text style={!hTeamIsWinner ? styles.teamNameWinner : styles.teamNameLoser}>{`${vTeamInfo.tricode} ${vTeamInfo.nickname}`}</Text>
                            <Text style={[
                                !hTeamIsWinner ? styles.teamScoreWinner : styles.teamScoreLoser, 
                                { borderTopLeftRadius: 4, borderTopRightRadius: 4 }
                            ]}>{vTeam.score}</Text>
                        </View>
                    </View>
                    <View style={styles.gameInfo}>
                        <View style={styles.gameDetails}>
                            <View style={styles.gameClock}>
                                <Text style={styles.gameClockValue}>{gameTime}</Text>
                            </View>
                            <View style={[styles.gameStream, { marginTop: -10 }]}>
                                <Text style={styles.gameStreamValue}>ESPN</Text>
                            </View>
                        </View>
                        <View style={styles.gameActions}>
                            <Icon style={styles.gameAlert} name="bell" size={18} color="#888" />
                        </View>
                    </View>
                </View>
                {
                    item.nugget.text !== '' ?
                    <Text style={styles.nugget}>{item.nugget.text}</Text> : null
                }
            </View>
        )
    }

    _renderItemSeparator = () => {
        return (
            <View style={styles.itemDivider}></View>
        );
    }

    render() {
        return (
            <Animatable.View 
                style={styles.card} 
                animation="fadeInUp"
                duration={300}
                delay={100}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>Games</Text>
                    <Text style={styles.title2}>Calendar</Text>
                </View>
                <FlatList
                    ItemSeparatorComponent={this._renderItemSeparator}
                    data={this.props.games}
                    keyExtractor={item => item.gameId}
                    renderItem={this._renderItem}/>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f'
    },
    content: {
        paddingVertical: 10,
        borderBottomColor: '#333'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        borderBottomColor: '#333',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row'
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase'
    },
    title2: {
        flex: 1,
        fontWeight: 'bold',
        color: 'gray',
        fontSize: 12,
        alignSelf: 'center',
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    scores: {
        flex: 1.7,
    },
    teamRow: {
        flexDirection: 'row'
    },
    teamImage: {
        height: 35,
        width: 35,
        marginRight: 10,
    },
    teamNameWinner: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    teamNameLoser: {
        flex: 1,
        color: 'gray',
        alignSelf: 'center',
    },
    teamScoreWinner: {
        width: 40,
        paddingVertical: 5,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    teamScoreLoser: {
        width: 40,
        paddingVertical: 5,
        color: 'gray',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#3f3f3f'
    },
    gameInfo: {
        flex: 1,
        flexDirection: 'row'
    },
    gameDetails: {
        flex: 2,
        flexDirection: 'column'
    },
    gameClock: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        flex: 1
    },
    gameClockValue: {
        paddingLeft: 8,
        color: 'white',
    },
    gameStream: {
        flex: 1,
        paddingHorizontal: 8,
    },
    gameStreamValue: {
        paddingLeft: 8,
        color: '#888'
    },
    gameActions: {
        flex: 1,
        justifyContent: 'center'
    },
    gameAlert: {
        alignSelf: 'flex-end',
        paddingRight: 8
    },
    nugget: {
        color: '#888',
        fontSize: 12,
        fontStyle: 'italic',
        paddingLeft: 8,
        paddingTop: 5,
    },
    itemDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#333'
    }
});
