import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, Animated, Easing, TouchableOpacity, View, FlatList } from 'react-native';

export default function Sidebar({ bg, setBg, isOpen, setIsSidebarOpen }) {
  const [animation] = useState(new Animated.Value(isOpen ? 0 : 1));

  // Color change logic

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('bg-color', value);
      setBg(value)
    } catch (err) {
      console.log("Something went wrong!")
    }
  };

  const toggleSidebar = () => {
    const toValue = isOpen ? 1 : 0;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  toggleSidebar();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
          backgroundColor: bg,
        },
      ]}
    >
        <View style={styles.close_button}>
            <TouchableOpacity style={styles.close_container} onPress={() => {setIsSidebarOpen(false)}}>
                <Ionicons name='arrow-back' size={40} color="#FFFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.main_container}>
          <Text style={styles.color_text}>COLOR THEMES</Text>
          <BlurView blurType="light" blurAmount={20} style={styles.colors_container}>
            <FlatList
              data={itemData}
              numColumns={5}
              renderItem={({ item }) => <Item bg={bg} color={item.color} storeData={storeData} />}
              keyExtractor={(item) => item.id.toString()}
            />
          </BlurView>
        </View>
    </Animated.View>
  );
}

const Item = ({ bg, color, storeData}) => {
  return (
    <TouchableOpacity onPress={() => storeData(color)}>
      <View style={[styles.single_color, {backgroundColor: color}]}>
        {(color === bg) && (
          <Ionicons name='checkbox' size={30} color="#FFFF" />
        )}
      </View>
    </TouchableOpacity>
  )
};

const itemData = [
  {id: 0, color: '#FF5452'},
  {id: 1, color: '#BAD8A2'},
  {id: 2, color: '#7EBDC2'},
  {id: 3, color: '#7D8CC5'},
  {id: 4, color: '#4F3960'},
  {id: 5, color: '#7DCD84'},
  {id: 6, color: '#8FA4A7'},
  {id: 7, color: '#9EC4B5'},
  {id: 8, color: '#6DC2A3'},
  {id: 9, color: '#385C76'},
  {id: 'a', color: '#18BEBC'},
  {id: 'b', color: '#68A691'},
  {id: 'c', color: '#F87666'},
  {id: 'd', color: '#FF6F5A'},
  {id: 'e', color: '#D7A954'},
  {id: 'f', color: '#8D714C'},
  {id: 'f0', color: '#A0D2DB'},
  {id: 'f1', color: '#4A4B4F'},
  {id: 'f2', color: '#35CE8D'},
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%', 
  },
  close_container: {
    width: 50, 
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 20, 
  },
  close_button: {
    flex: 0.5,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignContent: "center",
  },
  main_container: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  colors_container: {
    width: 350,
    height: 300,
    paddingTop: 25,
    overflow: 'hidden',
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  color_text: {
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#FFFF',
    margin: 20,
  },
  single_color: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 5,
    margin: 6,
  }
});
