import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from "react-native";
import Colors from '../../constants/Colors';
import Text from '../Text'
export interface ButtonProps extends TouchableOpacityProps {
  type?: 'outline' | 'fill' | 'clear',
  innerStyle?: TextStyle,
  color?: string,
  backgroundColor?: string
  disabled?: boolean | undefined;
}
const Button: React.FC<ButtonProps> = props => {
    return  <TouchableOpacity activeOpacity={0.5} {...props} style={{...styles.button, ...props.style as ViewStyle,
     
      ...(props.backgroundColor)?{backgroundColor: props.backgroundColor} :  
      (props.type === 'clear')? styles.clear : (props.type === 'outline')? styles.outline : styles.fill,
      ...( typeof props.disabled !== 'undefined' && props.disabled)? styles.disabled : null
    }} onPress={props.onPress} >
    <Text style={{...styles.text,
   ...(props.color)?{color: props.color} : 
   (props.type === 'clear')? styles.textClear : (props.type === 'outline')? styles.textOutline : styles.textFill,
    ...props.innerStyle
    }}> {props.children} </Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 10,
    },
    clear: {
      backgroundColor: Colors.white,
    },
    fill: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primary,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    outline: {
      backgroundColor: Colors.white,
      borderColor: Colors.primary,
      borderWidth: 1,
      borderStyle: 'solid'
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
      textAlignVertical: 'center'
    },
    textClear: {
      color: Colors.primary
    },
    textFill: {
      color: Colors.white
    },
    textOutline: {
      color: Colors.primary
    },
    disabled: {
      backgroundColor: Colors.grey,
      borderColor: Colors.grey,
      borderWidth: 1,
      borderStyle: 'solid'
    }
})

export default Button;