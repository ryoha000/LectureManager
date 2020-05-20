import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Container,  Header, Body, Title, Left, Button, Icon, Right, Text } from 'native-base'

interface Props {
  title: string
}

export default function MainViewHeader(props: Props) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body style={styles.title}>
          <Title>{props.title}</Title>
        </Body>
      </Header>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    alignItems: (Platform.OS === 'ios') ? 'flex-start' :'flex-start',
  }
});