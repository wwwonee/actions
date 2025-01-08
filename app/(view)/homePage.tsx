import React, { useState } from "react";
import { router } from 'expo-router';
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
export default function homePage() {
  const handleTabPress = (tabName: any) => {
    console.log(`Tab ${tabName} pressed`);
  };
  const my = () => {
    router.back()
  };

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
  
  const [isTextInputDisabled, setIsTextInputDisabled] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../assets/images/1.jpg")} // 替换为你的图片路径
        style={styles.backgroundImage}
      >
        <View
          style={{
            height: "15%",
            flexDirection: "row",

            width: "63%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="left"
            size={30}
            color="#fff"
            style={{ marginLeft: 10 }}
            onPress={my}
          />
          <Text style={{ color: "#fff", fontSize: 20, marginRight: 10 }}>个人主页</Text>
        </View>
        <View style={{
          flexDirection: "row",

          justifyContent: "center"
        }}>
          <Image source={require("../../assets/images/1.jpg")} style={styles.Image} />
        </View>
        <View style={{
          marginTop: 50,
        }}>

          <TouchableOpacity
            onPress={() => handleTabPress("观看记录")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <Text style={styles.tabText}>昵称</Text>
              <TextInput placeholder="请输入昵称" style={{ width: "75%", marginLeft: 45, color: isTextInputDisabled ? "black" : "gray", }} multiline={true} placeholderTextColor={isTextInputDisabled ? "black" : "gray"} editable={isTextInputDisabled}></TextInput>
            </View>

          </TouchableOpacity>

          {/* 意见反馈选项卡 */}
          <TouchableOpacity
            onPress={() => handleTabPress("意见反馈")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>

              <Text style={styles.tabText}>性别</Text>
              <TextInput placeholder="请输入性别" style={{ width: "75%", marginLeft: 45 }} placeholderTextColor={isTextInputDisabled ? "black" : "gray"} editable={isTextInputDisabled}></TextInput>
            </View>

          </TouchableOpacity>

          {/* 设置选项卡 */}
          <TouchableOpacity
            onPress={() => handleTabPress("设置")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>

              <Text style={styles.tabText}>年龄</Text>
              <TextInput placeholder="请输入年龄" style={{ width: "75%", marginLeft: 45 }} placeholderTextColor={isTextInputDisabled ? "black" : "gray"} editable={isTextInputDisabled}></TextInput>
            </View>

          </TouchableOpacity>

          {/* 深夜模式选项卡（可选，根据您的需求添加） */}
          <TouchableOpacity
            onPress={() => handleTabPress("深夜模式")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>

              <Text style={styles.tabText}>手机号</Text>
              <TextInput placeholder="请输入手机号" style={{ width: "80%", marginLeft: 30 }} placeholderTextColor={isTextInputDisabled ? "black" : "gray"} editable={isTextInputDisabled}></TextInput>
            </View>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress("观看记录")}
            style={styles.tab}
          >
            <View style={{ alignItems: "center", flexDirection: "row", }}>
              <Text style={styles.tabText}>签名</Text>

              <TextInput placeholder="请输入签名" style={{ width: "75%", marginLeft: 45 }} placeholderTextColor={isTextInputDisabled ? "black" : "gray"} editable={isTextInputDisabled}></TextInput>

            </View>

          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ width: "60%", height: 50, textAlign: "center", lineHeight: 50, fontSize: 16, borderRadius: 5, backgroundColor: "#FBD153" }}
              onPress={() => { setIsTextInputDisabled(!isTextInputDisabled) }}
            >{isTextInputDisabled ? "保存" : "修改"}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "20%",
    flex: 1,
    resizeMode: "cover",
  },
  Image: {
    marginLeft: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  tab: {
    padding: 10,
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabText: {
    marginLeft: 5,
    fontSize: 16,
    color: "black"
  },
});
