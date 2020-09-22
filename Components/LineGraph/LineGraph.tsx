import React, { FC } from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { LineChart, Grid, ChartProps, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Colors from '../../constants/Colors';
import { View } from 'react-native';

export interface LineGraphProps {
    chartProps?: ChartProps<any>
}
const  LineGraph: FC<LineGraphProps> = (props) => {

    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const yCardinal = [ 97, 98, 99 ]
    const axesSvg = { fontSize: 10, fill: Colors.white };
    const verticalContentInset = { top: 10, bottom: 10 }
        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y1={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={Colors.white}/>
                    <Stop offset={'100%'} stopColor={Colors.white}/>
                </LinearGradient>
            </Defs>
        )

    return (
        <View style={{ height: 120, flexDirection: 'row' }}>
               <YAxis
                    data={yCardinal}
                    style={{ marginBottom: 0 }}
                    contentInset={verticalContentInset}
                svg={axesSvg} numberOfTicks={yCardinal.length} 
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: Colors.white }}
                        curve={shape.curveCardinalOpen}
                    >
                        <Grid/>
                    </LineChart>
                </View>
            </View>
    )

}

export default LineGraph;