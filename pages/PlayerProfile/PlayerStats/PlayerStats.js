import React, { Component } from 'react';
import { ScrollView, Dimensions, View, FlatList, Animated } from 'react-native';
import { styles } from './PlayersStatsStyles';
import Loading from '../../../components/Loading/Loading';
import reactotron from 'reactotron-react-native';
import Card from '../../../components/Card/Card';
import * as theme from '../../../Theme';
import * as utils from '../../../utilities/helper';

import { LineChart } from 'react-native-chart-kit';
import StatTrio from '../../../components/StatTrio/StatTrio';
import Dropdown from '../../../components/Dropdown/Dropdown';
import MyText from '../../../components/MyText/MyText';
import Button from '../../../components/Button/Button'
const screenWidth = Dimensions.get('window').width;
const indices = {
    career: {
        pts: 23,
        reb: 17,
        ast: 18,
        stl: 19,
        blk: 20,
        fg: 8,
        three: 11,
        ft: 14,
        oreb: 15,
        dreb: 16,
        tov: 21
    },
    season: {
        pts: 29,
        reb: 21,
        ast: 22,
        stl: 24,
        blk: 25,
        fg: 12,
        three: 15,
        ft: 18,
        oreb: 19,
        dreb: 20,
        tov: 23
    },
}

