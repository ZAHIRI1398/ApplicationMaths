import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../lib/theme';

const { width, height } = Dimensions.get('window');

const COLORS = ['#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#06B6D4'];

interface Piece {
  startX: number;
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
  delay: number;
  sway: number;
}

export function Confetti({ active, count = 30 }: { active: boolean; count?: number }) {
  const pieces = useRef<Piece[]>(
    Array.from({ length: count }).map(() => ({
      startX: Math.random() * width,
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-50),
      rotate: new Animated.Value(0),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 8 + Math.random() * 8,
      delay: Math.random() * 300,
      sway: (Math.random() - 0.5) * 100,
    }))
  ).current;

  useEffect(() => {
    if (!active) return;
    const animations = pieces.map(p => {
      p.y.setValue(-50);
      p.x.setValue(p.startX);
      p.rotate.setValue(0);
      return Animated.parallel([
        Animated.timing(p.y, {
          toValue: height + 50,
          duration: 2000 + Math.random() * 1000,
          delay: p.delay,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotate, {
          toValue: 1,
          duration: 2000,
          delay: p.delay,
          useNativeDriver: true,
        }),
        Animated.timing(p.x, {
          toValue: p.startX + p.sway,
          duration: 2000,
          delay: p.delay,
          useNativeDriver: true,
        }),
      ]);
    });
    Animated.stagger(20, animations).start();
  }, [active]);

  if (!active) return null;

  return (
    <View pointerEvents="none" style={styles.container}>
      {pieces.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size * 1.4,
            backgroundColor: p.color,
            transform: [
              {
                rotate: p.rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '720deg'],
                }),
              },
            ],
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});