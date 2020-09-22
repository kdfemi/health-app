import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultOption from '../NavigationDefaults';
import HomeScreen from '../../Screens/HomeScreen';


const StackNavigator = createStackNavigator();

const HomeStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen component={HomeScreen} name="HomeScreen" 
            options={{title: 'Home', ...DefaultOption}}/>
        </StackNavigator.Navigator>
    )
}

export default HomeStack;