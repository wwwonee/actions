import React from 'react'
import {View,Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Inputstyles} from '../style'
import Home from '../(view)/home'
export default function index() {
  return (
    <SafeAreaView>
    <View>
        <Text style={Inputstyles.h1}>音盟</Text>
        <Home></Home>
    </View>
    </SafeAreaView>
  )
}
