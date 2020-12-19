import React, {Component} from 'react'
import {
    Platform,
    Text,
    View,
    Image,
    BackHandler,
    ToastAndroid,
} from 'react-native'
import {Card} from 'native-base'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
// import Voice from 'react-native-voice';
import Voice from '@react-native-community/voice'
import Tts from 'react-native-tts';


export default class Home extends Component {

  constructor(props) {
      super (props);
      const {voice} = this.props.route.params;
      this.state = {
          voice: voice,
          duplicateRemoval: 0
      }
  }

  componentDidMount() {
      Tts.setDucking(true);
  
      Tts.addEventListener('tts-finish', (event) => {this.startRecog (event)});

      Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
      if (this.state.voice)
          setTimeout (this.welcomeMessage, 100);
  }

  componentWillUnmount() {
      // Tts.stop();
      Voice.destroy();
      Voice.removeAllListeners()
  }


  welcomeMessage() {
    var speakText = 'Welcome to the geography quiz. Click on the Start button, or say start, to begin the quiz';
    Tts.getInitStatus().then(() => {
      Tts.speak(speakText)
    });
  
  }
  
  startRecog = (event) => {
    Voice.start ('en-IN');
  }

  toggleVoice = () => {
    this.setState ({
      voice: !this.state.voice
    }, () => {
      if (this.state.voice) {
        var utterance = 'Voice turned on. Say start to begin the quiz.';
        Tts.speak(utterance);
      }
      else {
        Tts.stop();
        Voice.destroy();
      }

      ToastAndroid.show('Voice commands: ' + (this.state.voice ? 'ON' : 'OFF'), ToastAndroid.LONG)
    })
  }
    
  onSpeechResultsHandler(event) {

    var understood = false;
    var negatives = ['NO', 'ISN\'T', 'NOT', 'DON\'T'];
    var startWords = ['Ok', 'Sure', 'Cool', 'Alright', 'Fine'];
    var sentence = event.value [0];
    let usedWord
    //console.log(sentence);
    var words = sentence.split(' ');
    //console.log(words);
    for (var i = 0; i < words.length; i++) {
      //console.log(words[i].toUpperCase())
      if (words[i].toUpperCase() === 'START' || words[i].toUpperCase() === 'BEGIN' || words[i].toUpperCase() === 'COMMENCE' || words[i].toUpperCase() === 'PLAY') {
        usedWord = words[i];
        understood = true;
        for  (var i = 0; i < words.length; i++) {
          if (this.isInArray(words[i].toUpperCase(), negatives)) {
              var startWord = startWords [Math.floor(Math.random() * startWords.length)];
              var utterance = startWord + '! I will not ' + usedWord + ' the quiz. So what would you like me to do?'
              Tts.speak(utterance);
              return;
          }
        }
        this.props.navigation.replace('Question', {voice: this.state.voice});
      }
      else if (words[i].toUpperCase() === 'INSTRUCTIONS' || words[i].toUpperCase() === 'HELP' || words[i].toUpperCase() === 'ABOUT') {
        understood = true;
        for  (var i = 0; i < words.length; i++) {
          if (this.isInArray (words[i].toUpperCase(), negatives)) {
              var startWord = startWords [Math.floor(Math.random() * startWords.length)];
              var utterance = startWord + '! I will not open the help page. So what would you like me to do?'
              Tts.speak(utterance);
              return;
          }
        }
        this.props.navigation.replace('About', {voice: this.state.voice});
      }
      else if (words[i].toUpperCase() === 'VOICE') {
        understood = true;
        for (var i = 0; i < words.length; i++) {
          if (words[i].toUpperCase() === 'OFF' || words[i].toUpperCase() === 'OF') {
            this.toggleVoice();
            return;
          }
          else if (words[i].toUpperCase() === 'ON') {
            var utterance = 'Voice is already on.';
            Tts.speak(utterance);
            return;
          }
        }
        var utterance = 'Sorry, I\'m not sure what you want me to do with the voice.';
        Tts.speak(utterance);
        return;
      }
      else if (words[i].toUpperCase() === 'EXIT' || words[i].toUpperCase() === 'QUIT' || words[i].toUpperCase() === 'CLOSE') {
        usedWord = words[i];
        understood = true;
        for  (var i = 0; i < words.length; i++) {
          if (this.isInArray(words[i].toUpperCase(), negatives)) {
              var startWord = startWords [Math.floor(Math.random() * startWords.length)];
              var utterance = startWord + '! I will not ' + usedWord + ' the app. So what would you like me to do?'
              Tts.speak(utterance);
              return;
          }
        }
        this.handleBackPress();
      }
    }
    //No matches
    if (!understood) {
      var utterance = 'Sorry, I didn\'t get that.';
      Tts.speak(utterance);
    }
  }
  
  isInArray(element, array) {
    for (var i = 0; i < array.length; i++) {
      if (element === array[i]) {
        return true;
      }
    }
    return false;
  }
  
  _navigateToAbout = () => {
      this.props.navigation.replace('About', {voice: this.state.voice})
  }

  _navigateToQuestion = () => {
      this.props.navigation.replace('Question', {voice: this.state.voice})
  }
    
  render() {
      return(
          <LinearGradient colors={['#0D92FF', '#13DBFF']} style={styles.container}>
              <Card style={styles.card}>
                  <View style={styles.row}>
                      <Image source={require('assets/images/earth.gif')} />
                      <Text style={styles.titleText}>Geography Quiz</Text>
                  </View>
                  <View style={{width: '100%', alignItems: 'center'}}>
                      <PrimaryButton title='Start' style={[styles.btn]} titleStyle={[styles.btnTitle]} onPress={this._navigateToQuestion} />
                      <SecondaryButton title='About' style={[styles.btn]} titleStyle={[styles.btnTitle]} onPress={this._navigateToAbout} />
                      <View style={[styles.row]}>
                        <SecondaryButton title='Exit' style={[styles.btn, styles.halfBtn]} titleStyle={[styles.btnTitle]} onPress={() => {BackHandler.exitApp()}} />
                        <SecondaryButton iconName={this.state.voice ? 'mic' : 'mic-off'} style={[styles.btn, styles.halfBtn]} titleStyle={[styles.btnTitle]} onPress={this.toggleVoice} />
                      </View>
                  </View>
              </Card>
          </LinearGradient>
      )
  }
}