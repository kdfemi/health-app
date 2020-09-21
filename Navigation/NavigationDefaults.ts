import {StackNavigationOptions} from '@react-navigation/stack';
import Colors from '../constants/Colors';


const DefaultOption: StackNavigationOptions =
{
    headerStyle: {
        backgroundColor: Colors.primary,
        shadowOffset: { height: 0, width: 0 },
        elevation: 0
    },
    headerTintColor: Colors.white, 
    headerTitleStyle: {textAlign: 'center'}
}
export default DefaultOption; 