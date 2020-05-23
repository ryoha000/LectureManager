import React from 'react';
import { AsyncStorage } from 'react-native';
import axios from 'axios'

export type SettingJson = {
  password: string
  matrix: string
  year: string
  quarter: string
}

type schedulesJson = {
  schedules: schedule[]
}

type documentsJson = {
  documents: document[]
}

type schedule = {
  id: string
  year: string
  quarter: string
  cycle: lecture[][] //cycle.length = 7
}

type lecture = {
  id: string
  name: string
}

type document = {
  asset_id: string
  lecture_id: string
  tab_id: string
}

export async function saveData<T>(key: 'schedules' | 'setting' | 'documents', t: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(t))
  } catch (e) {
    alert(e)
  }
}

export const getData = async (type: 'schedules' | 'setting' | 'documents') => {
  try {
    const value = await AsyncStorage.getItem(type)
    if (value) {
      return JSON.parse(value)
    } else {
      alert('value in NaN')
    }
  } catch (e) {
    alert(e)
  }
}

const encryptURL = "https://us-central1-crypto-278103.cloudfunctions.net/Encrypt"
const decryptURL = "https://us-central1-crypto-278103.cloudfunctions.net/Decrypt"

export async function Encrypt(word: string, key: string): Promise<string> {
  try {
    const res = await axios.post(encryptURL, { word: word, key: key })
    alert(res.data)
    return res.data
  } catch (e) {
    alert(e)
    return word
  }
}

export async function Decrypt(word: string, key: string) {
  try {
    const res = await axios.post(decryptURL, { word: word, key: key })
    alert(res.data)
    return res.data
  } catch (e) {
    alert(e)
    alert(word)
    return word
  }
}
