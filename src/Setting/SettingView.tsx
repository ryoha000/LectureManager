import React, { useState  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container } from 'native-base'

export default function SettingView() {
  return (
    <Container style={styles.container}>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
