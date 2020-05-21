import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import { Button, Icon, Grid, Col, Badge } from 'native-base'
import * as MediaLibrary from 'expo-media-library'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ALBUM_NAME = "testAlbum"
const {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT
} = Dimensions.get('window');

export default function CameraRollView() {
  const [hasMediaPermission, setHasMediaPermission] = useState<null|boolean>(null);
  const [photos, usePhotos] = useState<MediaLibrary.Asset[]>([])
  const [selectedIndex, useSelectedIndex] = useState<number[]>([])

  useEffect(() => {
    (async () => {
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaPermission.status === 'granted');
      if (mediaPermission.status === 'granted') {
        const assets = await MediaLibrary.getAssetsAsync({sortBy: 'creationTime'})
        assets.assets.push(...assets.assets, ...assets.assets)
        usePhotos(assets.assets)
      }
    })();
  }, []);

  if (hasMediaPermission === null) {
    return <View />;
  }
  if (hasMediaPermission === null) {
    return <Text>No access media library</Text>;
  }
  return (
    <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        {photos.map((p, i, array) => {
          // if ((i + 1) % Math.floor(Math.min(DEVICE_HEIGHT / 200, DEVICE_WIDTH / 200)) === 0) {
          //   return (<Image resizeMode='contain' source={{uri: p.uri}} key={i} style={{width: 200, height: 200}} />)
          // }
          return (<TouchableOpacity onLongPress={() => useSelectedIndex([...selectedIndex, i])} onPress={() => useSelectedIndex([i])} style={{position: 'relative'}}>
              <CameraRollViewBadge selectedIndex={selectedIndex} i={i} />
              <Image resizeMode='contain' source={{uri: p.uri}} key={i} style={{...styles.image, borderColor: selectedIndex.indexOf(i) === -1 ? 'black' : 'blue'}} />
            </TouchableOpacity>
          )}
        )}
      </View>
    </ScrollView>
  );
}

function CameraRollViewBadge(props: {selectedIndex: number[], i: number}) {
  if (props.selectedIndex.indexOf(props.i) === -1) {
    return <View />
  }
  return (
    <Badge style={{position: 'absolute', backgroundColor: 'blue', marginLeft: 10, marginTop: 10, zIndex: 3}}>
      <Icon type="Entypo" name="plus" style={{ fontSize: 15, color: 'white', lineHeight: 20 }}/>
    </Badge>
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    width: 200,
    height: 200
  }
});
