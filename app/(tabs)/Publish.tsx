import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { useTheme } from "../style/ThenmeContext";
import ModalComponent from "../../common/Modal"; // 导入封装后的组件
axios.defaults.baseURL = "http://172.20.10.5:3000/";

const Publish = () => {
  const { theme, toggleTheme } = useTheme();
  // 状态管理
  const [image, setImage] = useState<string | null>(null);
  const [imageflag, setImageflag] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [isPublic, setIsPublic] = useState(true);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageflag(true);
      setImage(result.assets[0].uri);
      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].uri.split("/").pop(), // 文件名
      });
      console.log(formData._parts[0][1], "123");
      let zt = await axios.post("upload", formData._parts[0][1]);
      console.log(zt, "data");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [codeisvisible, setcodeisvisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // setisupordown(!isupordown);
  };
  let [isupordown, setisupordown] = useState(false);
  let [codeisupdown, setcodeisupdown] = useState(false);

  const codetoggleModal = () => {
    setcodeisvisible(!codeisvisible);
    // setcodeisupdown(!codeisupdown);
  };
  // 分类中的数据
  const [classify, setclassify] = useState([
    { id: 3, name: "小视频" },
    { id: 4, name: "影视" },
    { id: 5, name: "综艺" },
    { id: 6, name: "生活" },
    { id: 7, name: "娱乐" },
    { id: 8, name: "健康" },
    { id: 9, name: "读书" },
  ]);

  // 和集中的数据
  const [collection, setcollection] = useState([
    {
      id: 1,
      name: "潮流合集",
      img: "https://img2.baidu.com/it/u=4240213996,1202552444&fm=253&fmt=auto&app=120&f=JPEG?w=502&h=500",
    },
    {
      id: 2,
      name: "fashion合集",
      img: "http://img2.baidu.com/it/u=2880601624,15471360&fm=253&app=138&f=JPEG?w=800&h=1200",
    },
    {
      id: 3,
      name: "超酷合集",
      img: "https://img0.baidu.com/it/u=655424701,1608984133&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200",
    },
  ]);

  const [selectidx, setselectidx] = useState(0);
  const [activecate, setactivecate] = useState();
  const Selection = (index: number) => {
    console.log(index, "index");
    setcodeisvisible(!codeisvisible);
    // setcodeisupdown(!codeisupdown);
    setselectidx(index);
  };

  const fb = () => {
    setVideoTitle("");
    setselectidx(0);
    setImage("");
    setImageflag(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.uploadVideo}>
              <View style={styles.videoLeft}>
                <TouchableOpacity onPress={pickImage}>
                  {imageflag ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <Text style={styles.containerText}>点击上传</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.videoRight}>
                <Text style={styles.videoTitle}>视频名称</Text>
                <TextInput
                  style={styles.input}
                  placeholder="在此输入视频标题"
                  value={videoTitle}
                  onChangeText={setVideoTitle}
                  multiline
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={codetoggleModal}
            >
              <Text style={styles.categoryButtonText}>分类</Text>
              {codeisupdown ? (
                <AntDesign name="down" size={24} color="black" />
              ) : (
                <AntDesign name="right" size={24} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.collectionButton}
              onPress={toggleModal}
            >
              <Text style={styles.collectionButtonText}>添加到合集</Text>
              {isupordown ? (
                <AntDesign name="down" size={24} color="black" />
              ) : (
                <AntDesign name="right" size={24} color="black" />
              )}
            </TouchableOpacity>
            <View style={styles.privacyContainer}>
              <Text style={styles.privacyText}>所有人可见</Text>
              <Switch
                value={isPublic}
                onValueChange={setIsPublic}
                thumbColor="#ffffff"
                trackColor={{ false: "#767577", true: "#fbd153" }}
              />
            </View>
            <TouchableOpacity style={styles.publishBox} onPress={fb}>
              <Text style={styles.publishText}>发布视频</Text>
            </TouchableOpacity>

            <ModalComponent
              visible={isModalVisible}
              onClose={toggleModal}
              title="合集"
            >
              <View style={styles.itemtitle}>
                {collection.map((item) => {
                  return (
                    <View style={styles.item} key={item.id}>
                      <Image
                        style={styles.images}
                        source={{
                          uri: item.img,
                        }}
                      ></Image>
                      <Text>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            </ModalComponent>
            {/* 分类弹出层 */}
            <ModalComponent
              visible={codeisvisible}
              onClose={codetoggleModal}
              title="分类"
            >
              <View style={styles.writBox}>
                {classify.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={
                        index === selectidx ? styles.active : styles.textitem
                      }
                      onPress={() => {
                        Selection(index);
                      }}
                      key={item.id}
                    >
                      <Text style={styles.writing}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ModalComponent>
            {isModalVisible ? <View style={styles.bigmain}></View> : ""}
            {codeisvisible ? <View style={styles.bigmain}></View> : ""}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  writBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  writing: {
    padding: 15,
    fontSize: 16,
  },
  active: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#FBD153",
    color: "#fff",
    borderRadius: 15,
    marginTop: 15,
  },
  textitem: {
    width: "30%",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 15,
  },
  bigmain: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(128, 128, 128, 0.3)",
  },
  itemtitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
  },
  item: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  images: {
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  uploadVideo: {
    flexDirection: "row",
    height: 250,
  },
  videoLeft: {
    width: "40%",
    height: "80%",
    backgroundColor: "pink",
  },
  videoRight: {
    width: "60%",
    height: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  containerText: {
    textAlign: "center",
    lineHeight: 200,
    fontSize: 20,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    height: 250,
    borderColor: "gray",
    marginTop: 10,
    padding: 10,
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  categoryButtonText: {
    fontSize: 16,
  },
  collectionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  collectionButtonText: {
    fontSize: 16,
  },
  privacyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  privacyText: {
    padding: 10,
    fontSize: 16,
  },
  publishBox: {
    alignItems: "center",
    marginTop: 85,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "#FBD153",
    borderRadius: 20,
  },
  publishText: {
    padding: 18,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Publish;
