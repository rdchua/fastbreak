import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import NewsCard from '../components/NewsCard';
import NewsCardSquare from '../components/NewsCardSquare';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                {/* <StatusBar translucent={true} backgroundColor='rgba(0,0,0,0.5)' barStyle='light-content'/> */}
                <Image source={require('../assets/images/andre.jpg')} style={styles.hero}/>
                <LinearGradient
                    colors={['transparent', 'rgba(18, 19, 20, 0.3)', 'rgba(18, 19, 20, 0.5)', 'rgba(18, 19, 20, 1)']}
                    style={styles.heroContainer}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTextSnip}>FEATURED</Text>
                        <Text style={styles.heroText}>Andre Iguoadla hits the game winner. Ties the series 1-1.</Text>
                    </View>
                </LinearGradient>
                <ScrollView horizontal={true} style={{ marginTop: -40, marginBottom: 10 }} >
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare/>
                    </View>
                    <View style={{ paddingRight: 10 }}>
                        <NewsCardSquare/>
                    </View>
                </ScrollView>
                <NewsCard/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 30,
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#121314',
    },
    pageHeader: {
        lineHeight: 35,
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold',
    },
    heroContainer: {
        marginHorizontal: -8,
        position: 'relative',
        height: 300,
        marginBottom: 10,
    },
    hero: {
        position: 'absolute',
        width: screenWidth,
        height: 300
    },
    heroTextContainer: {
        width: screenWidth,
        position: 'absolute',
        bottom: 40,
        left: 20,
        zIndex: 3,
        paddingRight: 100
    },
    heroText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    heroTextSnip: {
        color: '#fff',
        marginBottom: 5,
        fontSize: 12,
        letterSpacing: 1
    }
})