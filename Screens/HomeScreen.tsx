import React, { FC } from 'react';
import { View, StyleSheet} from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface HomeScreenProps {
    navigation: CompositeNavigationProp<StackNavigationProp<any, 'HomeScreen'>, BottomTabNavigationProp<any>>;
    route: RouteProp<any, 'HomeScreen'>;
}


const HomeScreen: FC<HomeScreenProps> = (props) => {

  

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

export default HomeScreen;
