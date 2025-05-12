import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraScreen} from './src/screens/CameraScreen.tsx';
import PreviewScreen from './src/screens/PreviewScreen.tsx';
import {NavigationContainer} from '@react-navigation/native';

export type Routes = {
  CameraScreen: undefined;
  PreviewScreen: {
    path: string;
    type: 'video' | 'photo';
  };
};

const Stack = createNativeStackNavigator<Routes>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
        initialRouteName={'CameraScreen'}>
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
