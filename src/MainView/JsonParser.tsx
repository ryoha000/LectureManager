import React from 'react';
import { AsyncStorage } from 'react-native';

type settingJson = {
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
