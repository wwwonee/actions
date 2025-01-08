import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from 'expo-router'
export default function shi() {
  const navigation = useNavigation()
  const go = () => {
    navigation.navigate('(view)/TikTok', { type: 1 })
  }
  return (
    <View>
      <Button title='点击播放' onPress={go}></Button>
    </View>
  )
}
