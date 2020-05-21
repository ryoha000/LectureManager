import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Icon } from 'native-base'
import * as MediaLibrary from 'expo-media-library'

const ALBUM_NAME = "testAlbum"
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT
} = Dimensions.get('window');

export default function SettingView() {
  const [hasCameraPermission, setHasCameraPermission] = useState<null|boolean>(null);
  const [hasMediaPermission, setHasMediaPermission] = useState<null|boolean>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef<null | Camera>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaPermission.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const pic = await cameraRef.current?.takePictureAsync()
    if (pic?.uri) {
      const asset = await MediaLibrary.createAssetAsync(pic.uri);
      const albums = await MediaLibrary.getAlbumsAsync()
      albums.forEach(v => alert(v.title))
      const album = (await MediaLibrary.getAlbumsAsync()).find(album => album.title === ALBUM_NAME)
      try {
        if (album) {
          const result = await MediaLibrary.addAssetsToAlbumAsync([asset], album)
        } else {
          const createdAlbum = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
        }
      } catch (e) {
        alert(e)
      }
    }
  }

  if (hasCameraPermission === null || hasMediaPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasMediaPermission === null) {
    return <Text>No access to camera or media library</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>

            <Button
              style={styles.cycle}
              transparent
              onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}}
            >
              <Icon style={{fontSize: 70}} type="Entypo" name="cycle" />
            </Button>
            <Button style={styles.camera} transparent><Icon style={{fontSize: 100}} onPress={takePicture} type="MaterialIcons" name="camera" /></Button>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  cycle: {
    width: 100,
    height: 100,
    marginTop: 'auto',
    marginLeft: DEVICE_WIDTH / 2 - 175,
    marginRight: 0
  },
  camera: {
    width: 150,
    height: 150,
    marginTop: 'auto',
    marginLeft: 0
  }
});
