import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class PlayerCard extends Component {
    render() {
        return (
            <Animatable.View 
                style={styles.card} 
                style={styles.card} 
                animation="fadeInUp"
                duration={300}
                delay={100}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>DAILY LEADERS</Text>
                    <Text style={styles.title2}>SEE ALL</Text>
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.player}>
                            <Image source={require('../assets/images/i.png')} style={styles.playerImage}/>
                            <View style={styles.playerDetails}>
                                <Text style={styles.playerName}>Lebron James</Text>
                                <Text style={styles.playerStat}>32 pts | 8 reb | 9 ast</Text>
                            </View>
                        </View>
                        <View style={styles.team}>
                            <View style={styles.teamDetails}>
                                <Text style={styles.teamName}>LA Lakers</Text>
                                <Text style={styles.teamStat}>15-23</Text>
                            </View>
                            <Image source={require('../assets/images/LAL_logo.png')} style={styles.teamImage}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.player}>
                            <Image source={require('../assets/images/i.png')} style={styles.playerImage}/>
                            <View style={styles.playerDetails}>
                                <Text style={styles.playerName}>Stephen Curry</Text>
                                <Text style={styles.playerStat}>54 pts | 6 reb | 6 ast</Text>
                            </View>
                        </View>
                        <View style={styles.team}>
                            <View style={styles.teamDetails}>
                                <Text style={styles.teamName}>GS Warriors</Text>
                                <Text style={styles.teamStat}>22-8</Text>
                            </View>
                            <Image source={require('../assets/images/GSW_logo.png')} style={styles.teamImage}/>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.contentContainer}>
                        <View style={styles.player}>
                            <Image source={require('../assets/images/i.png')} style={styles.playerImage}/>
                            <View style={styles.playerDetails}>
                                <Text style={styles.playerName}>Khawi Leonard</Text>
                                <Text style={styles.playerStat}>41 pts | 12 reb | 4 ast</Text>
                            </View>
                        </View>
                        <View style={styles.team}>
                            <View style={styles.teamDetails}>
                                <Text style={styles.teamName}>TOR Raptors</Text>
                                <Text style={styles.teamStat}>29-23</Text>
                            </View>
                            <Image source={require('../assets/images/TOR_logo.png')} style={styles.teamImage}/>
                        </View>
                    </View>
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
    player: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5,
        width: 45,
        height: 45,
    },
    playerImage: {
        width: 45,
        height:45,
        borderRadius: 40,
        backgroundColor: '#555'
    },
    team: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
        width: 50,
        borderRadius: 9,
        justifyContent: 'flex-end',
    },
    teamImage: {
        height: 50,
        width: 50,
        borderRadius: 9
    },
    playerDetails: {
        marginLeft: 15,
        alignSelf: 'center'
    },
    playerName: {
        color: 'white',
        fontWeight: 'bold'
    },
    playerStat: {
        color: 'gray',
        fontSize: 13
    },
    teamDetails: {
        alignSelf: 'center',
        marginRight: 15
    },
    teamName: {
        textAlign: 'right',
        color: 'white',
        fontWeight: 'bold'
    },
    teamStat: {
        textAlign: 'right',
        color: 'gray',
        fontSize: 13
    }
});