export default class PlayerStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownText: 'Career',
            careerIndex: 23,
            seasonIndex: 29,
            filterVal: 'pts'
        };
    }

    onItemSelected(index, value) {
        const { careerStats, statsByYear } = this.props;
        const i = indices.career;
        const j = indices.season;
        const selectedYear = statsByYear[index - 1]; //deduct by 1 because first option is always career
        if (index == 0) {
            this.setState({
                pts: careerStats[i.pts],
                reb: careerStats[i.reb],
                ast: careerStats[i.ast],
                stl: careerStats[i.stl],
                blk: careerStats[i.blk],
                fg: careerStats[i.fg],
                three: careerStats[i.three],
                ft: careerStats[i.ft],
                oreb: careerStats[i.oreb],
                dreb: careerStats[i.dreb],
                tov: careerStats[i.tov],
                dropdownText: value
            });
        } else {
            this.setState({
                pts: selectedYear[j.pts],
                reb: selectedYear[j.reb],
                ast: selectedYear[j.ast],
                stl: selectedYear[j.stl],
                blk: selectedYear[j.blk],
                fg: selectedYear[j.fg],
                three: selectedYear[j.three],
                ft: selectedYear[j.ft],
                oreb: selectedYear[j.oreb],
                dreb: selectedYear[j.dreb],
                tov: selectedYear[j.tov],
                dropdownText: value
            });
        }
    }

    getModalOptions() {
        const { statsByYear } = this.props;
        let seasons = [];
        seasons.push('Career');
        statsByYear.forEach(year => {
            seasons.push(`${year[1]} (${year[3]})`);
        });
        return seasons;
    }

    getChartData() {
        const { statsByYear } = this.props;
        let seasonNames = [];
        let seasonValues = [];
        statsByYear.forEach(year => {
            seasonNames.push(`${year[1].substr(year[1].length - 5)}'`)
            seasonValues.push(year[this.state.seasonIndex]);
        });
        return {
            names: seasonNames,
            values: seasonValues
        }
    }

    updateChart(filter) {
        this.setState({
            careerIndex: indices.career[filter],
            seasonIndex: indices.season[filter],
            filterVal: filter
        });
    }

    render() {
        const { careerStats, statsByYear, headerHeight } = this.props;
        const { careerIndex, filterVal } = this.state;
        if (!careerStats || !statsByYear) {
            return <Loading />;
        }
        const data = {
            labels: this.getChartData().names.slice(0, 5).reverse(),
            datasets: [
                {
                    data: this.getChartData().values.slice(0, 5).reverse(),
                    color: (opacity = 1) => theme.accentColor,
                    strokeWidth: 2 // optional
                },
                {
                    data: [careerStats[careerIndex],careerStats[careerIndex],careerStats[careerIndex],careerStats[careerIndex],careerStats[careerIndex]],
                    color: (opacity = 1) => '#FEBE51',
                    strokeWidth: 2 // optional
                }
            ]
        };
        const chartConfig = {
            backgroundGradientFrom: theme.cardBgColor,
            backgroundGradientTo: theme.cardBgColor,
            decimalPlaces: 1,
            color: (opacity = 1) => '#888',
            strokeWidth: 2 // optional, default 3
        }
        const filters = [
        {
            name: 'POINTS',
            filter: 'pts'
        }, {name: 'REBOUNDS', filter: 'reb'}, {name: 'ASSISTS', filter: 'ast'}, {name: 'STEALS', filter: 'stl'}, {name: 'BLOCKS', filter: 'blk'}, {name: 'FG%', filter: 'fg'}, {name: 'TURNOVERS', filter: 'tov'}];
        return (
            <ScrollView
                ref='scrollView'            
                style={styles.container}
                contentContainerStyle={{
                    paddingTop: headerHeight + 5,
                    paddingHorizontal: 5
                }}
                onScroll={
                    Animated.event([{nativeEvent: {contentOffset: {
                        y: this.props.screenProps.scrollY}}
                    }], { listener: this.props.screenProps.updateIsScrolling})
                }>
                <Card>
                    <Dropdown
                        containerStyle={{ marginBottom: 10, paddingLeft: 5 }}
                        textWeight={700}
                        textStyle={{
                            color: 'white',
                            textTransform: 'uppercase'
                        }}
                        options={this.getModalOptions()}
                        dropdownText={this.state.dropdownText}
                        onItemSelected={this.onItemSelected.bind(this)}
                    />
                    <StatTrio
                        style={{ paddingHorizontal: 5 }}
                        stat1={this.state.pts ? this.state.pts : careerStats[23]}
                        stat1Name='Points'
                        stat2={this.state.reb ? this.state.reb : careerStats[17]}
                        stat2Name='Rebounds'
                        stat3={this.state.ast ? this.state.ast : careerStats[18]}
                        stat3Name='Assists'
                        stat4={this.state.stl ? this.state.stl : careerStats[19]}
                        stat4Name='Steals'
                    />
                    <StatTrio
                        style={{ paddingHorizontal: 5, marginTop: 15 }}
                        stat1={this.state.blk ? this.state.blk : careerStats[20]}
                        stat1Name='Blocks'
                        stat2={((this.state.fg ? this.state.fg : careerStats[8]) * 100).toFixed(1)}
                        stat2Name='FG%'
                        stat3={((this.state.three ? this.state.three : careerStats[11]) * 100).toFixed(1)}
                        stat3Name='3P%'
                        stat4={((this.state.ft ? this.state.ft : careerStats[14]) * 100).toFixed(1)}
                        stat4Name='FT%'
                    />
                    <StatTrio
                        style={{ paddingHorizontal: 5, marginTop: 15 }}
                        stat1={this.state.oreb ? this.state.oreb : careerStats[15]}
                        stat1Name='Offensive Rebounds'
                        stat2={this.state.dreb ? this.state.dreb : careerStats[16]}
                        stat2Name='Defensive Rebounds'
                        stat3={this.state.tov ? this.state.tov : careerStats[21]}
                        stat3Name='Turnovers'
                        stat4='&nbsp;'
                        stat4Name='&nbsp;'
                    />
                </Card>
                <Card>
                    <MyText weight={700} style={{color: 'white'}}>COMPARISON</MyText>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 10}}
                        horizontal={true}
                        data={filters}
                        keyExtractor={(item, index) => item}
                        renderItem={({item, index}) => (
                            <Button 
                                handlePress={() => this.updateChart(item.filter)}
                                style={{marginRight: 10}} 
                                active={filterVal == item.filter}
                                text={item.name} />
                        )}/>
                    <View style={{ margin: -15, marginTop: 15 }}>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#888'} ]}></View>
                                <MyText weight={500} style={styles.legendText}>Career</MyText>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: theme.accentColor} ]}></View>
                                <MyText weight={500} style={styles.legendText}>Current Season</MyText>
                            </View>
                        </View>
                        <LineChart
                            fromZero={true}
                            data={data}
                            width={screenWidth - 50}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}
