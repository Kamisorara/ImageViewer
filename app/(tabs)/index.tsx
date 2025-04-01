import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
type FileType = 'folder' | 'file' | 'image';

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  path?: string;
  uri?: string;
}

interface FileSystem {
  [path: string]: FileItem[];
}

// 模拟文件夹数据
const sampleData: FileSystem = {
  'root': [
    { id: '1', name: '文档', type: 'folder', path: 'root/1' },
    { id: '2', name: '图片', type: 'folder', path: 'root/2' },
    { id: '3', name: 'profile.jpg', type: 'image', uri: 'https://picsum.photos/200' },
  ],
  'root/1': [
    { id: '4', name: '工作', type: 'folder', path: 'root/1/4' },
    { id: '5', name: 'resume.pdf', type: 'file' },
  ],
  'root/2': [
    { id: '6', name: '假期', type: 'folder', path: 'root/2/6' },
    { id: '7', name: 'beach.jpg', type: 'image', uri: 'https://picsum.photos/200/300' },
    { id: '8', name: 'mountains.jpg', type: 'image', uri: 'https://picsum.photos/300/200' },
  ],
  // 可以添加更多嵌套数据
};
export default function TabOneScreen() {
  const navigation = useNavigation<any>();
  const params = useLocalSearchParams<{ path: string }>();
  const currentPath = params.path || 'root';
  // 获取当前路径下的文件和文件夹
  const currentItems = sampleData[currentPath] || [];

  // 处理点击事件
  const handleItemPress = (item: FileItem) => {
    if (item.type === 'folder') {
      navigation.navigate('index', { path: item.path });
    } else if (item.type === 'image') {
      console.log('查看图片:', item.uri);
    }
  }

  // 返回上一级目录
  const navigateToParent = (): void => {
    if (currentPath === 'root') return;

    const pathSegments = currentPath.split('/');
    pathSegments.pop();
    const parentPath = pathSegments.join('/') || 'root';
    navigation.navigate('index', { path: parentPath });
  };

  // 渲染单个文件/文件夹项目
  const renderItem = ({ item }: { item: FileItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.itemIconContainer}>
        {item.type === 'folder' ? (
          <Ionicons name="folder" size={24} color="#FFD700" />
        ) : item.type === 'image' && item.uri ? (
          <Image
            source={{ uri: item.uri }}
            style={styles.thumbnail}
          />
        ) : (
          <Ionicons name="document" size={24} color="#A9A9A9" />
        )}
      </View>
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>File Systm</Text>
        {currentPath != 'root' && (
          <TouchableOpacity onPress={navigateToParent} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.pathContainer}>
        <Text style={styles.pathText}>{currentPath.replace(/\//g, ' > ')}</Text>
      </View>

      <FlatList
        data={currentItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No items found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#007AFF',
    marginLeft: 5,
  },
  pathContainer: {
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  pathText: {
    color: '#555',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  itemName: {
    marginLeft: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});