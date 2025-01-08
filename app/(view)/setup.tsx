import React from 'react'
import { View, SafeAreaView, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function setup() {

    const navigation = useNavigation()

    const login = async () => {
        let islogin = await AsyncStorage.getItem('login')
        if (islogin) {
            Alert.alert('您已经登录过了')
        } else {
            navigation.navigate('(view)/login')
        }
    }
    const register = () => {
        navigation.navigate('(view)/register')
    }

    const layout = async () => {
        let islogin = await AsyncStorage.getItem('login')
        if (!islogin) {
            Alert.alert('请先登录')
        } else {
            AsyncStorage.removeItem('login')
            Alert.alert('退出登录成功')
        }
    }
    return (
        <SafeAreaView>
            <View>
                <Text>设置</Text>
                <Button onPress={login} title='登录'></Button>
                <Button onPress={register} title='注册'></Button>
                <Button onPress={layout} title='退出登录'></Button>
            </View>
        </SafeAreaView>
    )
}
