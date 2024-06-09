import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';

import NotificationCard from './NotificationCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#113',
    borderRadius: 30,
    elevation: 5,
    padding: 20,
    margin: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  body: {
    color: 'white',
    fontSize: 18,
    paddingBottom: 40,
  },
  closeContainer: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    height: 32,
    right: 16,
    position: 'absolute',
    top: 16,
    width: 32,
  },
  closeBackground: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: 32,
    width: 32,
  },
  closeBar1: {
    backgroundColor: 'black',
    height: 2,
    left: 8,
    position: 'absolute',
    top: 15,
    transform: [{rotate: '-45deg'}],
    width: 16,
  },
  closeBar2: {
    backgroundColor: 'black',
    height: 2,
    left: 8,
    position: 'absolute',
    top: 15,
    transform: [{rotate: '45deg'}],
    width: 16,
  },
});

type Props = {
  mode: 'emphasized' | 'normal' | 'linear' | undefined;
  onOut?: () => void;
};

const Card = ({mode, onOut}: Props) => {
  return (
    <NotificationCard
      style={styles.card}
      threshold={80}
      onOut={onOut}
      mode={mode}>
      {onClose => (
        <>
          <Text style={styles.title}>Notification card</Text>
          <Text style={styles.body}>Something here...</Text>
          <Pressable onPress={onClose} style={styles.closeContainer}>
            <View style={styles.closeBackground} pointerEvents="auto">
              <View style={styles.closeBackground}>
                <View style={styles.closeBar1} />
                <View style={styles.closeBar2} />
              </View>
            </View>
          </Pressable>
        </>
      )}
    </NotificationCard>
  );
};

export default Card;
