import React, { FC, useLayoutEffect } from 'react';
import { View, StyleSheet, ImageBackground} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Hamburger from '../Components/Hamburger/Hamburger';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from '../Components/HeaderButton/Headerbutton';
import Colors from '../constants/Colors';
import TextField from '../Components/Text';
import Calender from '../Components/Calender/Calender';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export interface VitalsScreenProps {
    navigation: CompositeNavigationProp<StackNavigationProp<any, 'VitalsScreen'>, BottomTabNavigationProp<any>>;
    route: RouteProp<any, 'VitalsScreen'>;
}


const VitalsScreen: FC<VitalsScreenProps> = (props) => {

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (<Hamburger/>),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="Add" iconName="ios-add" onPress={() => console.log('Working')} color={Colors.white}/>
      </HeaderButtons>
    )
    })
  })

    return ( 
      <View style={styles.container}>
        <View style={styles.welcome}>
          <TextField>SEPT 21, 2020</TextField>
          <TextField style={{fontSize: 19, marginTop: 7}}>How are you feeling today?</TextField>
        </View>
        <ScrollView style={styles.cardView} contentContainerStyle={{flex: 1}}>
          <View style={[styles.mosaicView, {backgroundColor: 'green'}]}>
            <View style={{flex: 1}}>
              <View style={{flex: 1,  backgroundColor: 'red'}}></View>
              <View style={{flex: 2,  backgroundColor: 'blue'}}></View>
            </View>

            <View style={{flex: 1}}>
              <View style={{flex: 2, backgroundColor: 'yellow'}}></View>
              <View style={{flex: 1,  backgroundColor: 'green'}}></View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.calender}>
          <Calender/>
        </View>
        <View style={styles.FAB}>
          <ImageBackground source={require('../assets/btn_vector.png')} style={{width: 80, height: 80, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} 
              onPress={() => props.navigation.navigate('MeasureVitalsScreen')}
            style={{width: 70, height: 70, backgroundColor: Colors.white, borderRadius: 35, justifyContent: 'center', alignItems: 'center'}}>
              <TextField style={{color: Colors.primary, textAlign: 'center'}}>Measure Now</TextField>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <StatusBar translucent={true} style="light"/>
      </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    welcome: {
      backgroundColor: Colors.primary,
      minHeight: 90,
      width: '100%',
      paddingStart: 12
    },
    calender: {
      minHeight: 60,
      width: '95%',
      borderRadius: 10,
      backgroundColor: Colors.white1,
      padding: 5,
      position: 'absolute',
      top: 60, zIndex: 99
    },
    cardView: {
      marginTop: 70, 
      flex: 1, 
      width: '100%'
    },
    mosaicView: {
      flexDirection: 'row', 
      flex: 1,
    },
    FAB: {
      position: 'absolute',
      right: 5,
      bottom: 10,
      overflow: 'hidden',
      height: 80,
      width: 80
    }
});

export default VitalsScreen;
