import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Count({ timeInSeconds }) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>POMODORO</Text>
      <Text style={styles.text}>{`${minutes.toString().padStart(2, '0')} : ${seconds
        .toString()
        .padStart(2, '0')}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#FFFF',
    marginTop: 10,
    fontSize: 12,
  },
});