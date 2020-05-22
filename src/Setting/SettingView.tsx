import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'native-base'
import * as MediaLibrary from 'expo-media-library'
import MainView from '../MainView/MainView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import SettingList from './SettingList'

type SettingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Setting'
>;

type SettingRouteProp = RouteProp<RootStackParamList, 'Setting'>;

type Props = {
  route: SettingRouteProp
  navigation: SettingNavigationProp
}

export default function SettingView(props: Props) {
  return (
    <MainView navigation={props.navigation} type='Setting'>
      {SettingViewContent()}
    </MainView>
  );
}

function SettingViewContent() {
  const [isHalf, useIsHalf] = useState(false)
  return (
    <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} behavior={isHalf ? "position" : "null"} style={{flex: 1, width: "100%"}}>

    {/* <View style={{ flex: 1, width: '100%' }}> */}

      <SettingList half={[isHalf, useIsHalf]}/>
    {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

});
