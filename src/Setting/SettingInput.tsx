import React, { useState, useEffect, useRef, createContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Textarea, Label, Input, Form, Item } from 'native-base'
import SettingForm from './SettingForm'

interface Props {
  selectedItem: {title: string, index: number}
  half: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function SettingInput(props: Props) {
  const [title, useTitle] = useState('')
  const [plus, usePlus] = useState(false)
  const [inputs, useInputs] = useState<{label: string, value: string, index: number}[][]>([[]])
  const [count, useCount] = useState(0)
  useEffect(() => {
    
    switch (props.selectedItem.index) {
      case 0:
        useTitle('年度初めを入力してください')
        useInputs([[createInput("Month", 0), createInput("Day", 1)]])
        useCount(2)
        break
      case 1:
        useTitle("各学期区分の初日を入力してください")
        useInputs([[createInput("Name", 0), createInput("Month", 1), createInput("Day", 2)]])
        useCount(3)
        usePlus(true)
        break
      case 2:
        useTitle("パスワードと暗号化キーを入力してください")
        useInputs([[createInput("Password", 0)], [createInput("暗号化キー", 1)]])
        useCount(2)
        break
      case 3:
        useTitle("マトリクスと暗号化キーを入力してください")
        useInputs([...createMatrix(), [createInput("暗号化キー", 70)]])
        useCount(71)
        break
    }
    return () => {
      
    }
  }, [])
  return <SettingForm count={count} half={props.half} title={props.selectedItem.title} inputs={inputs} useInputs={useInputs} plus={inputs.length > 7 ? false : plus} />
}

function createInput(label: string, index: number) {
  return {label: label, value: '', index: index}
}

function createMatrix() {
  let inputs: {label: string, value: string, index: number}[][] = []
  for (let i = 0; i < 7; i++) {
    let input: {label: string, value: string, index: number}[] = []
    for (let j = 0; j < 10; j++) {
      input.push(createInput(`${String.fromCharCode("A".charCodeAt(0) + j)}-${i + 1}`, 7 * i + j))
    }
    inputs.push(input)
  }
  return inputs
}

const styles = StyleSheet.create({
  container: {
    // maxWidth: '80%',
    // alignItems: 'center'
  }
})