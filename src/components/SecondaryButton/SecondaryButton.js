import React, {Component} from 'react'
import {
    Platform,
    View,
    Text
} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import styles from './styles'

export default class PrimaryButton extends Component {
    render() {
        const {style, titleStyle, title, onPress, iconName} = this.props

        return(
            <TouchableOpacity style={[styles.btnStyle, style]} onPress={onPress}>
                {title && <Text style={[titleStyle, styles.title]}>{title}</Text>}
                {iconName && <MaterialIcons name={iconName} color='#0D92FF' size={30} />}
            </TouchableOpacity>
        )
    }
}