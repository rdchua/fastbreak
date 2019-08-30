import React, { Component } from 'react';
import { View, ScrollView, Animated, FlatList, StatusBar } from 'react-native';
import { styles } from './TeamOverviewStyles';
import Reactotron from 'reactotron-react-native';
import * as theme from './../../../Theme';
/**
 * import custom components here
 */
import Card from '../../../components/Card/Card';
import Headline from '../../../components/Headline/Headline';
import Report from '../../../components/Report/Report';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import ReportCard from '../../../components/ReportCard/ReportCard';
import MyText from '../../../components/MyText/MyText';

export default class TeamOverview extends Component {

    _renderReports = (rss) => {
        if(!rss) {
            return (
                <Placeholder
                    Animation={Fade}>
                        <PlaceholderLine width={80} style={{ backgroundColor: 'black' }}/>
                        <PlaceholderLine style={{ backgroundColor: 'black' }}/>
                        <PlaceholderLine width={30} style={{ backgroundColor: 'black' }}/>
                </Placeholder>
            )
        } 
        return (
            <FlatList
                data={rss}
                keyExtractor={(item, index) => item.guid}
                renderItem={({item, index}) => (
                    <Report
                        title={item.title}
                        description={item.description}
                        image={item.enclosure.link}
                        author={item.author}
                        date={item.pubDate}
                        link={item.link}/>
                )}/>
        )
    }

    _renderOtherNews = (news) => {
        if(!news) {
            return
        }
        return (
            <View>
                <MyText weight={700} style={{color: 'white', marginTop: 15}}>OTHER NEWS</MyText>
                <FlatList
                    data={news}
                    style={{ marginTop: 15}}
                    horizontal={true}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <ReportCard
                            style={{ marginRight: 15}}
                            image={item.cover}
                            title={item.title}/>
                    )}/>
            </View>
        )
    }

    onContainerLayout = (e) => {
        const { height } = e.nativeEvent.layout;
        this.props.updateChildHeight(height);
    }

    render() {
        const { screenProps, headline, rss, news } = this.props;
        return (
            <ScrollView
                onLayout={this.onContainerLayout}
                style={{ flex: 1, backgroundColor: theme.bgColor }}
                contentContainerStyle={{ paddingTop: screenProps.scrollViewHeight, backgroundColor: '#121314' }}
                onScroll={
                    Animated.event([{nativeEvent: {contentOffset: {
                        y: this.props.screenProps.scrollY}}
                    }], { listener: this.props.screenProps.updateIsScrolling})
                }>
                <StatusBar backgroundColor={theme.cardBgColor}/>
                <View style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                    <Card title='Latest News' subtitle='See all'>
                        <Headline 
                            headline={headline} 
                            loading={headline ? false : true}/>
                        {this._renderReports(rss)}
                        {this._renderOtherNews(news)}
                    </Card>
                </View>
            </ScrollView>
        );
    }
}