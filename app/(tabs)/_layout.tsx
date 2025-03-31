import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom, // 底部安全区域
          left: 20,
          right: 20,
          backgroundColor: colorScheme === 'dark' ? '#1c1c1c' : '#ffffff',
          borderRadius: 20,
          height: 70,
          paddingBottom: 10,
          ...styles.shadow,
        },
        tabBarItemStyle: {
          height: 50,
          paddingVertical: 5,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 0,  // 调整文字顶部边距
          marginBottom: 8,  // 调整文字底部边距，增加可见性
        },
        tabBarIconStyle: {
          marginBottom: 0,  // 调整图标底部边距
        },
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