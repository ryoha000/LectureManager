import React, { useState, useContext  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, ListItem, Text } from 'native-base'
import SettingOverlay from './SettingOverlay'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const items = [
  '年度区分を変更する',
  '学期区分を変更する',
  'パスワードを変更する',
  'マトリクスを変更する',
  '暗号化されたパスワード、マトリクスを消去する'
]

interface Props {
  useIsHalf: React.Dispatch<React.SetStateAction<boolean>>
  isOverlay: boolean
  useIsOverlay: React.Dispatch<React.SetStateAction<boolean>>
  select: number
  useSelect: React.Dispatch<React.SetStateAction<number>>
  focusIndex: number
  useFocusIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function SettingList(props: Props) {
  const openOverlay = (i: number) => {
    props.useIsOverlay(true)
    props.useSelect(i)
    props.useFocusIndex(-1)
  }
  return (
    <View style={styles.container}>
      <TouchableList isOverlay={props.isOverlay} useIsOverlay={props.useIsOverlay}>
        <List style={{height: '100%'}}>
          {items.map((element, i) => <ListItem key={i} onPress={() => openOverlay(i)}><Text>{element}</Text></ListItem>)}
        </List>
      </TouchableList>
      <SettingOverlay useIsHalf={props.useIsHalf} isOverlay={props.isOverlay} selectedIndex={props.select} focusIndex={props.focusIndex} useFocusIndex={props.useFocusIndex} />
    </View>
  );
}

function TouchableList(props: {children: React.ReactNode, isOverlay: boolean, useIsOverlay: React.Dispatch<React.SetStateAction<boolean>>}) {
  if (props.isOverlay) {
    return <TouchableWithoutFeedback onPress={() => props.useIsOverlay(false)}>{props.children}</TouchableWithoutFeedback>
  } else {
    return <View>{props.children}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  }
});
