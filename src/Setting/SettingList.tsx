import React, { useState  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, ListItem, Text } from 'native-base'
import SettingOverlay from './SettingOverlay'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const items = [
  '年度区分を変更する',
  '学期区分を変更する',
  'パスワードを変更する',
  'マトリクスを変更する',
  '暗号化されたパスワード、マトリクスを消去する'
]

interface Props {
  half: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function SettingList(props: Props) {
  const [isOverlay, useIsOverlay] = useState(false)
  const [select, useSelect] = useState({title: '', index: -1})
  const openOverlay = (title: string, i: number) => {
    useIsOverlay(true)
    useSelect({title: title, index: i})
  }
  return (
    <View style={styles.container}>
      <TouchableList isOverlay={isOverlay} useIsOverlay={useIsOverlay}>

        <List style={{height: '100%'}}>
          {items.map((element, i) => <ListItem key={i} onPress={() => openOverlay(element, i)}><Text>{element}</Text></ListItem>)}
        </List>
      </TouchableList>
      <SettingOverlay half={props.half} isOverlay={isOverlay} selectedItem={select} />
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
