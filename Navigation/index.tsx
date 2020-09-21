import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VitalsStack from './VitalsStack';
import HomeStack from './HomeStack';
import DoctorStack from './DoctorStack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function RootStack() {
  return (
      <Tab.Navigator initialRouteName="Vitals"  screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'md-home';
          } else if (route.name === 'Vitals') {
            return <Entypo name="bar-graph" size={size} color={color} />;
          } else if (route.name === 'Doctor') {
            return <Fontisto name="doctor" size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.grey,
      }}>
        <Tab.Screen name="Home" component={HomeStack}  />
        <Tab.Screen name="Vitals" component={VitalsStack} />
        <Tab.Screen name="Doctor" component={DoctorStack} />
      </Tab.Navigator>
  );
}