import React, { useState } from 'react';
import { Button, Fab, Icon } from 'native-base'

interface Props {
  openCamera: () => void
  openCameraRoll: () => void
}

export default function NoteFab(props: Props) {
  const [active, useActive] = useState(false)
  return (
    <Fab
      active={active}
      direction="up"
      containerStyle={{ }}
      style={{ backgroundColor: '#5067FF' }}
      position="bottomRight"
      onPress={() => useActive(!active)}
      >
      <Icon name="plus" type="Entypo" fontSize={50} />
      <Button style={{ backgroundColor: '#34A34F' }} onPress={props.openCamera} >
        <Icon type="Entypo" name="camera" />
      </Button>
      <Button style={{ backgroundColor: '#3B5998' }} onPress={props.openCameraRoll}>
        <Icon type="Foundation" name="folder-add" />
      </Button>
    </Fab>
  );
}
