import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainView from "./src/MainView/MainView";
import { AppLoading } from "expo"
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "native-base";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, useIsReady] = useState(false)
  useEffect(() => {
    const waitLoading = async () => {
      try {
        await _loadResourcesAsync()
        useIsReady(true)
      } catch (e) {
        console.log(e)
      }
    }
    waitLoading()
  })
  if (!isReady) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Icon type="Ionicons" fontSize={size} name={iconName} color={color} />;
        },
      })}
      >
        <Tab.Screen name="Home" component={MainView} />
        <Tab.Screen name="Settings" component={MainView} />
      </Tab.Navigator>
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
