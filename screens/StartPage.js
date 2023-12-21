// Global Imports

import { Audio } from 'expo-av';
import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Local Imports

import Count from '../components/Count';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Success from '../components/Success';
import TimerContainer from '../components/TimerContainer';

export default function StartPage() {

  // Low necessity

  const [bg, setBg] = useState('');
  const [key, setKey] = useState(0);
  const [step, setStep] = useState(1);
  const [nav, setNav] = useState(true);
  const [sound, setSound] = useState();
  const [change, setChange] = useState(0);
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('Good luck');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // High necessity

  const time = 1500
  const short = 300
  const long = 600

  const [current, setCurrent] = useState(time);
  const [timerDuration, setTimerDuration] = useState(time);
  const [remainingTimeState, setRemainingTimeState] = useState(25);

  // Background Color LocalStorage

  useEffect(() => {
    const getData = async () => {
      try { const value = await AsyncStorage.getItem('bg-color');
        if (value !== null) { setBg(value) } 
        else { setBg('#FF5452') }
      } catch (err) { setBg('#FF5452') }
    };
    getData()
  }, [])

  // Timer Logic

  useEffect(() => {
    const newStep = step + 1;
    if(change) {
      setStep(newStep);
      playSound();
    }

    if (newStep < 9 && remainingTimeState === 0) {
      if (newStep === 8) {
        setStep(1);
        setStart(true);
        setPause(false);
        setCurrent(time);
        setSuccess(true);
        setMessage('Good luck');
        setTimerDuration(time);
        setKey((prevKey) => prevKey + 1);
      } else if (newStep === 6) {
        setCurrent(long);
        setTimerDuration(long);
        setKey((prevKey) => prevKey + 1);
        setMessage('Time for a long break');
      } else if (newStep % 2 !== 0) {
        setCurrent(time);
        setTimerDuration(time);
        setMessage('Time to work');
        setKey((prevKey) => prevKey + 1);
      } else if ((newStep % 2 === 0) && (newStep < 7)){
        setCurrent(short);
        setTimerDuration(short);
        setKey((prevKey) => prevKey + 1);
        setMessage('Time for a short break');
      } else {
        setStep(1);
        setChange(0);
        setCurrent(time);
        setTimerDuration(time);
      }
    }
  }, [change])

  // Timer Pause

  const handlePause = () => {
    setNav(!nav);
    setStart(false);
    setPause(!pause);
  };

  // Timer Start

  const handleStart = () => {
    setNav(false);
    setStart(false);
    setPause(!pause);
    setMessage('Time to work');
  }

  // Timer Reset

  const handleStartOver = () => {
    setNav(true);
    setStart(true);
    setTimerDuration(current);
    setKey(prevKey => prevKey + 1);
  };

  // Play Sound

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

          {/* Navbar */}

          <Navbar nav={nav} setIsSidebarOpen={setIsSidebarOpen} />

          {/* SideBar */}

          {isSidebarOpen && <Sidebar bg={bg} setBg={setBg} isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

          <View style={styles.timeContainer}>

            {/* TimeContainer */}

            <TimerContainer setChange={setChange} setRemainingTimeState={setRemainingTimeState} bg={bg} step={step} value={key} timerDuration={timerDuration} pause={pause} handlePause={handlePause} />
            <Text style={styles.text}>{message}</Text>

          </View>

          <View style={styles.changeContainer}>

            {/* Count */}

            <Count remainingTimeState={remainingTimeState} />

            {/* Buttons */}

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
          {/* Success */}
          
          <Success bg={bg} setNav={setNav} setSuccess={setSuccess} />
        </>
      )}
    </View>
  );
}

// Styles

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