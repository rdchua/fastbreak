import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { styles } from './PlayByPlayStyles';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';


export default class PlayByPlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    getButtonStyle() {
        return {
            paddingVertical: 5, 
            flex: 1, 
            paddingHorizontal: 0, 
            marginHorizontal: 5
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
                    backgroundColor='#178CFF' 
                    text={this.toOrdinal(index+1)}
                    style={this.getButtonStyle()}/>
            )
        });
        return quarters;
    }

    changePeriod = (index) => {
        this.setState({ index: index });
    }

    render() {
        const props = {...this.props};
        if(props.loading) {
            return <Loading/>
        }
        console.log(props);
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Card>
                    <View style={styles.segmentContainer}>
                        {this._renderSegmentButton(props.pbp)}
                    </View>
                    <FlatList
                        data={props.pbp[this.state.index].plays}
                        renderItem={({item}) => {
                            <Text style={{color: 'white'}}>{item.formatted.description}</Text>
                        }} />
                </Card>
            </ScrollView>
        );
    }
}