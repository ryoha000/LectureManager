import { getData, saveData, SettingJson, Encrypt, Decrypt } from '../MainView/JsonParser'
import { InputType } from './SettingInput'
import SettingInput from './SettingInput'

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
  switch (index) {
    case 2:
      const settingJson = await getData('setting')
      const key = inputs[1][0].value
      const word = inputs[0][0].value
      if (settingJson === null) {
        const setting: SettingJson = {
          password: Encrypt(word, key),
          matrix: "",
          year: "",
          quarter: ""
        }
        await saveData('setting', setting)
      }
      await saveData('setting', {...settingJson, password: Encrypt(word, key)})
      break
  }
}