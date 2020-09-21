import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VitalsScreen from '../../Screens/VitalsScreen';
import DefaultOption from '../NavigationDefaults';

const StackNavigator = createStackNavigator();

const VitalsStack = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen component={VitalsScreen} name="VitalsScreen" 
            options={{title: 'Vitals', ...DefaultOption}}/>
        </StackNavigator.Navigator>
    )
}

export default VitalsStack;