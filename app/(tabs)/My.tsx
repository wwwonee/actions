import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';

const AppTitle = () => {
  const my = () => {
    router.push({
      pathname: '(view)/homePage',
    });
  };
  const navigation = useNavigation();
  const handleTabPress = (tabName: any) => {
    navigation.navigate('(view)/setup');
    console.log(`Tab ${tabName} pressed`);
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const styles = isEnabled ? require('../../app/style/Black').default : require('../../app/style/White').default
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [info, setInfo] = useState('')
  const getLoginData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('login');
      if (jsonValue !== null) {
        const loginData = JSON.parse(jsonValue);
        loginData._id = loginData._id.toString().slice(15, -1)
        setInfo(loginData)
      } else {
        setInfo('')
      }
    } catch (e) {
      // 处理读取错误
      console.error(e);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getLoginData();
    }, [])
  )
  return (
    <ImageBackground
      source={require("../../assets/images/1.jpg")} // 替换为你的图片路径
      style={styles.backgroundImage}
    >
      <Text style={styles.title}></Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          height: "25%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 240,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../../assets/images/1.jpg")}
            style={styles.Image}
          />
          <View style={{ width: 130 }}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              {info ? info.username : '未登录'}
            </Text>
            <Text style={styles.fonts}>ID: {info ? info._id : "---"}</Text>
            <View style={styles.information}>
              <Text style={{ color: '#fff', paddingRight: 10 }}>{info ? info.fans : 0}粉丝</Text>
              <Text style={{ color: '#fff', paddingRight: 10 }}>{info ? info.follow : 0}关注</Text>
            </View>
          </View>
        </View>
        <View style={{ marginRight: 20 }}>
          <AntDesign onPress={my} name="right" size={30} color="#fff" />
        </View>
      </View>
      <View style={[styles.back, { height: "71%" }]}>
        <View
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.butlabel}>
            <Text>
              <AntDesign name="instagram" size={40} color="rgb(255,188,203)" />
            </Text>

            <Text style={[styles.label, ,]}>作者入驻</Text>
          </View>
          <View style={styles.butlabel}>
            <Text>
              <FontAwesome6 name="bitcoin" size={40} color="rgb(255,195,125)" />
            </Text>
            <Text style={[styles.label, { fontSize: 14 }]}>话题活动</Text>
          </View>

          <View style={styles.butlabel}>
            <Text>
              <AntDesign name="sound" size={40} color="rgb(110,177,254)" />

            </Text>
            <Text style={[styles.label, { fontSize: 14 }]}>消息中心</Text>
          </View>

        </View>
        <View>

          {/* 观看记录选项卡 */}
          <TouchableOpacity
            onPress={() => handleTabPress("观看记录")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <MaterialIcons name="access-time" size={24} color={isEnabled ? "#fff" : "black"} />
              <Text style={styles.tabText}>观看记录</Text>
            </View>
            <Text><AntDesign name="right" size={30} color="#fff" /></Text>
          </TouchableOpacity>

          {/* 意见反馈选项卡 */}
          <TouchableOpacity
            onPress={() => handleTabPress("意见反馈")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <AntDesign name="question" size={24} color={isEnabled ? "#fff" : "black"} />
              <Text style={styles.tabText}>意见反馈</Text>
            </View>
            <Text><AntDesign name="right" size={30} color="#fff" /></Text>
          </TouchableOpacity>

          {/* 设置选项卡 */}
          <TouchableOpacity
            onPress={() => handleTabPress("设置")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <AntDesign name="setting" size={24} color={isEnabled ? "#fff" : "black"} />
              <Text style={styles.tabText}>设置</Text>
            </View>
            <Text><AntDesign name="right" size={30} color="#fff" /></Text>
          </TouchableOpacity>

          {/* 深夜模式选项卡（可选，根据您的需求添加） */}
          <TouchableOpacity
            onPress={() => handleTabPress("深夜模式")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <Feather name="moon" size={24} color={isEnabled ? "#fff" : "black"} />
              <Text style={styles.tabText}>深夜模式</Text>
            </View>
            <View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  tabText: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default AppTitle;
