import React, { Component } from 'react';
import { View, FlatList, ScrollView, Animated } from 'react-native';
import { styles } from './PlayerNewsStyles';
import Card from '../../../components/Card/Card';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import ReportText from '../../../components/ReportText/ReportText';

export default class PlayerNews extends Component {

    render() {
        const { headerHeight, news, paddingHeight } = this.props;
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    paddingTop: paddingHeight ? (paddingHeight + 5) : (headerHeight + 5),
                    paddingHorizontal: 5
                }}
                onScroll={
                    Animated.event([{nativeEvent: {contentOffset: {
                        y: this.props.screenProps.scrollY}}
                    }], { listener: this.props.screenProps.updateIsScrolling})
                }>
                    <Card>
                        {
                            news ?
                            <FlatList
                                style={{marginTop: -10}}
                                data={news}
                                keyExtractor={(item, index) => item.RotoId}
                                renderItem={({item, index}) => 
                                    <ReportText
                                        title={item.ListItemCaption}
                                        description={item.ListItemDescription}
                                        date={item.ListItemPubDate}/>
                                }/> :
                            <Placeholder>
                                <PlaceholderLine width={80} style={{ backgroundColor: '#555' }}/>
                                <PlaceholderLine style={{ backgroundColor: '#555' }}/>
                                <PlaceholderLine width={30} style={{ backgroundColor: '#555' }}/>
                            </Placeholder>
                        }
                    </Card>
            </ScrollView>
        );
    }
}