import React, { Dispatch, SetStateAction, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, FooterTab, Footer, Button, Icon } from 'native-base'
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  type: keyof RootStackParamList
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>
}

export default function MainViewFooter(props: Props) {
  const transition = (type: keyof RootStackParamList) => {
    props.navigation.push(type)
  }

  return (
    <Footer style={styles.container}>
      <FooterTab>
        <Button onPress={() => transition("Schedule")} style={{backgroundColor: props.type === "Schedule" ? '#000' : '#fff' }}>
          <Icon type="Entypo" name="calendar" />
        </Button>
        <Button onPress={() => transition("Note")} style={{backgroundColor: props.type === "Note" ? '#000' : '#fff' }}>
          <Icon type="Entypo" name="open-book" />
        </Button>
        <Button onPress={() => transition("Setting")} style={{backgroundColor: props.type === "Setting" ? '#000' : '#fff' }}>
          <Icon type="Ionicons" name="ios-settings" />
        </Button>
      </FooterTab>
    </Footer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff'
  },
  calendarButton: {
    backgroundColor: '#000'
  },
  noteButton: {
    backgroundColor: '#000'
  },
  settingButton: {
    backgroundColor: '#000'
  }
});
