import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapPage from './screens/MapPage';
import TwoPage from './screens/TwoPage';
import Home from './screens/Home';
import Finish from './screens/Finish';
import Loading from './screens/Loading';
import Test from './screens/Test';
import Test2 from './screens/Test2';
import Method from './screens/Method';
import Method_Details from './screens/Method_Details';
import MyGPS from "./screens/MyGPS";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Finish" component={Finish} />
        <Stack.Screen name="MapPage" component={MapPage} />
        <Stack.Screen name="TwoPage" component={TwoPage} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Test2" component={Test2}/>
        <Stack.Screen name="Method" component={Method}/>
        <Stack.Screen name="Method_Details" component={Method_Details}/>
        <Stack.Screen name="MyGPS" component={MyGPS}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigation;