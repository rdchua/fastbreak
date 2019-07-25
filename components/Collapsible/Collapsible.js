import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
import { styles } from './CollapsibleStyles';

export default class Collapsible extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            caretAnimation: new Animated.Value(0)
        }
    }

    _renderTeamName = (status, isWinner, team) => {
        const style = isWinner ? styles.teamNameWinner : styles.teamNameLoser;
        return (
            <Text style={status != 1 ? style : styles.teamNameLoser}>{`${team.tricode} ${team.nickname}`}</Text> 
        )
    }

    _renderCaret = (status, isWinner) => {
        return (
            isWinner && status != 1 ? <Icon name='caretright' size={8} color='#1988F4' style={styles.caret}/> : null
        );
    }

    _renderScore = (status, score, hTeamIsWinner, isAway) => {
        const style = [
            hTeamIsWinner ? styles.teamScoreWinner : styles.teamScoreLoser, 
            isAway ? styles.roundedCornerBottom : styles.roundedCornerTop
        ];

        return (
            status != 1 ? <Text style={style}>{score}</Text> : <Text style={style}>-</Text>
        );
    }

    _renderGameClock = (status, clock) => {
        const style = [styles.gameClockValue, {color: status == 2 ? '#CC2D40' : 'white'}]
        return <Text style={style}>{clock}</Text>
    }

    _renderTeamLeaders = (hPlayerName, vPlayerName, hTeamStat, vTeamStat, statName) => {
        return (
            <View style={styles.leaderContainer}>
                <Text style={styles.hPlayerLeader} numberOfLines={1}>{this.displayName(hPlayerName)}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.hTeamLeaderVal}>{hTeamStat}</Text>
                    <Text style={[styles.statName, {flex: 2}]}>{statName}</Text>
                    <Text style={styles.vTeamLeaderVal}>{vTeamStat}</Text>
                </View>
                <Text style={styles.vPlayerLeader} numberOfLines={1}>{this.displayName(vPlayerName)}</Text>
            </View>
        );
    }

    _setMaxHeight = (event) => {
        /**
         * Add 20 to maxHeight the view "collapsibleView" has a marginVertical of 20.
         */
        this.setState({
            maxHeight: event.nativeEvent.layout.height + 40
        });
    }
    
    _setMinHeight = (event) => {
        /**
         * Add 21 to minHeight because the height of the text nugget is 21.
         * This can be found by getting the height of the text onLayout
         */
        this.setState({
            minHeight: event.nativeEvent.layout.height + 21,
            animation: new Animated.Value(event.nativeEvent.layout.height + 20)
        });
    }

    toggle = () => {
        let { expanded, maxHeight, minHeight } = this.state;
        let initialValue = expanded ? maxHeight + minHeight : minHeight;
        let finalValue = expanded ? minHeight : maxHeight + minHeight;
        this.setState({ expanded : !expanded }, () => {
            this.state.animation.setValue(initialValue);
            Animated.spring(this.state.animation, {
                toValue: finalValue,
            }).start();
            Animated.timing(this.state.caretAnimation, {
                toValue: this.state.expanded ? 1 : 0,
                duration: 300,
                easing: Easing.linear
            }).start()
        });
    }

    displayName(name) {
        let names = name.split(' ');
        return `${names[0].charAt(0)}. ${names[1]}`;
    }

    navigateToGameDetails(nav) {
        const game = {...this.props}
        console.log(game);
        nav.navigate('GameDetails', {
            hTeam: game.hTeam,
            vTeam: game.vTeam,
            hTeamImage: game.hTeamImage,
            vTeamImage: game.vTeamImage,
            date: game.date,
            hTeamScore: game.hTeamScore,
            vTeamScore: game.vTeamScore,
            gameId: game.gameId,
            clock: game.clock,
            period: game.period
        });
    }

    render() {
        const spin = this.state.caretAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });
        const rotate = {
            transform: [{ rotateX: spin }],
        };
        let { status, hTeam, vTeam, hTeamImage, vTeamImage, hTeamIsWinner, gameTime, nugget, hTeamScore, vTeamScore, hTeamLeaders, vTeamLeaders, nav } = this.props;
        return (
            <Animated.View style={[styles.content, {height: this.state.animation ? this.state.animation : 175}]}>
                <View onLayout={this._setMinHeight}>
                    <TouchableOpacity onPress={() => this.navigateToGameDetails(nav)} style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={hTeamImage}/>
                                {this._renderTeamName(status, hTeamIsWinner, hTeam)}
                                {this._renderCaret(status, hTeamIsWinner)}
                                {this._renderScore(status, hTeamScore.score, hTeamIsWinner, false)}
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={vTeamImage}/>
                                {this._renderTeamName(status, !hTeamIsWinner, vTeam)}
                                {this._renderCaret(status, !hTeamIsWinner)}
                                {this._renderScore(status, vTeamScore.score, !hTeamIsWinner, true)}
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    {this._renderGameClock(status, gameTime)}
                                </View>
                                <View style={[styles.gameStream, { marginTop: -10 }]}>
                                    <Text style={styles.gameStreamValue}>ESPN</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ flex: 1 }} onPress={this.toggle}>
                                <View style={styles.gameActions}>
                                    <AnimatedIcon style={[styles.gameAlert, rotate]} name="down" size={18} color="#888" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    {
                        nugget.text !== '' ?
                        <Text style={styles.nugget}>{nugget.text}</Text> : null
                    }
                </View>
                <View style={styles.collapsibleView} onLayout={this._setMaxHeight}>
                    {this._renderTeamLeaders(hTeamLeaders[6], vTeamLeaders[6], hTeamLeaders[7], vTeamLeaders[7], 'PTS')}
                    {this._renderTeamLeaders(hTeamLeaders[9], vTeamLeaders[9], hTeamLeaders[10], vTeamLeaders[10], 'REB')}
                    {this._renderTeamLeaders(hTeamLeaders[12], vTeamLeaders[12], hTeamLeaders[13], vTeamLeaders[13], 'AST')}
                </View>
            </Animated.View>
        );
    }
}