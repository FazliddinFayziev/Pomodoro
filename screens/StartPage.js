import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Local imports

import Count from '../components/Count';
import Timer from '../components/Timer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Success from '../components/Success';


export default function StartPage() {

  const time = 25
  const short = 5
  const long = 10
  const [bg, setBg] = useState('');
  const [key, setKey] = useState(0);
  const [step, setStep] = useState(0);
  const [sound, setSound] = useState();
  const [nav, setNav] = useState(true);
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [current, setCurrent] = useState(time);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Good luck')
  const [timerDuration, setTimerDuration] = useState(time);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timerDuration);


  // BgColor and AsyncStorage (LocalStorage)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('bg-color');
      if (value !== null) {
        setBg(value)
      } else {
        setBg('#FF5452')
      }
    } catch (err) {
      setBg('#FF5452')
    }
  };

  useEffect(() => {
    getData()
  }, [])

  // Timer

  useEffect(() => {
    let interval;

    if (pause && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 950);
    } else if (remainingTime === 0) {
      setStep(step + 1)
      playSound()

      if (step === 6) {
        setStep(0)
        setStart(true)
        setPause(false)
        setSuccess(true)
        setMessage('DONE')
        setTimerDuration(time)
        setRemainingTime(time)
        setKey(prevKey => prevKey + 1)
      } else if (step === 4) {
        setCurrent(long)
        setRemainingTime(long)
        setTimerDuration(long)
        setKey(prevKey => prevKey + 1)
        setMessage('Time to long break')
      } else if (step % 2 !== 0) {
        setCurrent(time)
        setRemainingTime(time)
        setTimerDuration(time)
        setMessage('Time to work')
        setKey(prevKey => prevKey + 1)
      } else {
        setCurrent(short)
        setRemainingTime(short)
        setTimerDuration(short)
        setKey(prevKey => prevKey + 1)
        setMessage('Time to short break')
      }
    }

    return () => clearInterval(interval);
  }, [pause, remainingTime, step]);

  // Timer Logic

  const handlePause = () => {
    setStart(false)
    setNav(!nav)
    setPause((prevPause) => !prevPause);
  };

  const handleStart = () => {
    setNav(false)
    setStart(false)
    setPause((prevPause) => !prevPause);
    setMessage('Time to work')
  }

  const handleStartOver = () => {
    setNav(true)
    setStart(true)
    setRemainingTime(current)
    setTimerDuration(current)
    setKey(prevKey => prevKey + 1)
  };

  // Play sound Logic

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../app/assets/sound.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {!success ? (
        <>
          <Navbar nav={nav} setIsSidebarOpen={setIsSidebarOpen} />
          {isSidebarOpen && <Sidebar bg={bg} setBg={setBg} isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
          <View style={styles.timeContainer}>
            <Timer bg={bg} step={step} value={key} timerDuration={timerDuration} pause={pause} handlePause={handlePause} />
            <Text style={styles.text}>{message}</Text>
          </View>
          <View style={styles.changeContainer}>
            <Count timeInSeconds={remainingTime} />
            {(!pause && !start) && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleStartOver}
              >
                <Text style={styles.buttonText}>Start Over</Text>
              </TouchableOpacity>
            )}
            {start && (
              <TouchableOpacity
                style={styles.button}
                onPress={handleStart}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <>
          <Success bg={bg} setNav={setNav} success={success} setSuccess={setSuccess} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  text: {
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#FFFF',
    marginTop: 20,
  },
  button: {
    flex: 1,
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
    fontFamily: "serif"
  },
});