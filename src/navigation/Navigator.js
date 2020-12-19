import React, {Component} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../routes/Home/Home'
import About from '../routes/About/About'
import Question from '../routes/Question/Question'
import Gameover from '../routes/Gameover/Gameover'

const Stack = createStackNavigator()

export default class Navigator extends Component {
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} initialParams={{ voice: true }} options={{headerShown:false}} />
                <Stack.Screen name="About" component={About} options={{headerShown:false}} />
                <Stack.Screen name="Question" component={Question} options={{headerShown:false}} />
                <Stack.Screen name="Gameover" component={Gameover} options={{headerShown: false}} />
            </Stack.Navigator>
        )
    }
}