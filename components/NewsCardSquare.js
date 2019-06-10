import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

export default class NewsCardSquare extends Component {
    render() {
        return (
            <Animatable.View 
                style={styles.card} 
                style={styles.card} 
                animation="fadeInUp"
                duration={300}
                delay={100}>
                    <View style={styles.content}>
                        <LinearGradient
                            colors={['transparent', 'rgba(18, 19, 20, 0.3)', 'rgba(18, 19, 20, 0.5)', 'rgba(18, 19, 20, 1)']}
                            style={styles.gradient}>
                        </LinearGradient>
                        <Image source={require('../assets/images/andre.jpg')} style={styles.image}/>
                        <View style={styles.textContainer}>
                            <Text style={styles.text} numberOfLines={2}>Andre Hits the game winner to save the dubs.</Text>
                        </View>
                    </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        backgroundColor: '#1F2022',
        width: 120,
        height: 155,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#2f2f2f'
    },
    gradient: {
        borderRadius: 9,
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 2
    },
    contentContainer: {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 18
    },
    textContainer: {
        bottom: 5,
        position: 'absolute',
        paddingVertical: 15,
        paddingLeft: 10,
        paddingRight: 10,
        zIndex: 3
    },
    image: {
        borderRadius: 9,
        position: 'absolute',
        left: 0,
        top: 0,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        height: '100%',
        width: '100%'
    }
});
