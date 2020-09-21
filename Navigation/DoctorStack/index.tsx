import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Vitals from '../../Screens/VitalsScreen';
import DefaultOption from '../NavigationDefaults';


const StackNavigator = createStackNavigator();

const DoctorStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen component={Vitals} name="DoctorScreen" 
            options={{title: 'Doctor', ...DefaultOption}}/>
        </StackNavigator.Navigator>
    )
}

export default DoctorStack;