import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, FooterTab, Footer, Button, Icon } from 'native-base'

interface Props {
  type: string
  useType: Dispatch<SetStateAction<string>>
}

export default function MainViewFooter(props: Props) {
  return (
    <Footer style={styles.container}>
      <FooterTab>
        <Button onPress={() => props.useType("Calendar")} style={{backgroundColor: props.type === "Calendar" ? '#000' : '' }}>
          <Icon type="Entypo" name="calendar" />
        </Button>
        <Button onPress={() => props.useType("Note")} style={{backgroundColor: props.type === "Note" ? '#000' : '' }}>
          <Icon type="Entypo" name="open-book" />
        </Button>
        <Button onPress={() => props.useType("Setting")} style={{backgroundColor: props.type === "Setting" ? '#000' : '' }}>
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
