import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './DropdownStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import MyText from '../MyText/MyText';

export default class Dropdown extends Component {

    dropdownRenderRow = (rowData, rowID, highlighted) => {
        return (
            <TouchableOpacity style={{width: 150}}>
                <View style={styles.dropdownList}>
                    <MyText style={styles.dropdownListText}>
                        {`${rowData}`}
                    </MyText>
                </View>
            </TouchableOpacity>
        );
    }

    dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let key = `spr_${rowID}`;
        return (
            <View style={styles.dropdownSeparator} key={key}/>
        );
    }

    render() {
        const { onItemSelected, dropdownText, options, textStyle, textWeight, containerStyle } = this.props;
        return (
            <ModalDropdown
                dropdownStyle={styles.dropdownList} 
                dropdownTextStyle={styles.dropdownListText}
                renderRow={this.dropdownRenderRow}
                renderSeparator={(sId, rId, highlighted) => this.dropdownRenderSeparator(sId, rId, highlighted)}
                onSelect={(index, value) => onItemSelected(index, value)}
                options={options}>
                <View style={[styles.dropdown, containerStyle]}>
                    <MyText weight={textWeight} style={[styles.dropdownText, textStyle ]}>{dropdownText}</MyText>
                    <Icon name='caretdown' size={9} style={styles.dropdownIcon}/>
                </View>
            </ModalDropdown>
        );
    }
}