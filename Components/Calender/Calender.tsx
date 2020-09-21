import React, {FC, useState} from 'react';
import { StyleSheet, TextProps, TextStyle, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import TextField from '../Text';

export interface CalenderProps {
    // days: Date[]
}

const getPivotalDays = () => {
    const dayToMilliseconds = 8.64e+7;
    const presentDate = new Date();
    const presentDateMillSeconds = presentDate.getTime();
    let day = 3;
    const days = new Array<Date>().fill(new Date(), 0 , 6);
    for (let index = 1; index <= 7; index++) {
        if(index === 4) {
            days[index - 1] = presentDate;
            day++;
            continue;
        }
        if(index < 4) {
            days[index - 1] = new Date((presentDateMillSeconds - ( day * dayToMilliseconds)));
            day--;
        } else {
            days[index - 1] = new Date((presentDateMillSeconds + (day * dayToMilliseconds)));
            day++
        }
    }
    return days
}
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const Calender:FC<CalenderProps> = (props) => {
    const [dates, setDates] = useState<Date[]>(getPivotalDays());
    const [activeIndex, setActiveIndex] = useState(3);

    const selectedDate = (selectedIndex: number) => setActiveIndex(selectedIndex)
    return (
        <View style={styles.container}>
            {dates.map((date, index) => 
                <View key={index} style={{flex: 1}}>
                    <View style={[styles.daysContainer]}>
                        <TextField style={styles.text}>{days[date.getDay()]}</TextField>
                    </View>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => selectedDate(index)} activeOpacity={0.8}>
                        <View style={[styles.daysContainer]}>
                            <TextField style={{...styles.text, ...index === activeIndex? styles.activeText : null}}>{date.getDate()}</TextField>
                        </View>
                        {index === activeIndex? <View style={styles.activeHighlight}></View> : null}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'space-evenly',
        paddingVertical: 5,
        zIndex: 999
    },
    daysContainer: {
        alignItems: 'center',
    },
    text: {
        color: Colors.grey,
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 16,
    },
    activeHighlight: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        position: 'absolute',
        height: 40,
        width: 40,
        borderRadius: 20,
        zIndex: -1,
        display: 'flex'
    },
    activeText: {
        color: Colors.white,
        textAlign: 'center',
    },
});

export default Calender;