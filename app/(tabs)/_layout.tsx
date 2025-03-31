import React, { useEffect, useState, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, usePathname } from 'expo-router';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
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
  const pathname = usePathname();
  const [lastValidTab, setLastValidTab] = useState(0); // 默认为首页

  // 创建动画
  const [animatedVfalue] = useState(new Animated.Value(0));

  // TabBar 宽度为屏幕宽度的 70%
  const tabBarWidth = windowWidth * 0.5;
  const tabWidth = tabBarWidth / 2 - 10;

  // 添加指示器的设置
  const indicatorWidth = 35; // 指定固定宽度，可以根据需要调整

  // 计算每个标签的中心位置
  const tab1Center = tabWidth / 2;
  const tab2Center = tabWidth + tabWidth / 2;

  // 监听路径变化并且执行动画
  useEffect(() => {
    // console.log(pathname);

    // 判断当前路径是否为有效的标签页路径
    const isValidTabPath = pathname === '/' || pathname === '/two';

    let toValue;

    if (isValidTabPath) {
      // 是有效的标签页路径，更新lastValidTab
      if (pathname === '/two') {
        toValue = 1;
        setLastValidTab(1);
      } else {
        toValue = 0;
        setLastValidTab(0);
      }

      // 执行指示器动画
      Animated.spring(animatedVfalue, {
        toValue,
        useNativeDriver: true,
        friction: 5,
        tension: 50,
      }).start();
    }
    // 如果不是有效的标签页路径，不执行动画，保持指示器在上一个位置

  }, [pathname]);

  // 计算指示器动画样式 - 在两个标签中心点之间移动
  const indicatorPosition = animatedVfalue.interpolate({
    // 0代表第一个标签，1代表第二个标签
    inputRange: [0, 1],
    outputRange: [tab1Center - indicatorWidth / 2, tab2Center - indicatorWidth / 6],
  });

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
            }} >
              {/* 添加动画指示器 */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: indicatorWidth,
                  height: 5,
                  left: 5,
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  bottom: 8, // 调整到合适的位置
                  borderRadius: 3,
                  // 设置指示器的初始位置
                  transform: [{ translateX: indicatorPosition }],
                }}
              />
            </View>

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