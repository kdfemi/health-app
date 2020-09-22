import React, { FC, useState } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Colors from '../../constants/Colors';
import TextField from '../Text';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export interface HealthCardProps extends TouchableOpacityProps {
    overlayText: string;
    iconName: string;
    leftText: string;
    IconComponent: typeof Fontisto | typeof FontAwesome | typeof Ionicons
}
const HealthCard: FC<HealthCardProps> = ({overlayText, children, iconName, onPress, leftText,IconComponent,...rest}) => {

    const [isPressed, setIsPressed] = useState(false);
    const pressCallback = (e: GestureResponderEvent) => {
        if(onPress) {
            onPress(e);
        }
        setIsPressed(true);
    }
    return (
        <TouchableOpacity {...rest} style={[rest.style, styles.healthCard]} activeOpacity={0.8} onPress={pressCallback}>
        <View style={styles.healthCardLeft}>
            <IconComponent name={iconName} size={24} color={Colors.primary} />
            <TextField style={styles.leftText}>{leftText}</TextField>
        </View>
        <View  style={styles.healthCardRight}>
            {children}
            {isPressed ? null : <View style={styles.healthCardOverlay}>
                <TextField style={styles.healthCardOverlayText}>{overlayText}</TextField>
            </View>}
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    healthCard: {
        backgroundColor: Colors.white1,
        borderRadius: 10,
        height: 130,
        flexDirection: 'row'
    },
    healthCardLeft: {
        flexDirection: 'row',
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    healthCardRight: {
        flex: 2,
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    healthCardOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.primary,
        opacity: 0.8,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    healthCardOverlayText: {
        textAlign: 'center'
    },
    leftText: {
        color: Colors.primary,
        marginLeft: 5
    }
});

export default HealthCard;