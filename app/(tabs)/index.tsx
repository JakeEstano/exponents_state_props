import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Counter } from '@/components/counter';

const INITIAL_VALUE = 100;

export default function HomeScreen() {
  // Lifted state: the parent owns `count`, Counter is just a controlled view + buttons.
  const [count, setCount] = useState(INITIAL_VALUE);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Components, State & Props</Text>

      <View style={styles.content}>
        <View style={styles.panel}>
          <Text style={styles.panelLabel}>PARENT COMPONENT</Text>
          <Text style={styles.panelSub}>holds the count state</Text>

          <View style={styles.stateRow}>
            <Text style={styles.stateKey}>count</Text>
            <Text style={styles.stateEquals}>=</Text>
            <Text style={styles.stateValue}>{count}</Text>
          </View>

          <View style={styles.stateRow}>
            <Text style={styles.stateKey}>initial</Text>
            <Text style={styles.stateEquals}>=</Text>
            <Text style={styles.stateValue}>{INITIAL_VALUE}</Text>
          </View>
        </View>

        <Counter count={count} initial={INITIAL_VALUE} onChange={setCount} />
      </View>
    </SafeAreaView>
  );
}

const PAPER = '#FFF8EC';
const INK = '#2B2118';
const YELLOW = '#FFC857';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6',
    alignItems: 'center',
  },
  title: {
    color: INK,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 24,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: PAPER,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: INK,
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  panelLabel: {
    color: INK,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  panelSub: {
    color: '#8A7560',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
    marginTop: 2,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginBottom: 4,
  },
  stateKey: {
    color: '#8A7560',
    fontSize: 16,
    fontWeight: '600',
    width: 56,
  },
  stateEquals: {
    color: YELLOW,
    fontSize: 16,
    fontWeight: '800',
  },
  stateValue: {
    color: INK,
    fontSize: 20,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },
});