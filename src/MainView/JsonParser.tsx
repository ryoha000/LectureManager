import React from 'react';
import { AsyncStorage } from 'react-native';
import * as Crypto from '@trackforce/react-native-crypto'
import { Buffer } from "buffer";

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

export const passwordBits = 2048;
const ivBuffer = Buffer.from('random16bytesstr');
const ivBase64 = ivBuffer.toString('base64');

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

export function Encrypt(word: string, key: string) {
  return Crypto.Aes.encrypt(word, key, ivBase64).toString()
}

export function Decrypt(word: string, key: string) {
  return Crypto.Aes.decrypt(word, key, ivBase64).toString()
}
