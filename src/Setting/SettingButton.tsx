import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base'
import { confirm } from './SettingFunctions'
import { Props } from './SettingForm'

export function PlusButton(props: Props) {
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

export function MinusButton(props: Props, index: number) {
  const onPress = () => {
    props.useInputs(props.inputs.filter((v, i) => i !== index))
  }
  if (props.plus && index !== 0) {
    return <Button onPress={onPress} style={{ marginTop: 24, bottom: 0}} transparent><Icon type="AntDesign" name="minuscircle"/></Button>
  } else if (props.plus) {
    return <Button transparent><Icon style={{color: "white"}} type="AntDesign" name="minuscircle"/></Button>
  }
  return <View />
}

export function ConfirmButton(props: Props) {
  const onPress = () => {
    confirm(props.index, props.inputs)
  }
  return <Button onPress={onPress} style={{marginTop: 24}}><Text>Confirm</Text></Button>
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