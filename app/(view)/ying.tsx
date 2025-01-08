import React from 'react';
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

export default function App() {
  return (
    <View style={styles.container}>
        <ScrollView>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true} // 启用自动播放
        autoplayTimeout={3} // 每3秒切换一次
        showsPagination={false} // 隐藏分页指示器
      >
        <View style={styles.slide}>
          <Image source={require('../img/564931.jpg')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../img/shi.png')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../img/shi2.png')} style={styles.image} />
        </View>
      </Swiper>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  wrapper: {
    height: 300, // 轮播图的高度
    marginBottom:-100
  },
  slide: {
    flex: 1,
    justifyContent: 'center',       
    alignItems: 'center',
  },
  image: {
    width: 380,
    height: 250,
    resizeMode: 'cover', // 根据需要调整图片显示方式
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
