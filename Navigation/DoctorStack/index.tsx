import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultOption from '../NavigationDefaults';
import DoctorScreen from '../../Screens/DoctorScreen';


const StackNavigator = createStackNavigator();

const DoctorStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen component={DoctorScreen} name="DoctorScreen" 
            options={{title: 'Doctor', ...DefaultOption}}/>
        </StackNavigator.Navigator>
    )
}

export default DoctorStack;