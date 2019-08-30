import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from './GameStyles';
import MyText from '../MyText/MyText';

export default class Game extends Component {

    _renderTeamName = (status, isWinner, team) => {
        const style = isWinner ? styles.teamNameWinner : styles.teamNameLoser;
        const weight = isWinner ? 700 : 500;
        return (
            <MyText 
                weight={weight} 
                style={status != 1 ? style : styles.teamNameLoser}>
                    {`${team.tricode} ${team.nickname}`}
            </MyText> 
        )
    }

    _renderScore = (status, score, hTeamIsWinner, isAway) => {
        const style = [
            hTeamIsWinner ? styles.teamScoreWinner : styles.teamScoreLoser, 
            isAway ? styles.roundedCornerBottom : styles.roundedCornerTop
        ];

        return (
            status != 1 ? <MyText style={style}>{score}</MyText> : <MyText style={style}>-</MyText>
        );
    }

    _renderGameClock = (status, clock) => {
        const style = [styles.gameClockValue, {color: status == 2 ? '#CC2D40' : 'white'}]
        return <MyText style={style}>{clock}</MyText>
    }

    render() {
        let { status, hTeam, vTeam, hTeamImage, vTeamImage, hTeamIsWinner, gameTime } = this.props;
        return (
            <View style={[styles.content, this.props.style]}>
                <View>
                    <TouchableOpacity onPress={() => this.navigateToGameDetails(nav)} style={styles.contentContainer}>
                        <View style={styles.scores}>
                            <View style={[styles.teamRow, { zIndex: 2 }]}>
                                <Image style={styles.teamImage} source={hTeamImage}/>
                                {this._renderTeamName(status, hTeamIsWinner, hTeam)}
                            </View>
                            <View style={[styles.teamRow, { marginTop: -15 }]}>
                                <Image style={styles.teamImage} source={vTeamImage}/>
                                {this._renderTeamName(status, !hTeamIsWinner, vTeam)}
                            </View>
                        </View>
                        <View style={styles.gameInfo}>
                            <View style={styles.gameDetails}>
                                <View style={styles.gameClock}>
                                    {this._renderGameClock(status, gameTime)}
                                </View>
                                <View style={[styles.gameStream, { marginTop: -10 }]}>
                                    <MyText style={styles.gameStreamValue}>ESPN</MyText>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}