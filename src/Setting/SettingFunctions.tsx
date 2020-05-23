import { getData, saveData, SettingJson, Encrypt, Decrypt } from '../MainView/JsonParser'
import { InputType } from './SettingInput'
import * as LocalAuthentication from 'expo-local-authentication';

export function createInput(label: string, index: number): InputType {
  return { label: label, value: '', index: index }
}

export function createMatrix(): InputType[][] {
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

export async function confirm(index: number, inputs: InputType[][]) {
  // const canuse = await LocalAuthentication.hasHardwareAsync()
  // alert(`canuse: ${canuse}`)
  // const types = await LocalAuthentication.supportedAuthenticationTypesAsync()
  // alert(`types: ${types.length}`)
  // const hasInfo = await LocalAuthentication.isEnrolledAsync()
  // alert(`info: ${hasInfo}`)
  // const auth = await LocalAuthentication.authenticateAsync({})
  // alert('confirm')
  switch (index) {
    case 2:
      const settingJson = await getData('setting')
      const word = inputs[0][0].value
      const key = inputs[1][0].value
      if (settingJson === null) {
        alert("setting is null")
        const setting: SettingJson = {
          password: await Encrypt(word, key),
          matrix: "",
          year: "",
          quarter: ""
        }
        await saveData('setting', setting)
        return
      }
      alert(`prevPassword: ${settingJson.password}`)
      alert(`newPassword: ${word}`)
      await saveData('setting', {...settingJson, password: await Encrypt(word, key)})
      return
  }
}