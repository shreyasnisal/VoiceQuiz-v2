import React, {Component} from 'react'
import {
    View,
    Text,
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import styles from '../../routes/Home/styles'

export default class OptionBox extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const {label, labelStyle, iconSize, selected, onPress, primaryColor, secondaryColor, style} = this.props
        return(
                <TouchableOpacity style={[styles.option, style]} onPress={onPress}>
                    <View style={styles.row}>
                    <MaterialIcons name={selected ? 'check-box' : 'check-box-outline-blank'} size={iconSize} color={primaryColor} />
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                    </View>
                </TouchableOpacity>
        )
    }
}