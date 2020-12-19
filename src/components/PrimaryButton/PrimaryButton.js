import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
} from 'react-native'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class PrimaryButton extends Component {
    render() {
        const {style, titleStyle, title, onPress} = this.props

        return(
            <TouchableOpacity style={[styles.btnStyle, style]} onPress={onPress}>
                <Text style={[titleStyle, styles.title]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}