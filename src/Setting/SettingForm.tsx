import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TextInputChangeEventData, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Text, Textarea, Label, Input, Form, Item, Button, Icon } from 'native-base'

interface Props {
  title: string
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
  half: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  count: number
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
  const inputRefs = Array(props.count).map(_ => useRef(null))
  const onFocus = (index: number) => {
    if (inputRefs[index]) {
      inputRefs[index].current
    }
  }
  return <View style={styles.container}>
    <Text style={{fontSize: 24, marginBottom: 24, marginTop: 8}}>{props.title}</Text>
    <Form style={styles.container}>
      {props.inputs.map((vA, iA) =>
        <View style={{flexDirection: 'row', width: "100%", flexWrap: 'wrap'}} key={iA}>
          {vA.map((v, i, arr) => 
            <Item stackedLabel key={i} style={arr.length > 4 ? styles.Matrix : arr.length > 1 ? styles.MD : styles.item}>
              <Label>{v.label}</Label>
              <Input ref={inputRefs[v.index]} onFocus={() => onFocus(v.index)} onChangeText={(text) => onChangeText(text, i)} />
            </Item>)}
          {MinusButton(props, iA)}
        </View>
      )}
    </Form>
    {PlusButton(props)}
    <Button style={{marginTop: 24}}><Text>Confirm</Text></Button>
  </View>
}

function PlusButton(props: Props) {
  const onPress = () => {
    props.useInputs([
      ...props.inputs,
      props.inputs[props.inputs.length - 1].map((v, i, arr) => ({label: v.label, value: '', index: v.index + arr.length}))
    ])
  }
  if (props.plus) {
    return <Button onPress={onPress} transparent><Icon type="AntDesign" name="pluscircle"/></Button>
  }
  return <View />
}

function MinusButton(props: Props, index: number) {
  const onPress = () => {
    props.useInputs(props.inputs.filter((v, i) => i !== index))
  }
  if (props.plus && index !== 0) {
    return <Button onPress={onPress} style={{ marginTop: 24, bottom: 0}} transparent><Icon type="AntDesign" name="minuscircle"/></Button>
  }
  return <Button transparent><Icon style={{color: "white"}} type="AntDesign" name="minuscircle"/></Button>
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