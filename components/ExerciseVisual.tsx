import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../lib/theme';
import { VisualData } from '../lib/types';

interface Props {
  visual: VisualData;
  size?: number;
}

export function ExerciseVisual({ visual }: Props) {
  if (!visual) return null;

  if (visual.type === 'rectangle') {
    const w = visual.width || 100;
    const h = visual.height || 100;
    return (
      <View style={styles.visualContainer}>
        <View style={styles.rectangleWrapper}>
          <View style={[styles.rectangle, { width: w, height: h }]}>
            {/* Top label */}
            {visual.labels?.map((l, i) => (
              <Text
                key={i}
                style={[
                  styles.label,
                  l.x !== undefined && l.y !== undefined
                    ? { left: l.x, top: l.y, position: 'absolute' }
                    : {},
                  l.color ? { color: l.color } : {},
                ]}
              >
                {l.text}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (visual.type === 'triangle') {
    const w = visual.width || 100;
    const h = visual.height || 100;
    return (
      <View style={styles.visualContainer}>
        <View style={[styles.triangle, { width: w, height: h }]}>
          {visual.labels?.map((l, i) => (
            <Text key={i} style={[styles.label, { left: l.x, top: l.y, position: 'absolute' }]}>
              {l.text}
            </Text>
          ))}
        </View>
      </View>
    );
  }

  if (visual.type === 'fraction-bar') {
    const numerator = visual.numerator || 1;
    const denominator = visual.denominator || 2;
    return (
      <View style={styles.visualContainer}>
        <Text style={styles.fractionDisplay}>
          <Text style={styles.fractionNum}>{numerator}</Text>
          <Text style={styles.fractionBar}>─</Text>
          <Text style={styles.fractionNum}>{denominator}</Text>
        </Text>
        <View style={styles.barContainer}>
          {Array.from({ length: denominator }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.barPiece,
                {
                  backgroundColor: i < numerator ? '#EF4444' : '#FEE2E2',
                  borderRightWidth: i === denominator - 1 ? 0 : 1,
                },
              ]}
            />
          ))}
        </View>
        <Text style={styles.fractionHint}>
          {numerator} part{numerator > 1 ? 's' : ''} sur {denominator}
        </Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  visualContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginVertical: 12,
  },
  rectangleWrapper: {
    padding: 20,
  },
  rectangle: {
    backgroundColor: colors.geometryLight,
    borderWidth: 3,
    borderColor: colors.geometry,
    borderRadius: 4,
    position: 'relative',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.geometry,
  },
  label: {
    fontSize: fontSizes.md,
    fontWeight: '700',
    color: colors.text,
  },
  fractionDisplay: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.fractions,
    marginBottom: 12,
    textAlign: 'center',
  },
  fractionNum: {
    fontSize: 48,
  },
  fractionBar: {
    fontSize: 32,
  },
  barContainer: {
    flexDirection: 'row',
    height: 36,
    width: 240,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.fractions,
  },
  barPiece: {
    flex: 1,
    borderColor: colors.fractions,
  },
  fractionHint: {
    marginTop: 8,
    color: colors.textLight,
    fontSize: fontSizes.sm,
  },
});