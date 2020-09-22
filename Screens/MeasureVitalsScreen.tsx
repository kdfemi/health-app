
import React, { FC, useLayoutEffect, useState } from 'react';
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
import { color } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import Button from '../Components/Button/Button';
import HealthCard from '../Components/HealthCard/HealthCard';

export interface MeasureVitalsScreenProps {
    navigation: CompositeNavigationProp<StackNavigationProp<any, 'MeasureVitalsScreen'>, BottomTabNavigationProp<any>>;
    route: RouteProp<any, 'MeasureVitalsScreen'>;
}

type Segment = 'Vital' | 'Camera'

const MeasureVitalsScreen: FC<MeasureVitalsScreenProps> = (props) => {

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="Add" iconName="ios-arrow-back" onPress={() => props.navigation.goBack()} color={Colors.primary} iconSize={24}/>
        </HeaderButtons>
        )
    })
  })

  const [activeSegment, setActiveSegment] = useState<Segment>('Vital');

  const onSegmentChanged = (segment: Segment) => {
    setActiveSegment(segment);
  }

    return ( 
    <View style={styles.container}>
        <View style={styles.segment}>
            <View style={styles.segmentButtons}>
                <TouchableOpacity style={styles.segmentButton} onPress={() => onSegmentChanged('Vital')} activeOpacity={0.8}>
                    <TextField style={styles.segmentButtonText}>Vitals Kit</TextField>
                    {activeSegment === 'Vital' ? <View style={styles.segmentActiveIndicator}/> : null }            
                </TouchableOpacity>
                <TouchableOpacity style={styles.segmentButton} onPress={() => onSegmentChanged('Camera')} activeOpacity={0.8}>
                    <TextField style={styles.segmentButtonText}>Camera</TextField>
                    {activeSegment === 'Camera' ? <View style={styles.segmentActiveIndicator}/> : null }   
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={{ flex: 1, width: '100%'}} contentContainerStyle={styles.scrollViewInner}>
            <HealthCard onPress={() => console.log('Clicked')} style={styles.healthCard}/>
            <HealthCard onPress={() => console.log('Clicked')} style={styles.healthCard}/>
            <HealthCard onPress={() => console.log('Clicked')} style={styles.healthCard}/>
            <Button >Complete</Button>
        </ScrollView>
        <StatusBar translucent={true} style="dark"/>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    segment: {
        minHeight: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 12
    },
    segmentButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
    },
    segmentButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    segmentButtonText: {
        textAlign: 'center',
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold'
    },
    segmentActiveIndicator: {
        backgroundColor: Colors.primary,
        height: 4,
        width: '100%',
        marginTop: 2,
        borderRadius: 3
    },
    scrollViewInner: {
        padding: 10,
        paddingHorizontal: 15,
        flex: 1
    },
    healthCard: {
        marginVertical: 5
    }
});

export default MeasureVitalsScreen;
