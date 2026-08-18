import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../lib/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  count: number;
  size?: number;
  showCount?: boolean;
  color?: string;
}

export function StarsDisplay({ count, size = 18, showCount = false, color = colors.star }: Props) {
  return (
    <View style={styles.row}>
      {[0, 1, 2].map(i => (
        <Ionicons
          key={i}
          name="star"
          size={size}
          color={i < count ? color : colors.starEmpty}
          style={{ marginHorizontal: 1 }}
        />
      ))}
      {showCount && (
        <Text style={[styles.count, { fontSize: size * 0.8 }]}>×{count}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  count: { marginLeft: 6, color: colors.text, fontWeight: '700' },
});