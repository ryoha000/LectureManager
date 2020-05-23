import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TextInputChangeEventData, NativeSyntheticEvent, TextInputFocusEventData, LayoutChangeEvent } from 'react-native';
import { Text, Textarea, Label, Input, Form, Item, Button, Icon } from 'native-base'
import { PlusButton, MinusButton, ConfirmButton } from "./SettingButton"
import { ScrollView } from 'react-native-gesture-handler'

export interface Props {
  title: string
  index: number
  inputs: {
    label: string;
    value: string;
    index: number
  }[][]
  useInputs: React.Dispatch<React.SetStateAction<{
    label: string;
    value: string;
    index: number;
  }[][]>>
  plus: boolean
  useIsHalf: React.Dispatch<React.SetStateAction<boolean>>
  count: number
  focusIndex: number
  useFocusIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function SettingForm(props: Props) {
  const onChangeText = (text: string, index: number) => {
    const newState = props.inputs.map((vA, iA) =>
      vA.map((v, i) => {
        if (i === index) {
          return { label: v.label, value: text, index: v.index}
        }
        return v
      }
    ))
    props.useInputs(newState)
  }
  const onFocus = (row: number, index: number) => {
    props.useFocusIndex(index)
    if (row > 3) {
      props.useIsHalf(true)
    } else {
      props.useIsHalf(false)
    }
  }
  return <ScrollView style={{height: "100%", flex: 1}}>
    <View style={styles.container}>
      <Text style={{fontSize: 24, marginBottom: 24, marginTop: 8}}>{props.title}</Text>
      <Form style={styles.container}>
        {props.inputs.map((vA, iA) =>
          <View style={{flexDirection: 'row', width: "100%", flexWrap: 'wrap'}} key={iA}>
            {vA.map((v, i, arr) =>
              <Item stackedLabel key={v.index} style={arr.length > 4 ? styles.Matrix : arr.length > 1 ? styles.MD : styles.item}>
                <Label>{v.label}</Label>
                <Input onFocus={() => onFocus(iA, v.index)} autoFocus={v.index === props.focusIndex} onChangeText={(text) => onChangeText(text, i)} secureTextEntry={v.label.length > 5} />
              </Item>)}
            {MinusButton(props, iA)}
          </View>
        )}
      </Form>
      {PlusButton(props)}
      {ConfirmButton(props)}
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  MD: {
    width: "10%"
  },
  item: {
    width: "80%"
  },
  Matrix: {
    width: "5%"
  }
})