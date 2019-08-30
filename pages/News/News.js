import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './NewsStyles';

import Report from '../../components/Report/Report';
import NewsCardSquare from '../../components/NewsCardSquare';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import _ from 'underscore';
import './NewsStyles';
import ReportCard from '../../components/ReportCard/ReportCard';

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        Promise.all([
            fetch(`https://wrapapi.com/use/rdchua30/fastbreak/nbanews/0.0.4?page=1&wrapAPIKey=7F9HjhAhwEYJKuPC2WhfCBTICMKnhIrd`)
                .then((response) => response.json()),
            fetch(`https://wrapapi.com/use/rdchua30/fastbreak/nbanews/0.0.4?page=2&wrapAPIKey=7F9HjhAhwEYJKuPC2WhfCBTICMKnhIrd`)
                .then((response) => response.json()),
            fetch(`https://clutchpoints.4taps.me/articles/?category=nba&limit=20&user_id=undefined`)
                .then((response) => response.json())
        ]).then(([page1, page2, page3]) => {
            page1 = page1.data.articles;
            page2 = page2.data.articles;
            page3 = page3.results;
            let articles = page1.concat(page2).concat(page3);
            articles = _.sortBy(articles, (article) => {
                return article.date ? (moment(article.author.split('|')[1]).format('MM/DD/YYYY hh:mm A')) : (moment.unix(article.created).format('MM/DD/YYYY hh:mm A'));
            });
            this.setState({
                articles: articles.reverse(),
                loading: false,
                refreshing: false
            });
            console.log(this.state);
        }).catch((err) => console.log(err));
    }

    render() {
        if(this.state.loading) { 
            return(<Text>Loading</Text>)
        }
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                <Image source={{ uri: this.state.articles[3].cover }} style={styles.hero}/>
                <LinearGradient
                    colors={['transparent', 'rgba(18, 19, 20, 0.3)', 'rgba(18, 19, 20, 0.5)', 'rgba(18, 19, 20, 1)']}
                    style={styles.heroContainer}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTextSnip}>FEATURED</Text>
                        <Text style={styles.heroText} numberOfLines={3}>{this.state.articles[3].title}</Text>
                    </View>
                </LinearGradient>
                <ScrollView horizontal={true} style={{ marginTop: -40, marginBottom: 10 }} >
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare article={this.state.articles[0]}/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare article={this.state.articles[1]}/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare article={this.state.articles[2]}/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare article={this.state.articles[4]}/>
                    </View>
                </ScrollView>
                <ReportCard/>
            </ScrollView>
        );
    }
}