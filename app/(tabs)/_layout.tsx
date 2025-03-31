import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

// 获取屏幕宽度以便进行计算
const windowWidth = Dimensions.get('window').width;

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: 0 }} {...props} />;  // 调整图标大小和位置
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // TabBar 宽度为屏幕宽度的 70%
  const tabBarWidth = windowWidth * 0.55;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            position: 'absolute',
            bottom: insets.bottom + 10,
            left: 0, // 需要重置为0
            right: 0,
            alignItems: 'center',
            backgroundColor: 'transparent', // 设为透明
            height: 70,
            elevation: 0, // 移除默认的阴影
            borderTopWidth: 0, // 移除默认的边框
          },
          // 修改每个 tab 项的样式以减少间距
          tabBarItemStyle: {
            height: 50,
            paddingVertical: 5,
            paddingHorizontal: 10, // 减少水平内边距
            width: tabBarWidth / 2 - 10, // 每个 tab 宽度为 TabBar 宽度的一半减去一点边距
            maxWidth: 100, // 限制最大宽度
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 0,
            marginBottom: 8,
          },
          tabBarIconStyle: {
            marginBottom: 0,
          },
          tabBarBackground: () => (
            <View style={{
              position: 'absolute',
              bottom: 0,
              width: tabBarWidth,
              height: 70,
              backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#ffffff',
              borderRadius: 20,
              alignSelf: 'center',
              ...styles.shadow
            }} />
          ),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: '预览',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: '个人',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});