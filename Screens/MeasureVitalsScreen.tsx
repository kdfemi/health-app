
import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IoniconsHeaderButton from '../Components/HeaderButton/Headerbutton';
import Colors from '../constants/Colors';
import TextField from '../Components/Text';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Button from '../Components/Button/Button';
import HealthCard from '../Components/HealthCard/HealthCard';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


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
            <Item title="Add" iconName="ios-arrow-back" onPress={() => props.navigation.goBack()} color={Colors.primary} iconSize={32}/>
        </HeaderButtons>
        )
    })
  }, [])

  const [activeSegment, setActiveSegment] = useState<Segment>('Vital');
  
    const [temperature, setTemperature] = useState<number>(0);
    const [temperatureIsLoading, setTemperatureIsLoading] = useState<boolean>(false);

    const [blood, setBlood] = useState<{high: number, low: number}>({high: 0, low: 0});
    const [bloodIsLoading, setBloodIsLoading] = useState<boolean>(false);

    const [bpm, setBpm] = useState<number>(0);
    const [bpmIsLoading, setBpmIsLoading] = useState<boolean>(false);

    const [osp, setOsp] = useState<number>(0);
    const [ospIsLoading, setOspIsLoading] = useState<boolean>(false);

    const [buttonActive, setButtonActive] = useState(false);

    useEffect(() => {
        if(temperatureIsLoading || bpmIsLoading || bpmIsLoading || ospIsLoading) {
            setButtonActive(false);
        } else {
            if(temperature && bpm && osp && blood.low && blood.high)
                setButtonActive(true);
        }
    }, [temperature, blood, bpm, osp]);

  const getTemperature = () => {
    setTemperatureIsLoading(true) 
    setTimeout(() => {
        setTemperatureIsLoading(false) 
        setTemperature(Math.floor(Math.random() * 100) + 1)
    }, 1000);
  }

  const getBlood = () => {
    setBloodIsLoading(true) 
    setTimeout(() => {
        setBloodIsLoading(false) 
        setBlood({high: Math.floor(Math.random() * 100)  + 1, low: Math.floor(Math.random() * 100)  + 1})
    }, 1000);
  }

  const getBpmAndOsp = () => {
    setBpmIsLoading(true)
    setOspIsLoading(true)  
    setTimeout(() => {
        setBpmIsLoading(false) 
        setBpm(Math.floor(Math.random() * 100)  + 1)
        setOspIsLoading(false) 
        setOsp(Math.floor(Math.random() * 100)  + 1)
    }, 1000);
  }

  const onSegmentChanged = (segment: Segment) => {
    setActiveSegment(segment);
  }

  const submitData = () => {
      console.log('Clicked')
      props.navigation.navigate('Vitals', { screen: 'VitalsScreen',
       params: { temperature, blood, bpm, osp } 
        })
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
            <HealthCard iconName="thermometer-4" leftText="Body"  IconComponent={FontAwesome} 
            overlayText="Wear blood Thermometer to view Temperature"
            onPress={getTemperature} style={styles.healthCard}>
                <View style={{ flexDirection: 'column',  alignItems: 'flex-start' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {temperatureIsLoading ? <ActivityIndicator size="large" color={Colors.primary}/> : null}
                        <TextField style={{...styles.vitalValue, ...temperature? null: styles.inActiveText}}>{temperature}</TextField>
                    </View>
                    <TextField style={styles.subScript}>&#176;F</TextField>
                </View>
            </HealthCard>

            <HealthCard iconName="blood-drop" leftText="Blood"  IconComponent={Fontisto}
            overlayText="Wear blood pressure monitor to view Blood pressure"
            onPress={getBlood} style={styles.healthCard}>
                <View style={{ flexDirection: 'column',  alignItems: 'flex-start' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {bloodIsLoading ? <ActivityIndicator size="large" color={Colors.primary}/> : null}
                        <TextField style={{...styles.vitalValue, ...blood? null: styles.inActiveText}}>
                            {blood.high}/<TextField style={{color: Colors.tertiary, ...blood? null: styles.inActiveText}}>{blood.low}</TextField>
                        </TextField>
                    </View>
                    <TextField style={styles.subScript}>mmgh</TextField>
                </View>
            </HealthCard>

            <HealthCard iconName="ios-pulse" leftText="Sp02"  IconComponent={Ionicons}
            overlayText="Wear Oximeter monitor to view SpO2 and PB"
            onPress={getBpmAndOsp} style={styles.healthCard}>
                <View style={{ flexDirection: 'column',  alignItems: 'flex-start' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        {ospIsLoading ? <ActivityIndicator size="large" color={Colors.primary}/> : null}
                            <TextField style={{...styles.vitalValue, ...osp? null: styles.inActiveText}}>{osp}</TextField>
                    </View>
                    <TextField style={styles.subScript}>%</TextField>
                </View>
                <View style={{ flexDirection: 'column',  alignItems: 'flex-start' }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TextField style={styles.superScript}>pr</TextField>
                        {bpmIsLoading ? <ActivityIndicator size="large" color={Colors.primary}/> : null}
                        <TextField style={{...styles.vitalValue, ...bpm? null: styles.inActiveText}}>{bpm}</TextField>
                    </View>
                    <TextField style={styles.subScript}>bpm</TextField>
                </View>
            </HealthCard>
            
            <Button disabled={!buttonActive} onPress={submitData} style={styles.button}>Complete</Button>
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
        flexGrow: 1,
        alignItems: 'center'
    },
    healthCard: {
        marginVertical: 10
    },
    vitalValue: {
        color: Colors.primary,
        fontSize: 32, 
        fontWeight: 'bold' , 
    },
    inActiveText: {
        color: Colors.grey
    },
    superScript: {
        fontSize: 20, 
        color: Colors.primary,
    },
    subScript: {
        fontSize: 12,
        color: Colors.black,
        textAlign: 'right',
        direction: 'rtl',position: 'absolute',
        bottom: -8,
        right: 0,
    },
    button: {
        width: '100%',
         maxWidth: 500,
         marginVertical: 20
    }
});

export default MeasureVitalsScreen;
