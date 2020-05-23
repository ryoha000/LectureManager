import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Textarea, Label, Input, Form, Item } from 'native-base'
import SettingForm from './SettingForm'
import { createMatrix, createInput } from './SettingFunctions'

interface Props {
  selectedIndex: number
  useIsHalf: React.Dispatch<React.SetStateAction<boolean>>
  focusIndex: number
  useFocusIndex: React.Dispatch<React.SetStateAction<number>>
}

export interface InputType {
  label: string
  value: string
  index: number
}

export default function SettingInput(props: Props) {
  const [title, useTitle] = useState('')
  const [index, useIndex] = useState(-1)
  const [plus, usePlus] = useState(false)
  const [inputs, useInputs] = useState<InputType[][]>([[]])
  const [count, useCount] = useState(0)
  useEffect(() => {
    switch (props.selectedIndex) {
      case 0:
        useTitle('年度初めを入力してください')
        useInputs([[createInput("Month", 0), createInput("Day", 1)]])
        useIndex(0)
        useCount(2)
        break
      case 1:
        useTitle("各学期区分の初日を入力してください")
        useInputs([[createInput("Name", 0), createInput("Month", 1), createInput("Day", 2)]])
        useCount(3)
        useIndex(1)
        usePlus(true)
        break
      case 2:
        useTitle("パスワードと暗号化キーを入力してください")
        useInputs([[createInput("Password", 0)], [createInput("暗号化キー", 1)]])
        useCount(2)
        useIndex(2)
        break
      case 3:
        useTitle("マトリクスと暗号化キーを入力してください")
        useInputs([...createMatrix(), [createInput("暗号化キー", 70)]])
        useCount(71)
        useIndex(3)
        break
    }
    return
  }, [])
  return <SettingForm 
    index={index}
    count={count}
    useIsHalf={props.useIsHalf}
    title={title}
    inputs={inputs}
    useInputs={useInputs}
    plus={inputs.length > 7 ? false : plus}
    focusIndex={props.focusIndex}
    useFocusIndex={props.useFocusIndex}
  />
}