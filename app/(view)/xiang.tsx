import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native'
import { Video, ResizeMode } from 'expo-av';
import AntDesign from '@expo/vector-icons/AntDesign';
import ModalComponent from "../../common/Modal"; // 导入封装后的组件
import axios from 'axios';
import { useNavigation, router, useLocalSearchParams } from 'expo-router';  // 修正导入名称
export default function xiang() {
    const { id } = useLocalSearchParams();
    const users = [
        {
            id: 1,
            name: '崔朋欣',
            text: '你好你好',
            img: require('../img/564931.jpg'),
            fen: 222,
            shi: require('../img/sui.mp4'),
            lei: '小视频',
            tui: 0,
            guan: 0,
            gong: 0,
            zan: 213,
            ping: 12
        },
        {
            id: 2,
            name: '李鹏翔',
            text: '你好你好',
            img: require('../img/564931.jpg'),
            fen: 222,
            shi: require('../img/mao.mp4'),
            lei: '小视频',
            tui: 1,
            guan: 0,
            gong: 0,
            zan: 213,
            ping: 12
        },
        {
            id: 3,
            name: '李鹏翔',
            text: '你好你好',
            img: require('../img/564931.jpg'),
            fen: 222,
            shi: require('../img/mao.mp4'),
            lei: '小视频',
            tui: 0,
            guan: 1,
            gong: 0,
            zan: 213,
            ping: 12
        },
        {
            id: 4,
            name: '李鹏翔',
            text: '你好你好',
            img: require('../img/564931.jpg'),
            fen: 222,
            shi: require('../img/sui.mp4'),
            lei: '影视',
            tui: 1,
            guan: 0,
            gong: 0,
            zan: 213,
            ping: 12
        },
        {
            id: 5,
            name: '李鹏翔',
            text: '你好你好',
            img: require('../img/564931.jpg'),
            fen: 222,
            shi: require('../img/lake.mp4'),
            lei: '影视',
            tui: 1,
            guan: 0,
            gong: 0,
            zan: 213,
            ping: 12
        },
    ];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };
    const videoRef = useRef(null);
    const user = users.find((user) => user.id === parseInt(id));
    const [refreshing, setRefreshing] = useState(false);
    const [status, setStatus] = useState({});
    const [like, setLike] = useState(true);
    const [collect, setColl] = useState(true);
    const [likes, setLikes] = useState(true);
    const [list, setList] = useState([]);
    const getlist =()=>{
        axios.post('http://192.168.75.53:3000/addcomment',{
            id:id,
            name:name           }).then((res) => {
          console.log(res.data.url)
        })
    }
    return (
        <SafeAreaView>
            <View style={Inputstyles.boxs}>
                <Video
                    style={Inputstyles.shi}
                    ref={videoRef}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={setStatus}
                    source={user.shi} // 确保这个source有效
                />
                <View style={Inputstyles.box2}>
                    <View style={Inputstyles.box1}>
                        <Image style={Inputstyles.img} source={user.img} />
                        <Text>{user.name}</Text>
                    </View>
                    <View style={Inputstyles.box1}>
                        <Text>{user.fen}</Text>
                    </View>
                </View>
                <Text style={Inputstyles.text2}>{user.text}</Text>
                <View style={Inputstyles.like}>
                    <AntDesign color={like ? '#181818' : 'red'} onPress={() => { setLike(!like) }} size={30} name={like ? "hearto" : 'heart'} />
                    <AntDesign color={collect ? '#181818' : '#FFD35A'} onPress={() => { setColl(!collect) }} size={30} name={collect ? "staro" : 'star'} />
                    <AntDesign color='#181818' onPress={() => { toggleModal()}} size={30} name='message1' />
                    <AntDesign color={likes ? '#181818' : 'red'} onPress={() => { setLikes(!likes) }} size={30} name={likes ? "like2" : 'like1'} />
                </View>
            <ModalComponent
              visible={isModalVisible}
              onClose={toggleModal}
              title="评论"
            >
                <View>
                    <Text>123</Text>
                </View>
            </ModalComponent>
            <View>
                <View>
                    <View>
                    <Text>旅行日记(10)</Text>
                    <Text></Text>
                    </View>
                    <View></View>
                </View>
            </View>
            </View>
        </SafeAreaView>
    )
}

const Inputstyles = StyleSheet.create({
    like:{
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    h1: {
        fontSize: 30
    },
    box: {
        width: 390,
        height: 50,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    boxs: {
        width: '85%',
        // height:350,
        marginLeft: '7%',
        marginBottom: 20
    },
    text2: {
        fontSize: 20,
        marginBottom: 10,
    },
    boxs1: {
        width: '100%'
    },
    container: {
        width: '100%',
        height: 700,
    },
    box1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    box2: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    text: {
        fontSize: 20,
        color: 'red',
        marginLeft: 10,
        marginRight: 10
    },
    text1: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    img1: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    shi: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    }
})
