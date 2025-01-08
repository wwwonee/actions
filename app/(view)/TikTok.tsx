import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, TouchableOpacity, PanResponder, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from '@expo/vector-icons/AntDesign'
const { width, height } = Dimensions.get('window');
import { useRoute, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import { http } from '../../services/http';

export default function TikTok() {
    const navigation = useNavigation();
    // 接收路由参数
    const route = useRoute();
    const { params } = route;
    // 视频类型
    const { type } = params;
    const [videoList, setVideoList] = useState([]);
    const getVideo = () => {
        // 获取视频列表
        http('GET', '/getvideo')
            .then(res => {
                console.log(res.data);
                setVideoList(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        // 获取视频列表
        getVideo()
    }, [type])

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true); // 默认自动播放

    const togglePlayback = async () => {
        if (isPlaying) {
            await videoRef.current.pauseAsync();
        } else {
            await videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const back = () => {
        // 返回上一页
        navigation.goBack();
    }

    const [moveX, setMoveX] = useState(0); // 水平滑动的距离
    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return true; // 只要开始滑动就触发响应
        },
        onPanResponderMove: (evt, gestureState) => {
            // 打印上下左右移动距离
            console.log(gestureState.dx, gestureState.dy); 
            +
            setMoveX(gestureState.dx); // 获取水平方向的滑动距离
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (moveX < -15) {
                goAuthor()
            }
            console.log(moveX);
        },
    });

    const goAuthor = () => {
        navigation.navigate('(view)/author')
    }


    const renderItem = ({ item }) => {
        return (
            <View style={styles.item} {...panResponder.panHandlers} >
                <AntDesign onPress={back} style={{ position: 'absolute', top: 10, left: 10, zIndex: 99 }} name="left" size={30} color="white" />
                <TouchableOpacity style={styles.videoContainer} onPress={togglePlayback}>
                    <Video
                        ref={videoRef}
                        source={{
                            uri: item.url
                        }} // 替换为你的视频 URL
                        style={styles.video}
                        resizeMode="contain" // 填满盒子
                        isLooping // 循环播放
                        shouldPlay={isPlaying} // 自动播放
                    />
                </TouchableOpacity>
                {!isPlaying ? <TouchableOpacity style={styles.stop} onPress={togglePlayback}></TouchableOpacity> : null}
                <View style={styles.info}>
                    <TouchableOpacity onPress={goAuthor}>
                        <Image source={{ uri: item.authorId.avatar }} style={styles.avatar} />
                    </TouchableOpacity>
                    <Image source={require('../img/nolike.png')} style={{ width: 40, height: 40, marginTop: 20 }}></Image>
                    <Text style={styles.zan}>{item.likes}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">{item.authorId.username}</Text>
                    <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                    <Text style={styles.uploadTime}>发布时间：{item.uploadTime}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <FlatList
                style={styles.box}
                data={videoList}
                renderItem={renderItem}
                keyExtractor={(item) => item._id.toString()} // 为每个项目提供唯一的 key
                showsVerticalScrollIndicator={false} // 隐藏垂直滚动条
                pagingEnabled // 启用分页滑动
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    box: {
        flex: 1,
    },
    item: {
        width: width,
        height: height - 81, // 这里的 40 是一个示例，可以根据实际需要调整
        backgroundColor: '#000',
        zIndex: 1,
    },
    videoContainer: {
        width: width,
        height: height - 90,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#aaa',
        borderBottomWidth: 0.5,       // 设置底部边框的宽度
        borderLeftWidth: 0,         // 隐藏左边框
        borderTopWidth: 0,          // 隐藏上边框
        borderRightWidth: 0,        // 隐藏右边框
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    fullScreenVideo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    video: {
        width: '100%',
        height: '100%'
    },
    stop: {
        width: 0,
        height: 0,
        borderLeftWidth: 40,
        borderRightWidth: 40,
        borderBottomWidth: 70,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff', // 三角形颜色
        // 透明度
        opacity: 0.7,
        // 旋转角度
        transform: [{ rotate: '90deg' }],
        position: 'absolute',
        marginLeft: 160,
        marginTop: 350,
    },
    info: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        marginTop: 300
    },
    zan: {
        color: '#fff',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        marginLeft: 20,
        marginBottom: 20,
    },
    author: {
        color: '#fff',
        fontSize: 22,
        marginTop: 10,
        maxWidth: 300,
        overflow: 'hidden',
        // 只显示一行并省略超出的部分
        height: 30, // 设置固定高度以确保只显示一行
        lineHeight: 30, // 行高与高度相同
    },
    description: {
        color: '#fff',
        marginTop: 10,
        maxWidth: 300,
        overflow: 'hidden',
        // 只显示一行并省略超出的部分
        height: 20, // 设置固定高度以确保只显示一行
        lineHeight: 20, // 行高与高度相同
    },
    uploadTime: {
        color: '#666',
        marginTop: 5
    }
});