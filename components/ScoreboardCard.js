import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import * as Animatable from 'react-native-animatable';

export default class ScoreboardCard extends Component {
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
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/GSW_logo.png')}/>
                                <Text style={styles.teamName}>GS Warriors</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>109</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/TOR_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>TOR Raptors</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>120</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>7:44 - 4th</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/CLE_logo.png')}/>
                                <Text style={styles.teamName}>CLE Caveliers</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>102</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/LAL_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>LA Lakers</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>101</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>1:04 - 4th</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/ORL_logo.png')}/>
                                <Text style={styles.teamName}>ORL Magic</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>102</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/HOU_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>HOU Rockets</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>101</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>1:04 - 4th</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/UTA_logo.png')}/>
                                <Text style={styles.teamName}>UTA Jazz</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>99</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/MIL_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>MIL Bucks</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>87</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>0:04 - 3rd</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/PHX_logo.png')}/>
                                <Text style={styles.teamName}>PHX Suns</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>41</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/LAC_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>LA Clippers</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>26</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>6:29 - 2nd</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
                <View style={[styles.content]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/MEM_logo.png')}/>
                                <Text style={styles.teamName}>MEM Grizzlies</Text>
                                <Text style={[styles.teamScore, { borderTopLeftRadius: 4, borderTopRightRadius: 4 }]}>15</Text>
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={require('../assets/images/NYK_logo.png')}/>
                                <Text style={[styles.teamName, { color: '#888' }]}>NY Knicks</Text>
                                <Text style={[styles.teamScore, { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }]}>8</Text>
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    <Text style={styles.gameClockValue}>9:38 - 1st</Text>
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
                    {/* <Text style={styles.nugget}>Durant: 30 pts, 15 reb, 10 ast</Text> */}
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#1F2022',
        width: '100%',
        borderRadius: 9,
        padding: 10,
        borderWidth: 1,
        borderColor: '#2f2f2f'
    },
    content: {
        paddingVertical: 10,
        borderBottomColor: '#444'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        borderBottomColor: '#444',
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
    teamName: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
    },
    teamScore: {
        width: 40,
        paddingVertical: 5,
        color: 'white',
        fontWeight: 'bold',
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
        paddingLeft: 8,
        paddingTop: 5,
    }
});
