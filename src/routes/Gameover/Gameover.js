import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    BackHandler,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {Card} from 'native-base'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import styles from './styles'
import * as Progress from 'react-native-progress'
import Confetti from 'react-native-confetti'
import Voice from '@react-native-community/voice'
import Tts from 'react-native-tts'

export default class GameOver extends Component {
    constructor(props) {
        super(props);
        const {score, voice} = this.props.route.params;
        this.state = {
            score: score,
            voice: voice,
        }
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        BackHandler.addEventListener ('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        Tts.stop()
        this._confettiView.startConfetti();
        if (this.state.voice)
            this.announceResults()
        
    }

    componentWillUnmount () {
        Voice.destroy()
        BackHandler.removeEventListener ('hardwareBackPress', this.handleBackPress);
        Voice.removeAllListeners()
      }

    announceResults () {
        var speakText = 'Quiz finished. Your score is ' + this.state.score + ' out of 10.'
        Tts.speak(speakText);
    }

    handleBackPress = () => {
        this.props.navigation.replace('Home', {voice: this.state.voice});
        return true;
    }

    onSpeechResultsHandler (event) {

        var understood = false;
        var negatives = ['NO', 'ISN\'T', 'NOT', 'DON\'T'];
        var startWords = ['Ok', 'Sure', 'Cool', 'Alright', 'Fine'];
        var sentence = event.value [0];
        var words = sentence.split (' ');
        for (var i = 0; i < words.length; i++) {
          if (words[i].toUpperCase () === 'RESTART' || (words[i].toUpperCase() === 'PLAY' && words[i + 1].toUpperCase() === 'AGAIN')) {
            understood = true;
            for  (var i = 0; i < words.length; i++) {
              if (this.isInArray (words[i].toUpperCase (), negatives)) {
                  var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                  var utterance = startWord + ', I won\'t restart the quiz. So what would you like me to do?'
                  Tts.speak (utterance);
                  return;
              }
            }
            this.props.navigation.replace('Questions', {voice: this.state.voice});
          }
          else if (words[i].toUpperCase () === 'MENU') {
            understood = true;
            for  (var i = 0; i < words.length; i++) {
              if (this.isInArray (words[i].toUpperCase (), negatives)) {
                  var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                  var utterance = startWord + ', I won\'t return to the menu. So what would you like me to do?'
                  Tts.speak (utterance);
                  return;
              }
            }
            this.props.navigation.replace('Home', {voice: this.state.voice});
          }
          else if (words[i].toUpperCase () === 'EXIT' || words[i].toUpperCase () === 'QUIT' || words[i].toUpperCase () === 'CLOSE') {
            understood = true;
            usedWord = words[i];
            for  (var i = 0; i < words.length; i++) {
              if (this.isInArray (words[i].toUpperCase (), negatives)) {
                  var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                  var utterance = startWord + ', I won\'t ' + usedWord + ' the app. So what would you like me to do?'
                  Tts.speak (utterance);
                  return;
              }
            }
            BackHandler.exitApp ();
          }
        }
        //No matches
        if (!understood) {
          utterance = 'Sorry, I didn\'t get that.';
          Tts.speak (utterance);
        }
      }
    
    isInArray (element, array) {
        for (var i = 0; i < array.length; i++) {
            if (element === array[i]) {
                return true;
            }
        }
        return false;
    }

    render() {
        const {score} = this.state;

        return(
            <LinearGradient colors={['#0D92FF', '#13DBFF']} style={styles.container}>
                <Card style={styles.card}>
                    <Confetti
                        ref={(node) => this._confettiView = node}
                        colors={['#0D92FF', '#13DBFF']}
                    />
                    <Text style={styles.title}>Quiz Finished   </Text>
                    <Progress.Circle
                        animated={false}
                        progress={score * 0.1}
                        size={100}
                        borderWidth={3}
                        color='#0D92FF'
                        endAngle={score * 0.1}
                        showsText={true}
                        textStyle={styles.progressCircle}
                        formatText={(progress) => {return score*10 + '% '}}
                        thickness={3}
                        direction='clockwise'
                        strokeCap='square'
                    />
                    <View style={styles.row}>
                        <Text style={styles.scoreLabel}>Your Score: </Text>
                        <Text style={styles.score}>{score}/10</Text>
                    </View>
                    <View style={styles.buttons}>
                        <PrimaryButton style={styles.btn} title='Play Again' titleStyle={styles.btnTitle} onPress={() => {this.props.navigation.replace('Question', {voice: this.state.voice})}} />
                        <SecondaryButton  style={styles.btn} title='Main Menu' titleStyle={styles.btnTitle} onPress={() => {this.props.navigation.replace('Home', {voice: this.state.voice})}} />
                    </View>
                </Card>
            </LinearGradient>
        );
    }
}