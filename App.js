import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import Loading from './screens/Loading';

const App = () => {
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    })
  })

  return (
    loading?<Loading></Loading>:
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
};

export default App;