import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Text, Container, Fab, Icon } from 'native-base'
import NoteFab from './NoteFab'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'
import MainView from '../MainView/MainView'

type NoteNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Note'
>;

type NoteRouteProp = RouteProp<RootStackParamList, 'Note'>;

type Props = {
  route: NoteRouteProp
  navigation: NoteNavigationProp;
};

export default function NoteView(props: Props) {
  const openCamera = () => {
    props.navigation.push('Camera')
  }
  return (
    <Container>
      <MainView type={'Note'} navigation={props.navigation}>
        <View style={styles.container}>
          <Text>this is NoteView</Text>
          <Text>{props.route.params.a}</Text>
          <Button onPress={() => props.navigation.push("Setting")}><Text>go setting</Text></Button>
          <Button onPress={() => props.navigation.push("Schedule")}><Text>go Schedule</Text></Button>
          <NoteFab openCamera={openCamera} />
        </View>
      </MainView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
