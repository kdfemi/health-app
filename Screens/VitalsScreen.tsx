import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, ActivityIndicator, Platform, Alert, RefreshControl} from 'react-native';
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
import axiosInstance from '../axios/axios';
import Axios, { AxiosError, CancelTokenSource } from 'axios';
import VitalsResponseData from '../axios/request-data/vitals-response-data';
import Animated from 'react-native-reanimated';

export interface VitalsScreenProps {
  navigation: CompositeNavigationProp<StackNavigationProp<any, 'VitalsScreen'>, BottomTabNavigationProp<any>>;
  route: RouteProp<any, 'VitalsScreen'>;
}


const VitalsScreen: FC<VitalsScreenProps> = (props) => {

  const cancelToken = useRef<CancelTokenSource>();
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [vitalsData, setVitalsData] = useState<VitalsResponseData>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>();

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
    const date = new Date();
    date.setHours(0,0,0,0);
    setSelectedDate(date);
    getVitals(date)
    return () => {
      if ( typeof cancelToken.current != typeof undefined) {
        cancelToken.current?.cancel("Operation canceled due unmounted");
      }
    }
  }, []);

  useEffect(() => {
    if(props.route.params) {
      const date = new Date();
      date.setHours(0,0,0,0)
      getDataForSelectedDate(date)
    }
    return () => {
      if ( typeof cancelToken.current != typeof undefined) {
        cancelToken.current?.cancel("Operation canceled due unmounted");
      }
    }
  }, [props.route.params]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getVitals(selectedDate as Date);
  };

  const getVitals = useCallback(async (date: Date) => {
    if ( typeof cancelToken.current != typeof undefined) {
      cancelToken.current?.cancel("Operation canceled due to new request.");
    }
    cancelToken.current = Axios.CancelToken.source();
    try {
      const response = await axiosInstance.get<Array<VitalsResponseData>>('/record', {
        params: {
          date: date.toISOString()
        },
        cancelToken: cancelToken.current.token
      });
      if(response.status === 200) {
        setVitalsData(response.data[0])
      } else {
        Alert.alert('Error', 'couldn\'t fetch data', [{text: 'Retry',
        onPress: () => getVitals(selectedDate as Date)
        }])
      }
    } catch (error) {
      const serverError = error as AxiosError;
      if(Axios.isCancel(serverError)) {
        console.log(serverError.message);
      } else {
        if (serverError.response) {
          Alert.alert('Error', serverError.request._response)
        } else {
          Alert.alert('Error', 'An unknown Error occurred', [{text: 'Retry',
          onPress: () => getVitals(selectedDate as Date)
          }])
          console.log(serverError.message);
        }
      }
    }finally {
      setIsFetchingData(false);
      setRefreshing(false);
    }
  }, []);

  const getDataForSelectedDate =  async (date: Date) => {
    setSelectedDate(date);
    getVitals(date)
  }


  return ( 
    <View style={styles.container}>
      <View style={styles.welcome}>
        <TextField>SEPT 21, 2020</TextField>
        <TextField style={{fontSize: 20, marginTop: 7}}>How are you feeling today?</TextField>
      </View>
      <ScrollView style={styles.cardView} contentContainerStyle={{flexGrow: 1}} 
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {!isFetchingData ?
        <View style={[styles.mosaicView]}>
          {/* Left */}
          <View style={{flex: 1}}>

            {/* Temperature */}
            <View style={[styles.vitalCard, styles.tempVitalCard]}>
              <View style={styles.vitalCardHeader}>
                <FontAwesome name="thermometer-4" size={32} color={Colors.white} />
                <TextField style={{fontSize: 20, marginLeft: 5}}>Temperature</TextField>
              </View>
              <View>
                <LineGraph/>
              </View>
                {vitalsData?.temp ?<TextField style={styles.vitalValue}>
                  {  vitalsData?.temp }
                  <TextField style={styles.subScript}>&#176;F</TextField>
                </TextField> : <TextField style={styles.vitalValue}>-</TextField>}
            </View>

            {/* Oximeter*/}
            <View style={[styles.vitalCard, styles.oxiMeter]}>
            <View style={styles.vitalCardHeader}>
              <Ionicons name="ios-pulse" size={32} color={Colors.white} />
              <TextField style={{fontSize: 20, marginLeft: 5}}>Oximeter</TextField>
            </View>
            <View style={{width: '100%'}}>
              <LineGraph/>
            </View>
            <View>
              <View style={{flexDirection: 'row', width: '100%'}}>
              <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 18, marginBottom: 0}}>SPO<TextField style={{fontSize: 12}}>2</TextField></TextField>
              <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 18, marginBottom: 0}}>PR</TextField>
              </View>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 1}}>
                {vitalsData?.spo2 ? <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>
                  {vitalsData?.spo2}<TextField  style={styles.subScript}>%</TextField>
                  </TextField> : <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>-</TextField> }
                </View>
                <View style={{flex: 1}}>
                {vitalsData?.bpm ? <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>
                  {vitalsData?.bpm}<TextField  style={styles.subScript}>%</TextField>
                  </TextField> : <TextField style={{...styles.vitalValue, textAlign: 'left', flex: 1, fontSize: 24}}>-</TextField> }
                </View>
              </View>
            </View>
            </View>
          </View>

          {/* Right */}
          <View style={{flex: 1}}>
            {/* Blood*/}
              <View style={[styles.vitalCard, styles.bloodVitalCard]}>
                <View style={styles.vitalCardHeader}>
                  <Fontisto name="blood-drop" size={32} color={Colors.white} />
                  <TextField style={{fontSize: 20, marginLeft: 5}}>Blood</TextField>
                </View>
                <View>
                  <LineGraph/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}> 
                {vitalsData?.mmHg ? 
                <>
                  <TextField style={styles.vitalValue}>{vitalsData?.mmHg.low? vitalsData?.mmHg.low : '...'}
                  </TextField>
                  <View style={{marginTop: 14}}>
                    <TextField style={{...styles.vitalValue}}>/
                    <TextField style={{color: Colors.red}}>{vitalsData?.mmHg.high? vitalsData?.mmHg.high : '...'}</TextField></TextField>
                    <TextField style={{...styles.subScript, position: 'absolute', bottom: 0, right: 0}}>mmhg</TextField>
                  </View> 
                </>
                  : null
                }
                </View>
              </View>

            {/* Face*/}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../assets/capture.png')} height={30} width={30} resizeMode="contain" style={{ width: 100}}/>
                <TextField style={{color: Colors.primary}}>facexxxxxxx</TextField>
            </View>
          </View>
        </View>
        
        : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
            <TextField style={{color: Colors.primary}}>Fetching Vitals</TextField>
        </View>
      }
      </ScrollView>
      <View style={styles.calender}>
        <Calender onClick={getDataForSelectedDate}/>
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
      margin: 10,
      maxWidth: 700
    },
    vitalCardHeader: {
      flexDirection: 'row',
      marginVertical: 10
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
      textAlign: 'center',
      marginVertical: 10
    },
    subScript: {
      fontSize: 12,
      textAlign: 'right',
    },
});

export default VitalsScreen;
