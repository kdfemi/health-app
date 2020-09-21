import React, {FC} from 'react';
import { StyleSheet, TextProps, TextStyle, Text } from 'react-native';
import Colors from '../../constants/Colors';


const styles = StyleSheet.create({
    text: {
        color: Colors.white,
    }
});

const TextField: FC<TextProps> = (props) => <Text {...props} style={{...styles.text, ...props.style as TextStyle}} >
    {props.children}</Text>

export default TextField;