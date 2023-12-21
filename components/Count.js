import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Count = ({ remainingTimeState }) => {

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const formattedTime = formatTime(remainingTimeState);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>POMODORO</Text>
      <Text style={styles.timerText}>
        {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  titleText: {
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#FFFF',
    fontSize: 12,
  },
  timerText: {
    fontSize: 20,
    color: '#FFFF',
    fontFamily: 'serif',
    marginTop: 10,
  },
});

export default Count;
