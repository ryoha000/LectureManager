import React, { useState  } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, ListItem, Text } from 'native-base'

interface Props {
  listHeader: string
  listItem: JSX.Element[]
}

export default function SettingList(props: Props) {
  return (
    <Container style={styles.container}>
      <List>
        <ListItem itemHeader first>
          <Text>{props.listHeader}</Text>
        </ListItem>
        {props.listItem.map(element => <ListItem>{element}</ListItem>)}
      </List>
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
