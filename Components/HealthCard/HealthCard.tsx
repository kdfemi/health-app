import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Colors from '../../constants/Colors';
import TextField from '../Text';

export interface HealthCardProps extends TouchableOpacityProps {
    overlayText: string
}
const HealthCard: FC<HealthCardProps> = ({overlayText, children, ...rest}) => {
    return (
        <TouchableOpacity {...rest} style={[rest.style, styles.healthCard]} activeOpacity={0.8}>
        <View style={styles.healthCardLeft}></View>
        <View  style={styles.healthCardRight}>
 
            <View style={styles.healthCardOverlay}>
                {overlayText}
            </View>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    healthCard: {
        backgroundColor: Colors.white1,
        borderRadius: 10,
        height: 150,
        flexDirection: 'row'
    },
    healthCardLeft: {
        flexDirection: 'row',
        flex: 1,
        padding: 5,
    },
    healthCardRight: {
        flex: 2,
        padding: 5,
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
    }
});

export default HealthCard;