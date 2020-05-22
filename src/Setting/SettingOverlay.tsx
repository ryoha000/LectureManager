import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Textarea, Label, Input, Form, Item } from 'native-base'
import SettingInput from './SettingInput'

interface Props {
  isOverlay: boolean
  selectedItem: {title: string, index: number}
  half: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function SettingOverlay(props: Props) {
  if (!props.isOverlay) {
    return <View />
  }
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: "80%", alignItems: 'stretch', margin: "auto"}}>
        <SettingInput half={props.half} selectedItem={props.selectedItem} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '80%',
    height: '80%',
    margin: '7%',
    backgroundColor: 'white',
    zIndex: 3,
    borderRadius:16,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1
  }
})