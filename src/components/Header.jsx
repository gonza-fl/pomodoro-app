import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['Pomodoro', 'Short Break', 'Long Break'];

function Header({ currentTime, setCurrentTime, setTime }) {
  function handlePress(i) {
    const newTime = i === 0 ? 25 : i === 1 ? 5 : 15;
    setCurrentTime(i);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.container}>
      {options.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={(_) => handlePress(i)}
          style={[
            styles.itemStyle,
            currentTime !== i && { borderColor: 'transparent' },
          ]}
        >
          <Text style={{ fontWeight: 'bold' }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
  },
});
