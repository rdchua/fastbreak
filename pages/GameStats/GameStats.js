import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Animated } from 'react-native';
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
import MyText from '../../components/MyText/MyText';

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
        console.log(props);
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
                console.log(this.state.article);
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

    _renderPlaceholder = () => {
        return (
            <Placeholder
                Animation={Fade}>
                    <PlaceholderLine width={80} style={{ backgroundColor: 'black' }}/>
                    <PlaceholderLine style={{ backgroundColor: '#555' }}/>
                    <PlaceholderLine width={30} style={{ backgroundColor: '#555' }}/>
            </Placeholder>
        )
    }

    _renderArticle = () => {
        if(!this.state.article) {
        }
        return (
            <View style={{ paddingHorizontal: 4 }}>
                {
                    !this.state.article ? 
                    this._renderPlaceholder() : 
                    <View>
                        <MyText weight={700} style={styles.articleTitle}>{this.state.article.title}</MyText>
                        <MyText style={styles.articleBody}>{this.state.article.paragraphs[3].paragraph}</MyText>
                    </View>
                }
            </View>
        );
    }

    gotoTeamProfile(isHomeTeam) {
        const { params, navigation } = this.props;
        let parameters;
        if(isHomeTeam) {
            parameters = {
                team: params.hTeam,
                teamImage: params.hTeamImage,
                navigation: navigation
            }
        } else {
            parameters = {
                team: params.vTeam,
                teamImage: params.vTeamImage,
                navigation: navigation
            }
        }
        this.props.navigation.navigate('TeamProfile', parameters);
    }

    _renderQuarterly = () => {
        const { params } = this.props;
        console.log(params);
        const textColorHome = params.hTeamScore.score > params.vTeamScore.score ? '#fff' : '#aaa';
        const textWeightHome = params.hTeamScore.score > params.vTeamScore.score ? 700 : 400;
        const textColorVisitor = params.vTeamScore.score > params.hTeamScore.score ? '#fff' : '#aaa';
        const textWeightVisitor = params.vTeamScore.score > params.hTeamScore.score ? 700 : 400;
        return (
            <View style={styles.quarterly}>
                <TouchableOpacity onPress={() => this.gotoTeamProfile(true)} style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <MyText weight={600} style={styles.quarterTeamName}>{params.hTeam.nickname}</MyText>
                        <Image source={params.hTeamImage} style={styles.quarterTeamImage}/>
                    <MyText style={styles.teamRecord}>({params.hTeamScore.win} - {params.vTeamScore.loss})</MyText>
                </TouchableOpacity>
                <View style={{flex: 1}}>
                    {this._renderQuarterPoints(params.hTeamScore.linescore, params.vTeamScore.linescore)}
                    <MyText
                        weight={textWeightHome} 
                        style={[styles.quarterVal, { color: textColorHome }]}>{params.hTeamScore.score}</MyText>
                </View>
                <View style={{flex: 1}}>
                    {this._renderQuarters(params.hTeamScore.linescore)}
                    <MyText style={[styles.quarterVal, {color: '#666'}]}>T</MyText>
                </View>
                <View style={{ flex: 1}}>
                    {this._renderQuarterPoints(params.vTeamScore.linescore, params.hTeamScore.linescore)}
                    <MyText
                        weight={textWeightVisitor} 
                        style={[styles.quarterVal, { color: textColorVisitor }]}>{params.vTeamScore.score}</MyText>
                </View>
                <TouchableOpacity onPress={() => this.gotoTeamProfile(false)}style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <MyText weight={600} style={styles.quarterTeamName}>{params.vTeam.nickname}</MyText>
                        <Image source={params.vTeamImage} style={styles.quarterTeamImage}/>
                    <MyText style={styles.teamRecord}>({params.vTeamScore.win} - {params.vTeamScore.loss})</MyText>
                </TouchableOpacity>
            </View>
        )
    }

    toOrdinal(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        if (j == 4) {
            return i + "th";
        }
        return "OT" + (i-4)
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

    _renderQuarterPoints = (linescore, opponent) => {
        let quarters = linescore.map((quarter, i) => {
            const textColor = quarter.score > opponent[i].score ? '#fff' : '#888';
            const textWeight = quarter.score > opponent[i].score ? 700 : 400
            return <MyText 
                        weight={textWeight}
                        style={[styles.quarterVal, {color: textColor}]}>{quarter.score}</MyText>;
        });
        return quarters;
    }

    _renderQuarters = (linescore) => {
        let quarters = linescore.map((quarter, index) => {
            return <MyText style={[styles.quarterVal, {color: '#666'}]}>{this.toOrdinal(index+1)}</MyText>;
        });
        return quarters;
    }

    _renderQuarterTitle = (linescore) => {
        let i = 0;
        let quarters = linescore.map((quarter) => {
            i++;
            if(i > 4) {
                return <MyText style={[styles.quarterVal, { color: '#888' }]}>{`OT${i-4}`}</MyText>
            }
            return <MyText style={[styles.quarterVal, { color: '#888' }]}>{`Q${i}`}</MyText>
        });
        return quarters;
    }

    _renderClock = () => {
        const params = {...this.props};
        return (
            <View>
                <MyText style={styles.divider}>:</MyText>
            </View>
        )
    }

    onContainerLayout = (e) => {
        const { height } = e.nativeEvent.layout;
        this.props.setChildHeight(height);
    }


    render() {
        const { hLeader, vLeader } = this.state;
        const { params, gameStats, gameData, handleScroll, headerHeight, scrollY } = this.props;
        return (
            <ScrollView
                onLayout={this.onContainerLayout}
                scrollEventThrottle={16}
                onScroll={
                    Animated.event([{nativeEvent: {contentOffset: {
                        y: scrollY}}
                    }], { listener: handleScroll})
                }
                contentContainerStyle={{ paddingTop: headerHeight + 5, paddingBottom: 20 }} 
                style={{ paddingHorizontal: 5 }}>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={1}
                    MyTextStyle={styles.toastMyText}
                />

                {/* <Card>
                    {this._renderQuarterly()}
                </Card> */}

                <Card>
                    {this._renderArticle()}
                </Card> 

                {
                    hLeader ? 
                    <Card title="Top players">
                        <GameLeader
                            navigation={this.props.navigation}
                            teamImage={params.hTeamImage}
                            teamColor={params.hTeam.primaryColor}
                            player={hLeader}
                        />
                        <View style={styles.itemDivider}></View>
                        <GameLeader
                            navigation={this.props.navigation}
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
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.fgm}
                            hTeamStat2={gameStats.hTeam.totals.fga}
                            vTeamStat={gameStats.vTeam.totals.fgm}
                            vTeamStat2={gameStats.vTeam.totals.fga}
                            isPct={true}
                            statName='FG%'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.tpm}
                            hTeamStat2={gameStats.hTeam.totals.tpa}
                            vTeamStat={gameStats.vTeam.totals.tpm}
                            vTeamStat2={gameStats.vTeam.totals.tpa}
                            isPct={true}
                            statName='3P%'/>
                        <StatCompare
                            hTeamColor={params.hTeam.primaryColor}
                            vTeamColor={params.vTeam.primaryColor}
                            hTeamStat={gameStats.hTeam.totals.ftm}
                            hTeamStat2={gameStats.hTeam.totals.fta}
                            vTeamStat={gameStats.vTeam.totals.ftm}
                            vTeamStat2={gameStats.vTeam.totals.fta}
                            isPct={true}
                            statName='FT%'/>
                    </Card> : null
                }

                {
                    gameData ?
                    <Card title="Game Info">
                        <View style={styles.infoContainer}>
                            <MyText style={styles.gameDetails}>{moment(gameData.startTimeUTC).format('ddd, MMM DD, YYYY   •  hh:mm A')}</MyText>
                            <MyText style={[styles.gameDetails, { color: '#aaa' }]}>{gameData.arena.name}  •  {gameData.arena.city}, {gameData.arena.stateAbbr}</MyText>
                        </View>
                    </Card> : null
                }
            </ScrollView>
        );
    }
}