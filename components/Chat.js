import { View, Text } from 'react-native'
import React from 'react'

export default function Chat(props) {
  const name = props.route.params.text;
  const color = props.route.params.color;
  props.navigation.setOptions({title: name});

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={{fontSize: 100, color: 'black'}}>{name}</Text>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

