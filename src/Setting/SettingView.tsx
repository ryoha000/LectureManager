import React, { useState, useEffect, useRef, createContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'native-base'
import * as MediaLibrary from 'expo-media-library'
import MainView from '../MainView/MainView';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';

const ALBUM_NAME = "testAlbum"

type SettingNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Setting'
>;

type SettingRouteProp = RouteProp<RootStackParamList, 'Setting'>;

type Props = {
  route: SettingRouteProp
  navigation: SettingNavigationProp
}

export default function SettingView(props: Props) {
  const [active, useActive] = useState(false)
  return (
      <MainView navigation={props.navigation} type='Setting'>
        {SettingViewContent()}
      </MainView>
  );
}

function SettingViewContent() {
  const [hasPermission, setHasPermission] = useState<null|boolean>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<null | Camera>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      console.log('a')
    })();
  }, []);

  const takePicture = async () => {
    const pic = await cameraRef.current?.takePictureAsync()
    let nowPermission = await MediaLibrary.getPermissionsAsync()
    console.log(nowPermission)
    const permission = await MediaLibrary.requestPermissionsAsync()
    if (permission.granted) {
      nowPermission = await MediaLibrary.getPermissionsAsync()
      if (pic?.uri) {
        console.log(pic)
        alert(pic.uri)
        const album = (await MediaLibrary.getAlbumsAsync()).find(a => a.title === ALBUM_NAME)
        try {
          if (album) {
            const asset = await MediaLibrary.createAssetAsync(pic.uri);
            const result = await MediaLibrary.addAssetsToAlbumAsync([asset], album)
            alert(result)
          } else {
            alert('album not found')
          }
          //const asseta = await MediaLibrary.createAssetAsync(pic.uri);
        } catch (e) {
          alert(e)
        }
      }
    } else {
      console.log(permission)
    }
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
            <Button
              style={styles.button}
              onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}><Text>flip</Text></Button>
            <Button style={styles.button} onPress={takePicture}><Text>get photo</Text></Button>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '10%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '10%'
  }
});
