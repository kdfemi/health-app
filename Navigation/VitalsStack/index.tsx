import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VitalsScreen from '../../Screens/VitalsScreen';
import DefaultOption from '../NavigationDefaults';
import MeasureVitalsScreen from '../../Screens/MeasureVitalsScreen';
import Colors from '../../constants/Colors';

const StackNavigator = createStackNavigator();

const VitalsStack = () => {
    return (
        <StackNavigator.Navigator headerMode="screen">
            <StackNavigator.Screen component={VitalsScreen} name="VitalsScreen" 
            options={{title: 'Vitals', ...DefaultOption}}/>
            <StackNavigator.Screen component={MeasureVitalsScreen} name="MeasureVitalsScreen" 
            options={{title: 'Vitals', ...DefaultOption, headerStyle: {
                ...DefaultOption.headerStyle,
                backgroundColor: Colors.white,
            }, headerTintColor: Colors.primary
            }}/>
        </StackNavigator.Navigator>
    )
}

export default VitalsStack;