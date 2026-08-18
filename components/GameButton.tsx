import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, fontSizes, spacing, shadows } from '../lib/theme';

interface Props {
  label: string;
  onPress: () => void;
  colors: string[];
  emoji?: string;
  disabled?: boolean;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
  variant?: 'gradient' | 'solid' | 'outline';
  solidColor?: string;
}

export function GameButton({
  label,
  onPress,
  colors: btnColors,
  emoji,
  disabled,
  style,
  size = 'medium',
  variant = 'gradient',
  solidColor,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const fontSize = size === 'small' ? fontSizes.sm : size === 'large' ? fontSizes.xl : fontSizes.md;
  const paddingV = size === 'small' ? spacing.sm : size === 'large' ? spacing.lg : spacing.md;
  const paddingH = size === 'small' ? spacing.md : size === 'large' ? spacing.xl : spacing.lg;

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <View
          style={[
            styles.container,
            {
              paddingVertical: paddingV,
              paddingHorizontal: paddingH,
              backgroundColor: variant === 'solid' ? (solidColor || colors.primary) : variant === 'outline' ? 'transparent' : btnColors[0],
              borderWidth: variant === 'outline' ? 3 : 0,
              borderColor: btnColors[0],
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <View style={styles.inner}>
            {emoji && <Text style={[styles.emoji, { fontSize: fontSize * 1.5 }]}>{emoji}</Text>}
            <Text
              style={[
                styles.label,
                {
                  fontSize,
                  color: variant === 'outline' ? btnColors[0] : colors.white,
                },
              ]}
            >
              {label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    marginRight: 8,
  },
  label: {
    fontWeight: '800',
    textAlign: 'center',
  },
});