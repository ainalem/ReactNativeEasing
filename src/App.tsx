import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Card from './Card';

export type Mode =
  | 'emphasized'
  | 'normal'
  | 'linear'
  | 'emphasizedSlow'
  | 'normalSlow'
  | 'linearSlow'
  | undefined;

function App(): React.JSX.Element {
  const [mode, setMode] = useState<Mode>(undefined);

  return (
    <>
      <SafeAreaView style={styles.backgroundStyle}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.header}>
            <Text style={styles.title}>
              React Native Draggable Notification Card
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>A notification</Text>
            <Text style={styles.paragraph}>
              Click the buttons to see how different easing affect of the
              appearance of the entry animation
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => setMode('emphasized')}>
              <Text style={styles.buttonText}>Emphasized</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => setMode('linear')}>
              <Text style={styles.buttonText}>Linear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Some other stuff</Text>
            <Text style={styles.paragraph}>
              Lorem notificasum dolor sit cardum, consectetur adipiscing elit,
              sed do. Et notificadum quia draggabule est. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut går kortet minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subtitle}>Even some other stuff</Text>
            <Text style={styles.paragraph}>
              Yada yada blah blah och så vidare. Hit och dit och fram och
              tillbaka.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {mode && <Card onOut={() => setMode(undefined)} mode={mode} />}
    </>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#f0f0f0',
  },
  header: {
    margin: 25,
    marginVertical: 120,
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 30,
  },
  paragraph: {
    color: 'black',
    marginBottom: 15,
    fontSize: 16,
  },
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingTop: 5,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#f3ca62',
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
