import { Tabs } from "expo-router";
import React from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; // 图标引入
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#cc8800',
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" }, // 设置背景颜色
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Publish"
        options={{
          title: "发布",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="plussquareo" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="My"
        options={{
          title: "我的",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
