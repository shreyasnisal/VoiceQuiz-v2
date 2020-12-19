import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
} from 'react-native'
import {Card} from 'native-base'
import styles from './styles'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import { ScrollView } from 'react-native-gesture-handler'
import IconFas from 'react-native-vector-icons/dist/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Tts from 'react-native-tts'

export default class About extends Component {

    constructor(props) {
        super(props)
        Tts.stop()
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.appBar}>
                    <TouchableOpacity style={styles.prefixBtn} onPress={() => this.props.navigation.replace('Home', {voice: this.props.route.params.voice})}>
                        <MaterialIcons name='arrow-back' size={30} color='#fff' />
                    </TouchableOpacity>
                    <Text style={styles.appBarText}>About    </Text>
                </View>
                <Card style={styles.card}>
                    <ScrollView>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>About Voice Quiz</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.infoText}>Voice Quiz is a completely voice-controlled quiz application. The aim is to use a voice interface to make learning more fun. If you're enjoying the game or like the idea behind it, do give it a rating on the store!</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.subHeading, styles.bold]}>Important points to remember while playing:</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.infoText, styles.bold]}>1. Speak after the 'beep':</Text><Text style={styles.infoText}>At the end of anything that the app says, you will hear a 'beep' sound, which indicates that the app has started listening to what you are saying. Make sure you start speaking only after the beep. Also, do not wait for more than 3 seconds after the beep to start speaking. If you do, a second beep will indicate that the app has stopped listening for speech.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.infoText, styles.bold]}>2. Proper Nouns are difficult to detect:</Text><Text style={styles.infoText}>Although the app will usually detect the name of the city you speak, it might sometimes be difficult to detect the city names. In that case, use an alternate option to mark your answer.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.infoText, styles.bold]}>3. If you miss answering via voice, use the checkboxes:</Text><Text style={styles.infoText}>If you do not answer within 3 seconds of the question being asked, you can no longer answer using voice. In that case, use the checkboxes to mark the answer.</Text>
                        </View>
                        <View style={[styles.textContainer, {marginBottom: 40}]}>
                            <Text style={[styles.infoText, styles.bold]}>4. Lots of hidden features:</Text><Text style={styles.infoText}>Other than just detecting answers, there's a lot that Voice Quiz can do. For example, try asking it to NOT do something, or say that some option is NOT the answer, and see what response you get. You can also ask the app to read out options, repeat the question (or repeat the country name), or answer by saying that answer is the THIRD option, or the LAST option, etc. Explore by speaking in different ways to the app.</Text>
                        </View>
                    </ScrollView>
                </Card>
                <View style={styles.creditsContainer}>
                    <Text style={styles.credits}>Developed with <MaterialCommunityIcons name='heart' size={20} /> by Shreyas Nisal</Text>
                </View>
            </View>
        )
    }
}