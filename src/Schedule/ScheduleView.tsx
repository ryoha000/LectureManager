import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Text, Container, Fab, Icon } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'
import MainView from '../MainView/MainView'

type ScheduleNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Schedule'
>;

type ScheduleRouteProp = RouteProp<RootStackParamList, 'Schedule'>;

type Props = {
  route: ScheduleRouteProp
  navigation: ScheduleNavigationProp;
};

export default function ScheduleView(props: Props) {
  return (
      <MainView type='Schedule' navigation={props.navigation}>
        <View style={styles.container}>
          <Text>this is ScheduleView</Text>
          <Button onPress={() => props.navigation.push("Setting")}><Text>go setting</Text></Button>
        </View>
      </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
