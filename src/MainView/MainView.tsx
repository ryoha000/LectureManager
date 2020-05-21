import React, { useState, useContext  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Container } from 'native-base'
import MainViewFooter from './MainViewFooter'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

interface Props {
  children: React.ReactNode
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>
  type: keyof RootStackParamList
}

export default function MainView(props: Props) {
  return (
    <Container style={styles.container}>
      {props.children}
      <View style={styles.footer}>
        <MainViewFooter type={props.type} navigation={props.navigation}/>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: 0,
    width: '100%'
  },
  footer: {
    marginTop: 'auto',
    width: '100%'
  }
});
