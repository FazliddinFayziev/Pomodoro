import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export default function TimerContainer({ setChange, setRemainingTimeState, bg, step, value, timerDuration, pause, handlePause }) {
  return (
    <View>
      <ImageBackground
        source={require('../app/assets/circle.png')}
        style={styles.main_container}
      >
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.8} onPress={handlePause}>
            <View style={[styles.innerColor, {backgroundColor: bg}]}>
              <CountdownCircleTimer
                key={value}
                isPlaying={pause}
                size={260}
                duration={timerDuration}
                colors={['#FFFF']}
                trailColor={bg}
                onUpdate={(remainingTime) => {
                  setRemainingTimeState(remainingTime);
                }}
                onComplete={() => {
                  setChange((prev) => prev + 1);
                }}
              >
                {({ remainingTime }) => (
                  <View style={styles.pause}>
                    <Ionicons name={pause ? 'pause' : 'play'} size={80} color="#FFFF" />
                  </View>
                )}
              </CountdownCircleTimer>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.padination_container}>
        {[1, 2, 3, 4, 5, 6, 7].map((val) => {
          return (
            <View key={val} style={[styles.padination, {backgroundColor: val <= step ? '#ffff' : '#dddd'}]} />
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    width: 390,
    height: 390,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerColor: {
    width: 270,
    height: 270,
    borderRadius: 140,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pause: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padination_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  padination: {
    width: 5,
    height: 5,
    margin: 10,
    borderRadius: 140,
  }
});