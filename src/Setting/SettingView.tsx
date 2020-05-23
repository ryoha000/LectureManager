import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
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

export const SelectedIndexContext = createContext<(number | Dispatch<SetStateAction<number>>)[]>([])

export default function SettingView(props: Props) {
  const [selectedIndex, useSelectedIndex] = useState(-1)
  return (
    <MainView navigation={props.navigation} type='Setting'>
      <SelectedIndexContext.Provider value={[selectedIndex, useSelectedIndex]}>
        {SettingViewContent()}
      </SelectedIndexContext.Provider>
    </MainView>
  );
}

function SettingViewContent() {
  const [isHalf, useIsHalf] = useState(false)
  const [isOverlay, useIsOverlay] = useState(false)
  const [index, useIndex] = useState(-1)
  const [focusIndex, useFocusIndex] = useState(-1)
  if (isHalf) {
    return <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }} behavior={"position"} style={{flex: 1, width: "100%"}}>
      <SettingList
        select={index}
        useSelect={useIndex}
        isOverlay={isOverlay}
        useIsOverlay={useIsOverlay}
        useIsHalf={useIsHalf}
        focusIndex={focusIndex}
        useFocusIndex={useFocusIndex}
      />
    </KeyboardAvoidingView>
  }
  return (<View style={{ flex: 1, width: '100%' }}>
    <SettingList
      select={index}
      useSelect={useIndex}
      isOverlay={isOverlay}
      useIsOverlay={useIsOverlay}
      useIsHalf={useIsHalf}
      focusIndex={focusIndex}
      useFocusIndex={useFocusIndex}
    />
  </View>
  );
}
