import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar({nav, setIsSidebarOpen}) {
  return (
    <View style={styles.container}>
      {nav && (
        <TouchableOpacity onPress={() => {setIsSidebarOpen(true)}}>
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 30,
    paddingRight: 30,
    alignItems: "flex-end",
    height: 30,
  }
})