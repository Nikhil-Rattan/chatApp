import React, { useEffect, useEffectEvent, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
};

export const AnimatedEntrance = ({
  children,
  delay = 0,
  distance = 10,
  style,
}: Props) => {
  const progress = useRef(new Animated.Value(0)).current;

  const playEntrance = useEffectEvent((reduceMotion: boolean) => {
    if (reduceMotion) {
      progress.setValue(1);
      return;
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: 280,
      delay,
      useNativeDriver: true,
    }).start();
  });

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then(reduceMotion => {
      if (!active) return;
      playEntrance(reduceMotion);
    });
    return () => {
      active = false;
      progress.stopAnimation();
    };
  }, [progress]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
