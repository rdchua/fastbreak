import React, { Component } from 'react';
import { View, ScrollView, FlatList, Image } from 'react-native';
import { styles } from './PlayByPlayStyles';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import * as api from './../../api/data_nba_endpoints';
const utils = require('./../../utilities/helper');
import MyText from './../../components/MyText/MyText';


export default class PlayByPlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            loading: true,
        }
    }

    componentDidMount() {
        this.fetchPbp();
    }

    async fetchPbp() {
        const params = this.props.params;
        let promises = [];
        for(let i = 1; i <= params.period.maxRegular; i++) {
            promises.push(fetch(api.PBP(params.date, params.gameId, i)).then((response) => response.json()));
        }
        let response = await Promise.all(promises);
        this.setState({ loading: false, pbp: response });
    }


    getButtonStyle() {
        return {
            paddingHorizontal: 25
        }
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
        return i + "th";
    }

    _renderSegmentButton = (pbp) => {
        let quarters = pbp.map((quarter, index) => {
            return (
                <Button
                    handlePress={() => this.changePeriod(index)}
                    active={index == this.state.index ? true : false}
                    text={this.toOrdinal(index+1)}
                    style={this.getButtonStyle()}/>
            )
        });
        return quarters;
    }

    _renderScore = (thisTeamScore, otherTeamScore, isAway) => {
        let isWinner = parseInt(thisTeamScore) > parseInt(otherTeamScore);
        const style = [
            isWinner ? styles.teamScoreWinner : styles.teamScoreLoser, 
            isAway ? styles.roundedCornerRight : styles.roundedCornerLeft
        ];

        return <MyText style={style}>{thisTeamScore}</MyText>;
    }

    formatPlay(text) {
        let formatted = text.replace(/ *\[[^\]]*]/, '').trim();
        return formatted;
    }

    _renderPlay = (play) => {
        let teamImage;
        let team;
        if(play.teamId == this.props.params.hTeam.teamId) {
            team = utils.getTeam(play);
            teamImage = utils.getTeamImage(this.props.params.hTeam.tricode);
        } else if(play.teamId == this.props.params.vTeam.teamId) {
            team = utils.getTeam(play);
            teamImage = utils.getTeamImage(this.props.params.vTeam.tricode);
        }
        return (
            <View style={styles.row}>
                <View style={[styles.clockContainer, {backgroundColor: team ? team.primaryColor: '#fff'}]}>
                    <MyText weight={500} style={[styles.clock, {color: team ? '#fff': '#000'}]}>{play.clock}</MyText>
                </View>
                {/* <View style={styles.imageContainer}>
                {
                    teamImage ?
                    <Image source={teamImage} style={styles.image} /> : null
                }
                </View> */}
                <MyText style={styles.play}>{this.formatPlay(play.description)}</MyText>
            </View>
        )
    }

    changePeriod = (index) => {
        this.setState({ index: index });
    }

    render() {
        const state = {...this.state};
        if(state.loading) {
            return <Loading/>
        }
        return (
            <View style={[styles.contentContainer, { paddingTop: 50 }]}>
                <Card>
                    <FlatList
                        ListHeaderComponent={
                            <View style={styles.segmentContainer}>
                                {this._renderSegmentButton(state.pbp)}
                            </View>
                        }
                        stickyHeaderIndices={[0]}
                        showsVerticalScrollIndicator={false}
                        extraData={state.index}
                        data={state.pbp[state.index].plays}
                        renderItem={({item}) => this._renderPlay(item)}/>
                </Card>
            </View>
        );
    }
}