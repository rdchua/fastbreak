import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './GameStatsStyles';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as api from './../../api/data_nba_endpoints';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
/**
 * Import custom components here
 */
import Card from '../../components/Card/Card';
import StatCompare from '../../components/StatCompare/StatCompare';
import GameLeader from '../../components/GameLeader/GameLeader';
import StatCompareCircle from '../../components/StatCompareCircle/StatCompareCircle';
import Loading from '../../components/Loading/Loading';

export default class GameStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            hLeader: {},
            vLeader: {}
        }
    }

    componentDidMount() {
        const props = {...this.props}
        if(props.gameData) {
            if(props.gameData.isRecapArticleAvail) {
                this.fetchRecapArticle(props.params.date, props.params.gameId);
            } else if(props.gameData.isPreviewArticleAvail) {
                this.fetchPreviewArticle(params.date, params.gameId);
            } else {
                console.log('No article available');
            }
            this.calculateLeaders(props.gameStats, props.gameData.hTeam.teamId, props.gameData.vTeam.teamId);
        }
    }

    calculateStats(player) {
        return parseInt(player.points) + parseInt(player.totReb) + (1.4*(parseInt(player.assists))) + parseInt(player.steals) + (1.4*(parseInt(player.blocks))) - (.7*(parseInt(player.turnovers))) + parseInt(player.fgm) + (.5*(parseInt(player.tpm))) - (.8*(parseInt(player.fga)-parseInt(player.fgm))) + (.25*(parseInt(player.ftm))) - (.8*(parseInt(player.fta)-parseInt(player.ftm)));
    }

    fetchRecapArticle(date, gameId) {
        fetch(api.RECAP_ARTICLE(date, gameId))
            .then((response) => response.json())
            .then((data) => {
                this.setState({ article: data });
            })
            .catch((err) => {
                this.refs.toast.show('Error fetching recap article.', DURATION.LENGTH_LONG);
            });
    }

    fetchPreviewArticle(date, gameId) {
        fetch(api.PREVIEW_ARTICLE(date, gameId))
            .then((response) => response.json())
            .then((data) => {
                this.setState({ article: data });
            })
            .catch((err) => {
                this.refs.toast.show('Error fetching preview article.', DURATION.LENGTH_LONG);
            });
    }

    calculateLeaders(boxscore, hTeam, vTeam) {
        let hLeader, vLeader;
        boxscore.activePlayers.forEach(player => {
            if(player.teamId == hTeam) {
                if(hLeader) {
                    currPer = this.calculateStats(player);
                    if(currPer > hLeader.per) {
                        player.per = currPer;
                        hLeader = player; 
                    }
                } else {
                    player.per = this.calculateStats(player);
                    hLeader = player;
                }
            } else if(player.teamId == vTeam) {
                if(vLeader) {
                    currPer = this.calculateStats(player);
                    if(currPer > vLeader.per) {
                        player.per = currPer;
                        vLeader = player; 
                    }
                } else {
                    player.per = this.calculateStats(player);
                    vLeader = player;
                }
            }
        });
        this.setState({ 
            hLeader: hLeader,
            vLeader: vLeader
        });
    }

    _renderArticle = () => {
        if(!this.state.article) {
            return (
                <Placeholder
                    Animation={Fade}>
                        <PlaceholderLine width={80} style={{ backgroundColor: 'black' }}/>
                        <PlaceholderLine style={{ backgroundColor: '#555' }}/>
                        <PlaceholderLine width={30} style={{ backgroundColor: '#555' }}/>
                </Placeholder>
            )
        }
        return (
            <View style={{ paddingHorizontal: 4 }}>
                <Text style={styles.articleTitle}>{this.state.article.title}</Text>
                <Text style={styles.articleBody}>{this.state.article.paragraphs[3].paragraph}</Text>
            </View>
        );
    }

    _renderPageLoading = () => {
        return (
            <Placeholder
                Animation={Fade}>
                    <PlaceholderLine width={80} style={{ backgroundColor: 'black' }}/>
                    <PlaceholderLine style={{ backgroundColor: '#555' }}/>
                    <PlaceholderLine width={30} style={{ backgroundColor: '#555' }}/>
            </Placeholder>
        )
    }

    _renderQuarterPoints = (linescore) => {
        let quarters = linescore.map((quarter) => {
            return <Text style={styles.quarterVal}>{quarter.score}</Text>;
        });
        return quarters;
    }

    _renderQuarterTitle = (linescore) => {
        let i = 0;
        let quarters = linescore.map((quarter) => {
            i++;
            if(i > 4) {
                return <Text style={[styles.quarterVal, { color: '#888' }]}>{`OT${i-4}`}</Text>
            }
            return <Text style={[styles.quarterVal, { color: '#888' }]}>{`Q${i}`}</Text>
        });
        return quarters;
    }

    _renderClock = () => {
        const params = {...this.props};
        return (
            <View>
                <Text style={styles.divider}>:</Text>
            </View>
        )
    }

    render() {
        const { hLeader, vLeader } = this.state;
        const { params, gameStats, gameData } = this.props;
        return (
            <ScrollView 
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }} 
                style={{ paddingHorizontal: 8 }}>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={1}
                    textStyle={styles.toastText}
                />
                <Card title="Latest news">
                    {this._renderArticle()}
                </Card>

                <Card>
                    <View>
                        {/* <View style={styles.quarterRow}>
                            <Text style={styles.quarterTeamName}>&nbsp;</Text>
                            {this._renderQuarterTitle(params.hTeamScore.linescore)}
                        </View> */}
                        <View style={styles.quarterRow}>
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Image source={params.hTeamImage} style={styles.quarterTeamImage}/>
                                <Text style={styles.quarterTeamName}>{params.hTeam.tricode} {params.hTeam.nickname}</Text>
                            </View>
                            {this._renderQuarterPoints(params.hTeamScore.linescore)}
                        </View>
                        <View style={styles.quarterRow}>
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Image source={params.vTeamImage} style={styles.quarterTeamImage}/>
                                <Text style={styles.quarterTeamName}>{params.vTeam.tricode} {params.vTeam.nickname}</Text>
                            </View>
                            {this._renderQuarterPoints(params.vTeamScore.linescore)}
                        </View>
                    </View>
                </Card>

                {
                    hLeader ? 
                    <Card title="Game Leaders">
                        <GameLeader
                            teamImage={params.hTeamImage}
                            teamColor={params.hTeam.primaryColor}
                            player={hLeader}
                        />
                        <View style={styles.itemDivider}></View>
                        <GameLeader
                            style={{marginTop: 10, paddingBottom: 10}}
                            teamImage={params.vTeamImage}
                            teamColor={params.vTeam.primaryColor}
                            player={vLeader}
                        />
                    </Card> : null
                }
                
                {
                    gameStats ?
                    <Card title="Team Stats">
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.points}
                            vTeamStat={gameStats.vTeam.totals.points}
                            statName='PTS'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.offReb}
                            vTeamStat={gameStats.vTeam.totals.offReb}
                            statName='O REB'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.defReb}
                            vTeamStat={gameStats.vTeam.totals.defReb}
                            statName='D REB'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.assists}
                            vTeamStat={gameStats.vTeam.totals.assists}
                            statName='AST'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.steals}
                            vTeamStat={gameStats.vTeam.totals.steals}
                            statName='STL'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.blocks}
                            vTeamStat={gameStats.vTeam.totals.blocks}
                            statName='BLK'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.turnovers}
                            vTeamStat={gameStats.vTeam.totals.turnovers}
                            statName='TOV'/>
                        <StatCompareCircle
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.fgm}
                            hTeamStat2={gameStats.hTeam.totals.fga}
                            vTeamStat={gameStats.vTeam.totals.fgm}
                            vTeamStat2={gameStats.vTeam.totals.fga}
                            isPct={true}
                            statName='Field Goal'/>
                        <StatCompareCircle
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.tpm}
                            hTeamStat2={gameStats.hTeam.totals.tpa}
                            vTeamStat={gameStats.vTeam.totals.tpm}
                            vTeamStat2={gameStats.vTeam.totals.tpa}
                            isPct={true}
                            statName='Three Point'/>
                        <StatCompareCircle
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.ftm}
                            hTeamStat2={gameStats.hTeam.totals.fta}
                            vTeamStat={gameStats.vTeam.totals.ftm}
                            vTeamStat2={gameStats.vTeam.totals.fta}
                            isPct={true}
                            statName='Free Throw'/>
                    </Card> : null
                }

                {
                    gameData ?
                    <Card title="Game Info">
                        <View style={styles.infoContainer}>
                            <Text style={styles.gameDetails}>{moment(gameData.startTimeUTC).format('ddd, MMM DD, YYYY   •  hh:mm A')}</Text>
                            <Text style={[styles.gameDetails, { color: '#aaa' }]}>{gameData.arena.name}  •  {gameData.arena.city}, {gameData.arena.stateAbbr}</Text>
                        </View>
                    </Card> : null
                }
            </ScrollView>
        );
    }
}