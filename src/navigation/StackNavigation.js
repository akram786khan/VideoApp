import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CombineAudioAndVideo from '../CombineAudioAndVideo';
import OpenCameraScreen from '../OpenCameraScreen';
import VideoPlayer from '../VideoPlayer';
const Stack = createStackNavigator();
const StackNavigation = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CombineAudioAndVideo" component={CombineAudioAndVideo} options={{ headerShown: false }} />
        <Stack.Screen name="OpenCameraScreen" component={OpenCameraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})