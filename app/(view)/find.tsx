import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet, ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { http } from '../../services/http'
import { Ionicons } from '@expo/vector-icons'; // 使用 Expo 的图标库，或其他图标库
import { useNavigation } from '@react-navigation/native';

export default function find() {
    const navigation = useNavigation(); // 导航
    const [phone, setPhone] = useState(''); // 手机号
    const [password, setPassword] = useState(''); // 密码
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [isSecure, setIsSecure] = useState(true); // 密码是否可见
    const [Secure, setSecure] = useState(true); // 确认密码是否可见
    const [code, setCode] = useState(''); // 输入验证码
    const [coderResult, setCoderResult] = useState(''); // 获取到的验证码
    const [isGet, setIsGet] = useState(true); // 是否获取验证码
    const [time, setTime] = useState(0); // 倒计时

    const [verify, setVerify] = useState(false); // 是否验证成功


    const getCode = () => {
        // 验证手机号格式
        if (phone !== '17631250767') {
            Alert.alert('请输入正确的手机号');
            return;
        } else {
            if (isGet) {
                setIsGet(false);
                http('GET', '/getCode', {
                    params: { phone: phone }
                })
                    .then(res => {
                        setCoderResult(res.msg);
                        Alert.alert('发送成功')
                    })
                    .catch(err => {
                        Alert.alert('获取失败')
                    })
                setInterval(() => {
                    setTime((prevTime) => {
                        if (prevTime >= 59) { // 判断是否到达 60 秒
                            setIsGet(true);
                            return 0; // 重置时间
                        }
                        return prevTime + 1; // 增加时间
                    });
                }, 1000);
            } else {
                Alert.alert(`请等待${60 - time}秒后重试`)
            }
        }
    }

    const verifys = () => {
        if (code === '') {
            Alert.alert('请先验证')
        }
        if (coderResult !== '' && code === coderResult) {
            Alert.alert('验证成功')
            setVerify(true);
        }
    }

    const resetPassword = () => {
        if (password === '') {
            Alert.alert('请输入密码')
            return
        }
        if (password !== confirmPassword) {
            Alert.alert('两次密码不一致')
        }
        http('POST', '/reset', {
            phone: phone,
            password: password
        })
            .then((res) => {
                if (res.code === 200) {
                    Alert.alert('重置密码成功')
                    navigation.navigate('(view)/login')
                }
            })
            .catch((err) => {
                Alert.alert('重置密码失败')
            })
    }

    return (
        <SafeAreaView style={styles.box}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <Text style={styles.title}>重置密码</Text>
                        <Text >请输入176****0767的完整手机号并获取验证码验证</Text>
                        <TextInput value={phone} onChangeText={setPhone} style={styles.phone} placeholder='请输入完整手机号' placeholderTextColor={'#888'}></TextInput>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TextInput value={code} onChangeText={setCode} style={styles.inputP} placeholder='验证码' placeholderTextColor={'#888'}></TextInput>
                            <TouchableOpacity style={styles.getP} onPress={getCode}>
                                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 40 }}>{isGet ? '获取验证码' : 60 - time + 's'}</Text>
                            </TouchableOpacity>
                        </View>
                        {verify && <View>
                            <View>
                                <TextInput secureTextEntry={isSecure} style={styles.inputs} placeholder='密码' placeholderTextColor={'#888'} value={password} onChangeText={text => setPassword(text)}></TextInput>
                                <Ionicons onPress={() => setIsSecure(!isSecure)} style={styles.eye} name={!isSecure ? 'eye' : 'eye-off'} size={24} color="black"></Ionicons>
                            </View>
                            <View>
                                <TextInput secureTextEntry={Secure} style={styles.inputs} placeholder='确认密码' placeholderTextColor={'#888'} value={confirmPassword} onChangeText={text => setConfirmPassword(text)}></TextInput>
                                <Ionicons onPress={() => setSecure(!Secure)} style={styles.eye} name={!Secure ? 'eye' : 'eye-off'} size={24} color="black"></Ionicons>
                            </View>
                        </View>}
                        <TouchableOpacity style={styles.register} onPress={verify ? resetPassword : verifys}>
                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 40 }}>{verify ? '重置密码' : '验证手机号'}</Text>
                        </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    box: {
        width: wp('80%'),
        marginLeft: wp('10%'),
        height: hp('100%'),
    },
    title: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 100
    },
    phone: {
        ...input,
        borderRadius: 10
    },
    inputP: {
        width: wp('40%'),
        height: hp('5%'),
        borderColor: '#aaa',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 10,
        marginRight: wp('10%'),
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
    getP: {
        width: wp('30%'),
        height: hp('5%'),
        lineHeight: 20,
        backgroundColor: '#33aaff',
        borderRadius: 5,
    },
    register: {
        width: wp('80%'),
        height: hp('5%'),
        lineHeight: 20,
        backgroundColor: '#FBa053',
        borderRadius: 5,
        marginTop: 20,
    }
})