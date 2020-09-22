import React, { FC, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image} from 'react-native';
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
import LineGraph from '../Components/LineGraph/LineGraph';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
  }, []);

  useEffect(() => {
    console.log('props changed')
    if(props.route.params) {

    }
  }, [props.route.params]);

    return ( 
      <View style={styles.container}>
        <View style={styles.welcome}>
          <TextField>SEPT 21, 2020</TextField>
          <TextField style={{fontSize: 20, marginTop: 7}}>How are you feeling today?</TextField>
        </View>
        <ScrollView style={styles.cardView} contentContainerStyle={{flexGrow: 1}}>
          
          <View style={[styles.mosaicView]}>
            {/* Left */}
            <View style={{flex: 1}}>

              {/* Temperature */}
              <View style={[styles.vitalCard, styles.tempVitalCard]}>
                <View style={{flexDirection: 'row'}}>
                  <FontAwesome name="thermometer-4" size={32} color={Colors.white} />
                  <TextField style={{fontSize: 20, marginLeft: 5}}>Temperature</TextField>
                </View>
                <View>
                  <LineGraph/>
                </View>
                  <TextField style={styles.vitalValue}>
                    97.6
                    <TextField style={styles.subScript}>&#176;F</TextField>
                  </TextField>
              </View>

              <View style={[styles.vitalCard, styles.oxiMeter]}>
              {/* Oximeter*/}
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-pulse" size={32} color={Colors.white} />
                <TextField style={{fontSize: 20, marginLeft: 5}}>Oximeter</TextField>
              </View>
              <View>
                <LineGraph/>
              </View>
              <View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>SPO<TextField style={{fontSize: 12}}>2</TextField></TextField>
                <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>PR</TextField>
                </View>
                <View style={{flexDirection: 'row', width: '100%'}}>
                <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1}}>97<TextField style={styles.subScript}>%</TextField></TextField>
                  <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1}}>97<TextField style={styles.subScript}>bpm</TextField></TextField>
                </View>
              </View>
              </View>
            </View>

            {/* Right */}
            <View style={{flex: 1}}>
              {/* Blood*/}
                <View style={[styles.vitalCard, styles.bloodVitalCard]}>
                  <View style={{flexDirection: 'row'}}>
                    <Fontisto name="blood-drop" size={32} color={Colors.white} />
                    <TextField style={{fontSize: 20, marginLeft: 5}}>Blood</TextField>
                  </View>
                  <View>
                    <LineGraph/>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}> 
                    <TextField style={styles.vitalValue}>124
                    </TextField>
                    <View>
                      <TextField style={{...styles.vitalValue, marginTop: 14}}>/
                      <TextField style={{color: Colors.red}}>76</TextField></TextField>
                      <TextField style={{...styles.subScript}}>mmhg</TextField>
                    </View>
                  </View>
                </View>

              {/* Face*/}
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image source={require('../assets/capture.png')} height={30} width={30} resizeMode="contain" style={{ width: 100}}/>
                  <TextField style={{color: Colors.primary}}>facexxxxxxx</TextField>
              </View>
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
      // padding: 10
    },
    FAB: {
      position: 'absolute',
      right: 5,
      bottom: 10,
      overflow: 'hidden',
      height: 80,
      width: 80
    },    
    vitalCard: {
      padding: 10, 
      borderRadius: 10, 
      minHeight: 200,
      margin: 10
    },
    tempVitalCard: {
      backgroundColor: Colors.secondary, 
    },
    bloodVitalCard: {
      backgroundColor: Colors.tertiary, 
    },
    oxiMeter: {
      backgroundColor: Colors.primary, 
    },
    vitalValue: {
      fontSize: 32, 
      fontWeight: 'bold' , 
      textAlign: 'center'
    },
    subScript: {
      fontSize: 12,
      textAlign: 'right',
    },
});

export default VitalsScreen;
