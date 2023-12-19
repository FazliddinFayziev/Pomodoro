import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import React from 'react'

export default function Success({ bg, setNav, setSuccess }) {

    const handleHome = () => {
        setNav(true)
        setSuccess(false)
    }
    
    return (
      <View style={[styles.container, {backgroundColor: bg}]}>
          <ConfettiCannon
              count={200}
              origin={{x: -10, y: 0}}
              explosionSpeed={200}
          />
          <Text style={styles.text}>One step closer to success!</Text>
          <TouchableOpacity
              style={styles.button}
              onPress={handleHome}
          >
              <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, 
    text: {
        fontFamily: 'serif',
        fontWeight: '700',
        color: '#FFFF',
        fontSize: 20,
    },
    button: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: "serif"
    },
})