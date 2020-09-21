import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Vitals from '../../Screens/VitalsScreen';
import DefaultOption from '../NavigationDefaults';


const StackNavigator = createStackNavigator();

const HomeStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen component={Vitals} name="HomeScreen" 
            options={{title: 'Home', ...DefaultOption}}/>
        </StackNavigator.Navigator>
    )
}

export default HomeStack;