import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    Dimensions,
    BackHandler,
} from 'react-native'
import {Card} from 'native-base'
import styles from './styles'
import OptionBox from 'components/OptionBox/OptionBox'
import * as Progress from 'react-native-progress'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as questions from '../../constants/questions_data.json'
import Voice from '@react-native-community/voice'
import Tts from 'react-native-tts'

let usedQids = []

export default class Question extends Component {
    constructor(props) {
        super(props)
        const {voice} = this.props.route.params;
        this.state = {
            selectedOption: '',
            question: '',
            option1: '',
            option1PrimaryColor: '#0D92FF',
            option2: '',
            option2PrimaryColor: '#0D92FF',
            option3: '',
            option3PrimaryColor: '#0D92FF',
            option4: '',
            option4PrimaryColor: '#0D92FF',
            answer: '',
            question_number: 1,
            score: 0,
            disableInput: false,
            voice: voice,
            loading: true,
            keyword: '',
            key: '',
        }

        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    componentDidMount () {
        Tts.stop()
        this.getQuestion ();
    }

    componentWillUnmount () {
        // Tts.stop();
        Voice.destroy();
        Voice.removeAllListeners()
        BackHandler.removeEventListener ('hardwareBackPress', this._onBackPress);
      }

    _onBackPress = () => {
        this.props.navigation.replace('Home')
        return true;
    }

    arrayContains = (array, element) => {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === element) return true;
        }
        return false;
    }

    resetState = async () => {
        this.setState({
            option1PrimaryColor: '#0D92FF',
            option2PrimaryColor: '#0D92FF',
            option3PrimaryColor: '#0D92FF',
            option4PrimaryColor: '#0D92FF',
            selectedOption: '',
            disableInput: false,
        })
    };

    getQuestion = () => {
        var q_no;
        do {
          q_no = Math.floor(Math.random() * 90);
        } while (this.arrayContains(usedQids, q_no));
        usedQids.push(q_no);
        this.setState({
          loading: false,
          question: questions[q_no].question,
          option1: questions[q_no].option1,
          option2: questions[q_no].option2,
          option3: questions[q_no].option3,
          option4: questions[q_no].option4,
          answer: questions[q_no].answer,
          keyword: questions[q_no].keyword,
          key: questions[q_no].key,
        }, () => {
            if (this.state.voice)
                this.readQuestion();
        });
      }

      finishQuiz = () => {
          this.props.navigation.replace('Gameover', {score: this.state.score});
      }

      skipButton = () => {
        const {option1, option2, option3, option4,
            selectedOption, answer, score} = this.state

        this.setState({selectedOption: answer})

        if (option1 === answer) {
            this.setState({option1PrimaryColor: '#00ff00'})
        }
        else if (option2 === answer) {
            this.setState({option2PrimaryColor: '#00ff00'})
        }
        else if (option3 === answer) {
            this.setState({option3PrimaryColor : '#00ff00'})
        }
        else if (option4 === answer) {
            this.setState({option4PrimaryColor: '#00ff00'})
        }

        this.setState({disableInput: true});
        setTimeout(() => {
            this.setState({
                question_number: this.state.question_number + 1
            }, () => {
                if (this.state.question_number === 11) {
                    this.finishQuiz();
                }
                else {
                    this.resetState();
                    this.getQuestion();
                }
            })
        }, 1000);
      }

      submitButton = () => {

        const {option1, option2, option3, option4,
            selectedOption, answer, score} = this.state


        if (selectedOption === answer) {
            //correct answer
            if (selectedOption === option1) {
                this.setState({
                    option1PrimaryColor: '#00ff00'
                });
            }
            else if (selectedOption === option2) {
                this.setState({
                    option2PrimaryColor: '#00ff00'
                });
            }
            else if (selectedOption === option3) {
                this.setState({
                    option3PrimaryColor: '#00ff00'
                });
            }
            else if (selectedOption === option4) {
                this.setState({
                    option4PrimaryColor: '#00ff00'
                });
            }

            this.setState({
                score: this.state.score + 1,
            });
        }
        else {
            //wrong answer
            //show correct answer

            if (selectedOption === option1) {
                this.setState({
                    option1PrimaryColor: '#ff0000'
                });
            }
            else if (selectedOption === option2) {
                this.setState({
                    option2PrimaryColor: '#ff0000'
                });
            }
            else if (selectedOption === option3) {
                this.setState({
                    option3PrimaryColor: '#ff0000'
                });
            }
            else if (selectedOption === option4) {
                this.setState({
                    option4PrimaryColor: '#ff0000'
                });
            }

            this.setState({selectedOption: answer})

            if (option1 === answer) {
                this.setState({option1PrimaryColor: '#00ff00'})
            }
            else if (option2 === answer) {
                this.setState({option2PrimaryColor: '#00ff00'})
            }
            else if (option3 === answer) {
                this.setState({option3PrimaryColor : '#00ff00'})
            }
            else if (option4 === answer) {
                this.setState({option4PrimaryColor: '#00ff00'})
            }
        }

        this.setState({disableInput: true});
        setTimeout(() => {
            this.setState({
                question_number: this.state.question_number + 1
            }, () => {
                if (this.state.question_number === 11) {
                    this.finishQuiz();
                }
                else {
                    this.resetState();
                    this.getQuestion();
                }
            })
        }, 1000);
      }


    onSpeechResultsHandler(event) {
        var negatives = ['NO', 'ISN\'T', 'NOT', 'DON\'T'];
        var startWords = ['Ok', 'Sure', 'Cool', 'Alright', 'Fine', 'Right', 'Understood'];
        const option1 = this.state.option1.split(' ')[0];
        const option2 = this.state.option2.split(' ')[0];
        const option3 = this.state.option3.split(' ')[0];
        const option4 = this.state.option4.split(' ')[0];
        const answer = this.state.answer.split(' ')[0];
        var recogs = event.value;
        // console.log (recogs);
        for (var j = 0; j < recogs.length; j++) {
            var recog = event.value[j].toUpperCase();
            var words = recog.split (' ');
            if (!this.state.disableInput) {
                if (this.isInArray (words, answer.toUpperCase())) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray(words, negatives[i])) {
                            var startWord = startWords[Math.floor(Math.random() * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak(utterance);
                            return;
                        }
                    }
                    this.correctAnswerSpeak();
                    return;
                }
                else if (this.isInArray (words, 'OPTIONS')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i])) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = startWord + ', I won\'t read out the options. So what do you think is the capital of ' + this.state.question + '?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.readOptions ();
                    return;
                }
                else if (this.isInArray (words, option1.toUpperCase ())) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.incorrectAnswerSpeak(option1);
                    return;
                }
                else if (this.isInArray (words, option2.toUpperCase ())) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.incorrectAnswerSpeak(option2);
                    return;
                }
                else if (this.isInArray (words, option3.toUpperCase ())) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.incorrectAnswerSpeak(option3);
                    return;
                }
                else if (this.isInArray (words, option4.toUpperCase ())) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.incorrectAnswerSpeak(option4);
                    return;
                }
                else if (this.isInArray (words, 'FIRST')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    if (option1 === answer) {
                        this.correctAnswerSpeak();
                        return;
                    }
                    else {
                        this.incorrectAnswerSpeak(option1);
                        return;
                    }
                }
                else if (this.isInArray (words, 'SECOND')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase())) {
                            var startWord = startWords [Math.floor(Math.random() * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak(utterance);
                            return;
                        }
                    }
                    if (option2 === answer) {
                        this.correctAnswerSpeak();
                        return;
                    }
                    else {
                        this.incorrectAnswerSpeak(option2);
                        return;
                    }
                }
                else if (this.isInArray (words, 'THIRD')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase())) {
                            var startWord = startWords[Math.floor(Math.random() * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak(utterance);
                            return;
                        }
                    }
                    if (option3 === answer) {
                        this.correctAnswerSpeak();
                        return;
                    }
                    else {
                        this.incorrectAnswerSpeak(option3);
                        return;
                    }
                }
                else if (this.isInArray (words, 'FOURTH') || this.isInArray (words, 'LAST')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i].toUpperCase ())) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = 'Maybe it isn\'t, I\'m not at liberty to say. What do you think is the correct answer then?';
                            Tts.speak(utterance);
                            return;
                        }
                    }
                    if (option4 === answer) {
                        this.correctAnswerSpeak();
                        return;
                    }
                    else {
                        this.incorrectAnswerSpeak(option4);
                        return;
                    }
                }
                else if (this.isInArray (words, 'SKIP')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i])) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = startWord + ', I won\'t skip this question. So what do you think is the capital of ' + this.state.key + '?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.setState({
                        question_number: this.state.question_number + 1,
                    })
                    this.getQuestion()
                    return;
                }
                else if (this.isInArray (words, 'REPEAT')) {
                    if (this.isInArray (words, 'QUESTION')) {
                        for (var i = 0; i < negatives.length; i++) {
                            if (this.isInArray (words, negatives[i])) {
                                var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                                var utterance = startWord + ', I won\'t repeat the question. So what do you think is the answer?';
                                Tts.speak (utterance);
                                return;
                            }
                        }
                        this.readQuestion();
                        return;
                    }
                    else if (this.isInArray (words, 'OPTIONS')) {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i])) {
                            var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                            var utterance = startWord + ', I won\'t repeat the options. So what do you think is the answer?';
                            Tts.speak (utterance);
                            return;
                        }
                    }
                    this.readOptions();
                    return;
                    }
                    else if (this.isInArray (words, this.state.keyword.toUpperCase())) {
                        for (var i = 0; i < negatives.length; i++) {
                                if (this.isInArray (words, negatives)) {
                                var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                                var utterance = startWord + ', I won\'t repeat the' + this.state.keyword + '. So what do you think is the answer?';
                                Tts.speak (utterance);
                                return;
                            }
                    }
                    Tts.speak(this.state.key);
                    return;
                    }
                    else {
                    for (var i = 0; i < negatives.length; i++) {
                        if (this.isInArray (words, negatives[i])) {
                        var startWord = startWords [Math.floor (Math.random () * startWords.length)];
                        var utterance = startWord + ', I don\'t know what you want me to repeat, but I won\'t repeat it anyways. So what do you think is the answer?';
                        Tts.speak (utterance);
                        return;
                        }
                    }
                    Tts.speak ('Sorry, I just heard repeat, and I\'m not sure what you want me to repeat');
                    return;
                    }
                }
                else if (this.isInArray (words, 'END') || this.isInArray (words, 'FINISH') || this.isInArray (words, 'STOP') || this.isInArray (words, 'CONCLUDE') || this.isInArray (words, 'TERMINATE')) {
                    this.props.navigation.replace('Gameover', {score: this.state.score, voice: this.state.voice});
                    return
                }
                else if (this.isInArray (words, 'MENU') || this.isInArray (words, 'HOME')) {
                    this.props.navigation.replace('Home', {voice: this.state.voice});
                    return
                }
                else if (this.isInArray (words, 'CLOSE') || this.isInArray (words, 'QUIT') || this.isInArray (words, 'EXIT')) {
                    BackHandler.exitApp();
                    return
                }
                else {
                    Tts.speak ('Sorry, can\'t find that in the options');
                    return;
                }
            }
            else {
                if (this.isInArray (words, 'NEXT') || this.isInArray (words, 'OK')) {
                    setTimeout(() => {
                        this.setState({
                            question_number: this.state.question_number + 1
                        }, () => {
                            if (this.state.question_number === 11) {
                                this.finishQuiz();
                            }
                            else {
                                this.resetState();
                                this.getQuestion();
                            }
                        })
                    }, 100);
                    return;
                }
                else {
                    Tts.speak ('Sorry, I didn\'t get that');
                }
            }
        }
    }

    isInArray (array, element) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].toUpperCase () === element) {
            return true;
          }
        }
        return false;
      }
    
      correctAnswerSpeak = () => {
        const {option1, option2, option3, option4,
            selectedOption, answer, score} = this.state
        var utterance = 'Correct!';
        Tts.speak(utterance)
        Voice.destroy()

        this.setState({
            selectedOption: answer,
        })

        if (answer === option1) {
            this.setState({
                option1PrimaryColor: '#00ff00'
            });
        }
        else if (answer === option2) {
            this.setState({
                option2PrimaryColor: '#00ff00'
            });
        }
        else if (answer === option3) {
            this.setState({
                option3PrimaryColor: '#00ff00'
            });
        }
        else if (answer === option4) {
            this.setState({
                option4PrimaryColor: '#00ff00'
            });
        }

        this.setState({
            score: this.state.score + 1,
        });

        this.setState({disableInput: true});
        setTimeout(() => {
            this.setState({
                question_number: this.state.question_number + 1
            }, () => {
                if (this.state.question_number === 11) {
                    this.finishQuiz();
                }
                else {
                    this.resetState();
                    this.getQuestion();
                }
            })
        }, 100);
        
      }
    
      incorrectAnswerSpeak = (option) => {

        const {option1, option2, option3, option4,
            selectedOption, answer, score} = this.state

        if (option === option1) {
            this.setState({
                option1PrimaryColor: '#ff0000'
            });
        }
        else if (option === option2) {
            this.setState({
                option2PrimaryColor: '#ff0000'
            });
        }
        else if (option === option3) {
            this.setState({
                option3PrimaryColor: '#ff0000'
            });
        }
        else if (option === option4) {
            this.setState({
                option4PrimaryColor: '#ff0000'
            });
        }

        this.setState({selectedOption: answer})

        if (option1 === answer) {
            this.setState({option1PrimaryColor: '#00ff00'})
        }
        else if (option2 === answer) {
            this.setState({option2PrimaryColor: '#00ff00'})
        }
        else if (option3 === answer) {
            this.setState({option3PrimaryColor : '#00ff00'})
        }
        else if (option4 === answer) {
            this.setState({option4PrimaryColor: '#00ff00'})
        }

        var utterance = 'Sorry, wrong answer. The correct answer is ' + this.state.answer;
        Tts.speak (utterance);

        this.setState({disableInput: true});
      }

      readOptions = () => {
        var utterance = this.state.option1 + ', ' + this.state.option2 + ', ' + this.state.option3 + ',or ' + this.state.option4;
        Tts.speak (utterance);
      }

    readQuestion () {
        const {question} = this.state;
        Tts.speak(question);
    }

    arrayContains = (array, element) => {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === element) return true;
        }
        return false;
      }

    isInArray (array, element) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].toUpperCase () === element) {
            return true;
          }
        }
        return false;
      }

      startRecog = () => {
        Voice.start ('en-IN');
      }

    render() {
        const {option1, option2, option3, option4, question, answer, selectedOption, question_number} = this.state;

        return(
            <LinearGradient colors={['#0D92FF', '#13DBFF']} style={styles.container}>
                
                <View style={styles.progressIndicatorContainer}>
                    <Text style={styles.questionNumberText}>Question {question_number}/10</Text>
                    <Progress.Bar
                        animated={true}
                        progress={(question_number - 1) / 10.0}
                        width={Dimensions.get('window').width * 0.9}
                        height={15}
                        borderColor='#fff'
                        borderRadius={5}
                        color='#fff'
                    />
                    {/* <Text style={styles.questionNumberText}>Question #{question_number}</Text> */}
                </View>
                <Card style={styles.card}>
                    <Text style={styles.question}>{question}</Text>
                    <View style={styles.optionsBox}>
                        <OptionBox
                            style={styles.option}
                            label={option1}
                            labelStyle={styles.optionText}
                            primaryColor={this.state.option1PrimaryColor}
                            secondaryColor='#fff'
                            iconSize={30}
                            selected={selectedOption === option1}
                            onPress={this.state.disableInput ? () => {} : () => this.setState({selectedOption: this.state.option1})} 
                        />
                        <OptionBox
                            style={styles.option}
                            label={option2}
                            labelStyle={styles.optionText}
                            primaryColor={this.state.option2PrimaryColor}
                            secondaryColor='#fff'
                            iconSize={30}
                            selected={selectedOption === option2}
                            onPress={this.state.disableInput ? () => {} : () => this.setState({selectedOption: this.state.option2})} 
                        />
                        <OptionBox
                            style={styles.option}
                            label={option3}
                            labelStyle={styles.optionText}
                            primaryColor={this.state.option3PrimaryColor}
                            secondaryColor='#fff'
                            iconSize={30}
                            selected={selectedOption === option3}
                            onPress={this.state.disableInput ? () => {} : () => this.setState({selectedOption: this.state.option3})} 
                        />
                        <OptionBox
                            style={styles.option}
                            label={option4}
                            labelStyle={styles.optionText}
                            primaryColor={this.state.option4PrimaryColor}
                            secondaryColor='#fff'
                            iconSize={30}
                            selected={selectedOption === option4}
                            onPress={this.state.disableInput ? () => {} : () => this.setState({selectedOption: option4})} 
                        />
                        </View>
                        <View style={styles.buttons}>
                            <PrimaryButton style={styles.btn} title='Submit' titleStyle={styles.btnTitle} onPress={this.state.disableInput ? () => {} : this.submitButton} />
                            <SecondaryButton  style={styles.btn} title='Skip' titleStyle={styles.btnTitle} onPress={this.state.disableInput ? () => {} : this.skipButton} />
                        </View>
                </Card>
            </LinearGradient>

        )
    }
}