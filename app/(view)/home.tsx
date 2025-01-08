import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Shi from "./shi";
import NetInfo from "@react-native-community/netinfo";
import Ying from "./ying";
import { Video, ResizeMode } from "expo-av";
import axios from "axios";
import hls from "hls.js";
const Home = () => {
  const categories = [
    { id: 1, name: "关注" },
    { id: 2, name: "推荐" },
    { id: 3, name: "小视频" },
    { id: 4, name: "影视" },
    { id: 5, name: "综艺" },
    { id: 6, name: "生活" },
    { id: 7, name: "娱乐" },
    { id: 8, name: "健康" },
    { id: 9, name: "读书" },
  ];
  const users = [
    {
      id: 1,
      name: "崔朋欣",
      text: "你好你好",
      img: require("../img/564931.jpg"),
      fen: 222,
      shi: require("../img/sui.mp4"),
      lei: "小视频",
      tui: 0,
      guan: 0,
      gong: 0,
      zan: 213,
      ping: 12,
    },
    {
      id: 2,
      name: "李鹏翔",
      text: "你好你好",
      img: require("../img/564931.jpg"),
      fen: 222,
      shi: require("../img/mao.mp4"),
      lei: "小视频",
      tui: 1,
      guan: 0,
      gong: 0,
      zan: 213,
      ping: 12,
    },
    {
      id: 3,
      name: "李鹏翔",
      text: "你好你好",
      img: require("../img/564931.jpg"),
      fen: 222,
      shi: require("../img/mao.mp4"),
      lei: "小视频",
      tui: 0,
      guan: 1,
      gong: 0,
      zan: 213,
      ping: 12,
    },
    {
      id: 4,
      name: "李鹏翔",
      text: "你好你好",
      img: require("../img/564931.jpg"),
      fen: 222,
      shi: require("../img/sui.mp4"),
      lei: "影视",
      tui: 1,
      guan: 0,
      gong: 0,
      zan: 213,
      ping: 12,
    },
    {
      id: 5,
      name: "李鹏翔",
      text: "你好你好",
      img: require("../img/564931.jpg"),
      fen: 222,
      shi: require("../img/lake.mp4"),
      lei: "影视",
      tui: 1,
      guan: 0,
      gong: 0,
      zan: 213,
      ping: 12,
    },
  ];
  const [selectedId, setSelectedId] = useState("推荐");
  const [Date, useDate] = useState([]);
  const [tui, useTui] = useState(0);
  const handleCategoryPress = (id: any) => {
    setSelectedId(id);
    if (id == "推荐") {
      const list = users.filter((item) => item.tui == 1);
      getDate(list);
    } else if (id == "关注") {
      const list = users.filter((item) => item.guan == 1);
      getDate(list);
    } else {
      getDate([]);
    }
  };
  const onto = (id: any) => {
    router.push({
      pathname: "/(view)/xiang",
      params: { id: id },
    });
  };
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const localPath =
    "C:/Users/86156/Desktop/react-native-haokan/rn_p/upload/scolie/scolie.m3u8";
  const urlPath = `file://${localPath.replace(/\\/g, "/")}`;
  console.log(urlPath);

  const renderItem = ({ item }) => {
    return (
      <View style={Inputstyles.boxs}>
        <Video
          style={Inputstyles.shi}
          ref={videoRef}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={setStatus}
          source={item.shi} // 使用 uri 作为视频源
          onError={(error) => console.error("Video Error:", error)} // 错误处理
        />
        <Text
          onPress={() => {
            onto(item.id);
          }}
          style={Inputstyles.text2}
        >
          {item.text}
        </Text>
        <View style={Inputstyles.box2}>
          <View style={Inputstyles.box1}>
            <Image style={Inputstyles.img} source={item.img} />
            <Text>{item.name}</Text>
          </View>
          <View style={Inputstyles.box1}>
            <Image style={Inputstyles.img1} source={item.img} />
            <Text>{item.fen}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderItems = ({ item }) => (
    <Text
      key={item.id}
      onPress={() => handleCategoryPress(item.name)}
      style={item.name === selectedId ? Inputstyles.text : Inputstyles.text1}
    >
      {item.name}
    </Text>
  );
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // 模拟数据请求
    setTimeout(() => {
      // 这里可以重新获取数据，更新状态
      setRefreshing(false);
    }, 2000); // 2秒后停止刷新
  };
  const getDate = (list: any) => {
    useDate(list);
  };
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    console.log("网络状态", state.details?.linkSpeed);
  });
  useEffect(() => {
    getDate(users);
    unsubscribe();
  }, []);
  const getlist = () => {
    axios.get("http://192.168.75.53:3000/video").then((res) => {
      console.log(res.data.url);
    });
  };
  return (
    <SafeAreaView>
      <View style={Inputstyles.container}>
        {/* <Button title='获取数据' onPress={()=>{getlist()}}></Button> */}
        <View style={Inputstyles.box}>
          <FlatList
            data={categories}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            overScrollMode="always" // 可选，通常不需要
          />
        </View>
        {(selectedId === "关注" || selectedId === "推荐") && (
          <FlatList
            data={Date} // 确保 data 变量已正确声明
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // 确保 id 是字符串
            contentContainerStyle={{ flexGrow: 1 }}
            scrollsToTop={true}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
        {selectedId === "小视频" && <Shi />}
        {selectedId === "影视" && <Ying />}
      </View>
    </SafeAreaView>
  );
};
const Inputstyles = StyleSheet.create({
  h1: {
    fontSize: 30,
  },
  text2: {
    fontSize: 20,
    marginBottom: 10,
  },
  box: {
    width: 390,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  boxs: {
    width: "85%",
    // height:350,
    marginLeft: "7%",
    marginBottom: 20,
  },
  boxs1: {
    width: "100%",
  },
  container: {
    width: "100%",
    height: 700,
  },
  box1: {
    flexDirection: "row",
    alignItems: "center",
  },
  box2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    color: "red",
    marginLeft: 10,
    marginRight: 10,
  },
  text1: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  img1: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  shi: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});
export default Home;
