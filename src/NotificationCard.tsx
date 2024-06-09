import React, {useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  ViewStyle,
  Easing,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
  },
});

// const {height: CARD_HEIGHT} = Dimensions.get('window');
const CARD_HEIGHT = 200;

type AnimMode = 'emphasized' | 'normal' | 'linear';

type Props = {
  mode: AnimMode | undefined;
  children: (onClose: () => void) => React.ReactNode;
  style: ViewStyle;
  threshold: number;
  onOut?: () => void;
};

const modeMapIn = {
  emphasized: Easing.bezier(0.3, 0.0, 0.8, 0.15),
  normal: Easing.bezier(0.3, 0, 1, 1),
  linear: Easing.linear,
};

const modeMapOut = {
  emphasized: Easing.bezier(0.05, 0.7, 0.1, 1.0),
  normal: Easing.bezier(0, 0, 0, 1),
  linear: Easing.linear,
};

const NotificationContainer = ({
  mode,
  children,
  style,
  threshold,
  onOut = () => {},
}: Props) => {
  const pan = useRef<Animated.Value>(new Animated.Value(CARD_HEIGHT)).current;

  const slow = mode?.includes('Slow');

  const outAnimation = useCallback(
    (localMode?: AnimMode) => {
      const animMode = localMode ?? mode;
      Animated.timing(pan, {
        toValue: CARD_HEIGHT,
        duration: slow ? 1300 : 300,
        useNativeDriver: true,
        easing: animMode ? modeMapIn[animMode] : undefined,
      }).start(onOut);
    },
    [mode, onOut, pan, slow],
  );

  const inAnimation = useCallback(() => {
    Animated.timing(pan, {
      toValue: 0,
      duration: slow ? 1500 : 500,
      useNativeDriver: true,
      easing: mode ? modeMapOut[mode] : undefined,
    }).start();
  }, [pan, slow, mode]);

  const onClose = outAnimation;

  useEffect(() => {
    inAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        const newY =
          gestureState.dy < 0 ? -Math.sqrt(-gestureState.dy) : gestureState.dy;

        Animated.event([null, {dy: pan}], {
          useNativeDriver: false,
        })(_, {dy: newY});
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        if (gestureState.dy > threshold) {
          // Dragging exceeds threshold, animate pane out of screen
          outAnimation('linear');
        } else {
          // Dragging is less than threshold, animate pane back to start position
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[style, {transform: [{translateY: pan}]}]}
        {...panResponder.panHandlers}>
        {/* call children as a function */}
        {children(onClose)}
      </Animated.View>
    </View>
  );
};

export default NotificationContainer;
