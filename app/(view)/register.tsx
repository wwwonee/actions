import React, { useState } from 'react'
import { SafeAreaView, ImageBackground, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Image, Button, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Icon, RadioButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { http } from '../../services/http'
import { Ionicons } from '@expo/vector-icons'; // 使用 Expo 的图标库，或其他图标库
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
    const [avatarUri, setAvatarUri] = useState(''); // 头像
    const [username, setUsername] = useState(''); // 用户名
    const [password, setPassword] = useState(''); // 密码
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [gender, setGender] = useState('男'); // 性别
    const [age, setAge] = useState(""); // 年龄+
    const [isSecure, setIsSecure] = useState(true); // 密码是否可见
    const [Secure, setSecure] = useState(true); // 确认密码是否可见
    const [isGet, setIsGet] = useState(true); // 是否获取验证码
    const [time, setTime] = useState(0); // 倒计时
    const [phone, setPhone] = useState(''); // 手机号
    const [code, setCode] = useState(''); // 验证码
    const [coderResult, setCoderResult] = useState(''); // 获取到的验证码

    const navigation = useNavigation();

    const selectImage = async () => {
        // 请求权限
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('对不起，您需要允许访问相册！');
            return;
        }
        // 打开图库选择图片
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const getCode = () => {
        // 验证手机号格式
        if (!/^1[3456789]\d{9}$/.test(phone)) {
            Alert.alert('提示', '请输入正确的手机号');
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

    const register = () => {
        const validations = [
            { condition: !avatarUri, message: '请上传头像' },
            { condition: !username, message: '请填写用户名' },
            { condition: !password, message: '请填写密码' },
            { condition: password !== confirmPassword, message: '两次密码不一致' },
            { condition: !gender, message: '请选择性别' },
            { condition: !phone, message: '请填写手机号' },
            { condition: !code, message: '请填写验证码' },
            // { condition: code !== coderResult, message: '验证码错误' }
        ];
        for (const validation of validations) {
            if (validation.condition) {
                Alert.alert(validation.message);
                return;
            }
        }
        http('POST', '/register', {
            avatarUri,
            username,
            password,
            age,
            gender,
            phone,
        })
            .then((res) => {
                if (res.code === 200) {
                    Alert.alert('注册成功');
                    AsyncStorage.setItem('login', JSON.stringify(res.data));
                    navigation.navigate('index');
                }
            })
            .catch((error) => {
                Alert.alert('注册失败');
            })
    }

    return (
        <SafeAreaView style={styles.box}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <Text style={styles.title}>创建账户</Text>
                        <View style={styles.form}>
                            <View style={styles.container}>
                                {avatarUri ? (
                                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                                ) : (
                                    <View style={styles.placeholder} />
                                )}
                                <Button title="上传头像" color="black" onPress={selectImage} />
                            </View>
                            <TextInput style={styles.inputs} placeholder='用户名' placeholderTextColor={'#888'} value={username} onChangeText={text => setUsername(text)}></TextInput>
                            <View>
                                <TextInput secureTextEntry={isSecure} style={styles.inputs} placeholder='密码' placeholderTextColor={'#888'} value={password} onChangeText={text => setPassword(text)}></TextInput>
                                <Ionicons onPress={() => setIsSecure(!isSecure)} style={styles.eye} name={!isSecure ? 'eye' : 'eye-off'} size={24} color="black"></Ionicons>
                            </View>
                            <View>
                                <TextInput secureTextEntry={Secure} style={styles.inputs} placeholder='确认密码' placeholderTextColor={'#888'} value={confirmPassword} onChangeText={text => setConfirmPassword(text)}></TextInput>
                                <Ionicons onPress={() => setSecure(!Secure)} style={styles.eye} name={!Secure ? 'eye' : 'eye-off'} size={24} color="black"></Ionicons>
                            </View>
                            <View style={styles.genderContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginRight: 10 }}>性别:</Text>
                                    <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                            <RadioButton value="男" color='green' />
                                            <Text>男</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton value="女" color='green' />
                                            <Text>女</Text>
                                        </View>
                                    </RadioButton.Group>
                                </View>
                                <View style={styles.age}>
                                    <Text style={styles.label}>年龄:</Text>
                                    <Picker
                                        selectedValue={age}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setAge(itemValue)}
                                        itemStyle={{ height: 100, width: 100, fontSize: 16 }}
                                    >
                                        {Array.from({ length: 70 }, (_, index) => index + 10).map((age) => (
                                            <Picker.Item key={age} label={`${age}`} value={age.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                            <TextInput value={phone} onChangeText={setPhone} style={styles.phone} placeholder='绑定手机号' placeholderTextColor={'#888'}></TextInput>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TextInput value={code} onChangeText={setCode} style={styles.inputP} placeholder='验证码' placeholderTextColor={'#888'}></TextInput>
                                <TouchableOpacity style={styles.getP} onPress={getCode}>
                                    <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 40 }}>{isGet ? '获取验证码' : 60 - time + 's'}</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.register} onPress={register}>
                                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', lineHeight: 40 }}>创&nbsp;&nbsp;&nbsp;建</Text>
                            </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    box: {
        width: wp('100%'),
        height: hp('100%'),

    },
    age: {
        width: wp('40%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    label: {
        width: wp('12%'),
        marginBottom: 10,
        fontSize: 16,
    },
    picker: {
        height: 100,
        width: '50%',
        marginRight: 20
    },
    title: {
        textAlign: 'left',
        marginLeft: wp('10%'),
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20
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
        height: hp('80%'),
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
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('80%'),
        marginTop: 20,
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
});