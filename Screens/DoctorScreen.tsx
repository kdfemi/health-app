import React, { FC } from 'react';
import { View, StyleSheet} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface DoctorScreenProps {
    navigation: CompositeNavigationProp<StackNavigationProp<any, 'DoctorScreen'>, BottomTabNavigationProp<any>>;
    route: RouteProp<any, 'DoctorScreen'>;
}


const DoctorScreen: FC<DoctorScreenProps> = (props) => {

  

    return ( 
    <View style={styles.container}>
       
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
});

export default DoctorScreen;
