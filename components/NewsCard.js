import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class NewsCard extends Component {
    render() {
        return (
            <Animatable.View 
                style={styles.card} 
                style={styles.card} 
                animation="fadeInUp"
                duration={300}
                delay={100}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>NEWS</Text>
                    <Text style={styles.title2}>SEE ALL</Text>
                </View>
                <View style={[styles.content, { borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headline}>
                            <Text 
                                numberOfLines={2}
                                style={styles.headlineValue}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia soluta dolore tempora velit ducimus debitis molestias a?
                            </Text>
                        </View>
                        <View style={styles.newsImage}>
                            <Image source={require('../assets/images/andre.jpg')} style={styles.image}/>
                        </View>
                    </View>
                    <Text style={styles.author}>The Athletic - 1hr</Text>
                </View>
                <View style={[styles.content]}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headline}>
                            <Text 
                                numberOfLines={2}
                                style={styles.headlineValue}>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia soluta dolore tempora velit ducimus debitis molestias a?
                            </Text>
                        </View>
                        <View style={styles.newsImage}>
                            <Image source={require('../assets/images/andre.jpg')} style={styles.image}/>
                        </View>
                    </View>
                    <Text style={styles.author}>The Athletic - 1hr</Text>
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
        paddingVertical: 20,
        borderBottomColor: '#444'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    cardTitle: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        fontSize: 14,
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
    headline: {
        width: '75%',
    },
    headlineValue: {
        paddingLeft: 5,
        paddingRight: 10,
        lineHeight: 22,
        fontSize: 15,
        color: 'white',
        fontFamily: 'Roboto-Medium',
    },
    newsImage: {
        height: 70,
        width: 70,
        borderRadius: 9,
        marginHorizontal: 15
    },
    image: {
        borderRadius: 9,
        height: '100%',
        width: '100%'
    },
    author: {
        marginTop: -15,
        paddingLeft: 5,
        fontSize: 12,
        color: 'white'
    }
});
