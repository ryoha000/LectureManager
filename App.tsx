import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainViewScreen from "./src/MainView/MainView";
import NoteViewScreen from "./src/Note/NoteView"
import CameraViewScreen from './src/Note/CameraView'
import SettingViewScreen from './src/Setting/SettingView'
import ScheduleViewScreen from './src/Schedule/ScheduleView'
import { AppLoading } from "expo"
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "native-base";

export type RootStackParamList = {
  Schedule: undefined
  Note: {a: string};
  Setting: {a: string};
  Camera: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isReady, useIsReady] = useState(false)
  useEffect(() => {
    const waitLoading = async () => {
      try {
        await _loadResourcesAsync()
        useIsReady(true)
      } catch (e) {
        alert(e)
      }
    }
    waitLoading()
  })
  if (!isReady) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Schedule" component={ScheduleViewScreen} />
        <Stack.Screen name="Note" component={NoteViewScreen} initialParams={{a: "note props"}}/>
        <Stack.Screen name="Setting" component={SettingViewScreen} initialParams={{a: "setting props"}} />
        <Stack.Screen name="Camera" component={CameraViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function _loadResourcesAsync() {
  const loadedFonts = await Font.loadAsync({
    Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
  });
  return Promise.all([loadedFonts]);
}
