import React, { useState } from 'react'
import { SafeAreaView, ImageBackground, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Image, Button, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { http } from '../../services/http'
import { Ionicons } from '@expo/vector-icons'; // 使用 Expo 的图标库，或其他图标库
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function login() {
    const [username, setUsername] = useState(''); // 用户名
    const [password, setPassword] = useState(''); // 密码
    const [isSecure, setIsSecure] = useState(true); // 密码是否可见

    const navigation = useNavigation();

    const login = () => {
        const validations = [
            { condition: !username, message: '请填写用户名' },
            { condition: !password, message: '请填写密码' }
        ];
        for (const validation of validations) {
            if (validation.condition) {
                Alert.alert(validation.message);
                return;
            }
        }
        http('POST', '/login', {
            username,
            password,
        })
            .then((res) => {
                if (res.code === 200) {
                    AsyncStorage.setItem('login', JSON.stringify(res.data));
                    navigation.navigate('index');
                    Alert.alert('登录成功');
                }
            })
            .catch((error) => {
                Alert.alert('登录失败');
            })
    }

    return (
        <SafeAreaView style={styles.box}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <Text style={styles.title}>用户登录</Text>
                        <View style={styles.form}>
                            <TextInput style={styles.inputs} placeholder='用户名/手机号' placeholderTextColor={'#888'} value={username} onChangeText={setUsername}></TextInput>
                            <View>
                                <TextInput secureTextEntry={isSecure} style={styles.inputs} placeholder='密码' placeholderTextColor={'#888'} value={password} onChangeText={text => setPassword(text)}></TextInput>
                                <Ionicons onPress={() => setIsSecure(!isSecure)} style={styles.eye} name={!isSecure ? 'eye' : 'eye-off'} size={24} color="black"></Ionicons>
                            </View>
                            <TouchableOpacity style={styles.register} onPress={login}>
                                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 40 }}>登&nbsp;&nbsp;&nbsp;录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttom}>
                            <Text style={styles.registerText} onPress={() => navigation.navigate('(view)/find')}>忘记密码</Text>
                            <Text style={styles.registerText} onPress={() => navigation.navigate('(view)/register')}>没有账号？去注册</Text>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

const input = {
    width: wp('80%'),
    height: hp('5%'),
    borderColor: '#aaa',
    borderWidth: 1,
    marginTop: 20,
    paddingLeft: 10,
    overFlow: 'hidden',
}

const styles = StyleSheet.create({
    box: {
        width: wp('100%'),
        height: hp('100%'),

    },
    title: {
        textAlign: 'left',
        marginLeft: wp('10%'),
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 100,
    },
    container: {
        alignItems: 'center',
        width: wp('100%'),
    },
    avatar: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: 50,
    },
    placeholder: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: 50,
        backgroundColor: '#e8e8e8',
    },
    form: {
        width: wp('90%'),
        height: hp('33%'),
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        padding: 20,
    },
    inputs: {
        ...input,
        borderRadius: 10
    },
    eye: {
        position: 'absolute',
        right: 10,
        marginTop: 30
    },
    register: {
        width: wp('80%'),
        height: hp('5%'),
        lineHeight: 20,
        backgroundColor: '#FBa053',
        borderRadius: 5,
        marginTop: 40,
    },
    registerText: {
        color: 'balck'
    },
    buttom: {
        width: wp('80%'),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: wp('10%'),
    }
});