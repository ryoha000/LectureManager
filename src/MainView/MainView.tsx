import React, { useState  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container } from 'native-base'
import MainViewHeader from './MainViewHeader'
import MainViewFooter from './MainViewFooter'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function MainView() {
  const [type, useType] = useState("Note")
  return (
    <Container style={styles.container}>
      {/* <View style={styles.header}>
        <MainViewHeader title={type} />
      </View> */}
      <View style={styles.footer}>
        <MainViewFooter type={type} useType={useType}/>
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
