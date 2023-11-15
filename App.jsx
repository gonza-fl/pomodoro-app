import { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'LONG');
  const [sprint, setSprint] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }
    if (time === 0) {
      setIsActive(false);
      playSound('alarm');
      if (sprint <= 1) {
        setCurrentTime(1);
        setSprint(sprint + 1);
      } else {
        setCurrentTime(2);
        setSprint(0);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    setTime(currentTime === 0 ? 25 * 60 : currentTime === 1 ? 5 * 60 : 15 * 60);
  }, [currentTime]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound(soundType) {
    let soundPath = '';
    if (soundType === 'alarm') {
      soundPath = require(`./assets/alarm.mp3`);
    } else {
      soundPath = require(`./assets/click.mp3`);
    }
    const { sound } = await Audio.Sound.createAsync(soundPath);
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          paddingTop: Platform.OS === 'android' && 30,
        }}
      >
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity
          onPress={() => handleStartStop()}
          style={styles.boton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  boton: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
