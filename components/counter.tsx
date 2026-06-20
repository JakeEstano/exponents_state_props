import { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const HOLD_INITIAL_DELAY = 400;
const HOLD_REPEAT_INTERVAL = 80;

// The bottle's milk level is just for fun/flavor — it maps count onto a
// 0-200 range so the bottle visibly fills and empties as you tap, with a
// playful label at the extremes. It has no effect on the actual count logic.
const BOTTLE_MIN = 0;
const BOTTLE_MAX = 200;

const SPRING = { damping: 14, stiffness: 220, mass: 0.6 };

function ChunkyButton({
  label,
  color,
  shadowColor,
  onPressIn,
  onPressOut,
}: {
  label: string;
  color: string;
  shadowColor: string;
  onPressIn: () => void;
  onPressOut: () => void;
}) {
  const press = useSharedValue(0);

  const capStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: press.value * 6 }],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: 1 - press.value * 0.3 }],
    opacity: 1 - press.value * 0.25,
  }));

  const handleIn = () => {
    press.value = withSpring(1, { damping: 16, stiffness: 300 });
    onPressIn();
  };
  const handleOut = () => {
    press.value = withSpring(0, SPRING);
    onPressOut();
  };

  return (
    <Pressable
      onPressIn={handleIn}
      onPressOut={handleOut}
      onTouchCancel={handleOut}
      style={styles.buttonStack}>
      <Animated.View style={[styles.buttonShadow, { backgroundColor: shadowColor }, shadowStyle]} />
      <Animated.View style={[styles.buttonCap, { backgroundColor: color }, capStyle]}>
        <Text style={styles.buttonText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

type CounterProps = {
  /** Current count value — owned by the parent component. */
  count: number;
  /** The value reset returns to — owned by the parent component. */
  initial: number;
  /** Called whenever the count should change (step, hold-repeat, or reset). */
  onChange: (next: number) => void;
};

export function Counter({ count, initial, onChange }: CounterProps) {
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(count);
  countRef.current = count;

  const numberScale = useSharedValue(1);
  const numberRotate = useSharedValue(0);
  const wobble = useSharedValue(0);
  const fillHeight = useSharedValue(0);

  const clampedFill = Math.max(0, Math.min(1, (count - BOTTLE_MIN) / (BOTTLE_MAX - BOTTLE_MIN)));

  useEffect(() => {
    fillHeight.value = withSpring(clampedFill, { damping: 16, stiffness: 120 });
  }, [clampedFill]);

  const bumpNumber = useCallback((direction: number) => {
    numberScale.value = withSequence(
      withTiming(1.18, { duration: 90 }),
      withSpring(1, { damping: 8, stiffness: 260 })
    );
    numberRotate.value = withSequence(
      withTiming(direction * 6, { duration: 90 }),
      withSpring(0, { damping: 8, stiffness: 260 })
    );
  }, []);

  const stopHold = useCallback(() => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    if (holdInterval.current) {
      clearInterval(holdInterval.current);
      holdInterval.current = null;
    }
  }, []);

  useEffect(() => stopHold, [stopHold]);

  const startHold = useCallback((step: number) => {
    stopHold();
    onChange(countRef.current + step);
    bumpNumber(step);
    holdTimeout.current = setTimeout(() => {
      holdInterval.current = setInterval(() => {
        onChange(countRef.current + step);
        bumpNumber(step);
      }, HOLD_REPEAT_INTERVAL);
    }, HOLD_INITIAL_DELAY);
  }, [bumpNumber, onChange, stopHold]);

  const handleReset = useCallback(() => {
    onChange(initial);
    wobble.value = withSequence(
      withTiming(-1, { duration: 70 }),
      withTiming(1, { duration: 70 }),
      withTiming(-1, { duration: 70 }),
      withSpring(0, { damping: 6, stiffness: 200 })
    );
  }, [initial, onChange]);

  const numberStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: numberScale.value },
      { rotate: `${numberRotate.value}deg` },
    ],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${wobble.value * 1.5}deg` }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    height: `${fillHeight.value * 100}%`,
  }));

  const statusLabel = count >= BOTTLE_MAX ? 'FULL!' : count <= BOTTLE_MIN ? 'EMPTY' : null;

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>CHILD COMPONENT</Text>
      </View>

      <View style={styles.bottleWrap}>
        <View style={styles.nipple} />
        <View style={styles.collar} />
        <View style={styles.bottleBody}>
          <Animated.View style={[styles.milkFill, fillStyle]} />

          {/* Measurement lines, just for bottle flavor */}
          <View style={[styles.measureLine, { top: '25%' }]} />
          <View style={[styles.measureLine, { top: '50%' }]} />
          <View style={[styles.measureLine, { top: '75%' }]} />

          <Animated.Text style={[styles.count, numberStyle]}>{count}</Animated.Text>
        </View>
        <View style={styles.bottleBase} />
      </View>

      {statusLabel && (
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      )}

      <View style={styles.row}>
        <ChunkyButton
          label="−"
          color="#FF6F61"
          shadowColor="#C7473C"
          onPressIn={() => startHold(-1)}
          onPressOut={stopHold}
        />
        <ChunkyButton
          label="+"
          color="#5FD0A6"
          shadowColor="#2F9E78"
          onPressIn={() => startHold(1)}
          onPressOut={stopHold}
        />
      </View>

      <Pressable onPress={handleReset} hitSlop={10}>
        {({ pressed }) => (
          <View style={[styles.resetPill, pressed && styles.resetPillPressed]}>
            <Text style={styles.resetText}>↺ reset</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const PAPER = '#FFF8EC';
const INK = '#2B2118';
const YELLOW = '#FFC857';
const MILK = '#FFF6E0';
const MILK_LINE = '#F0E0B8';

const styles = StyleSheet.create({
  card: {
    backgroundColor: PAPER,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: INK,
    paddingVertical: 28,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  badge: {
    backgroundColor: YELLOW,
    borderWidth: 2.5,
    borderColor: INK,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginBottom: 20,
    transform: [{ rotate: '-2deg' }],
  },
  badgeText: {
    color: INK,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  bottleWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  nipple: {
    width: 28,
    height: 22,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#F4C9A8',
    borderWidth: 2.5,
    borderColor: INK,
    marginBottom: -3,
    zIndex: 2,
  },
  collar: {
    width: 56,
    height: 12,
    borderRadius: 5,
    backgroundColor: '#E0A930',
    borderWidth: 2.5,
    borderColor: INK,
    marginBottom: -4,
    zIndex: 1,
  },
  bottleBody: {
    width: 124,
    height: 158,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 3,
    borderColor: INK,
    backgroundColor: '#FFFDF7',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milkFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: MILK,
  },
  measureLine: {
    position: 'absolute',
    left: 10,
    width: 14,
    height: 2,
    borderRadius: 1,
    backgroundColor: MILK_LINE,
  },
  bottleBase: {
    width: 96,
    height: 6,
    borderRadius: 3,
    backgroundColor: INK,
    opacity: 0.12,
    marginTop: 4,
  },
  count: {
    color: INK,
    fontSize: 34,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },

  statusPill: {
    borderWidth: 2,
    borderColor: INK,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 14,
    backgroundColor: PAPER,
    marginBottom: 18,
  },
  statusText: {
    color: INK,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 28,
    marginBottom: 26,
  },
  buttonStack: {
    width: 76,
    height: 84,
    alignItems: 'center',
  },
  buttonShadow: {
    position: 'absolute',
    top: 8,
    width: 76,
    height: 76,
    borderRadius: 22,
  },
  buttonCap: {
    width: 76,
    height: 76,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: INK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: INK,
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 38,
  },
  resetPill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: INK,
    backgroundColor: '#FFF8EC',
  },
  resetPillPressed: {
    backgroundColor: YELLOW,
  },
  resetText: {
    color: INK,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});