import { Audio } from 'expo-av';
import { Pause, Play } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/components/ui/colors';

export function AudioPlayer({ audioUrl }: { readonly audioUrl: string | null }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      const sound = soundRef.current;
      soundRef.current = null;
      void sound?.unloadAsync();
    };
  }, []);

  async function togglePlayback() {
    if (!audioUrl || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      if (!soundRef.current) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        soundRef.current = sound;
      }

      const status = await soundRef.current.getStatusAsync();

      if (status.isLoaded && status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.label}>AI Podcast</Text>
        <Text style={styles.state}>{audioUrl ? 'Ready to play' : 'Audio pending'}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isPlaying ? 'Pause podcast' : 'Play podcast'}
        disabled={!audioUrl || isLoading}
        style={[styles.button, !audioUrl || isLoading ? styles.disabled : null]}
        onPress={() => void togglePlayback()}
      >
        {isPlaying ? <Pause color={colors.ink} size={22} /> : <Play color={colors.ink} size={22} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.mist,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  },
  label: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '700'
  },
  state: {
    color: '#516070',
    marginTop: 4
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.signal,
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    width: 52
  },
  disabled: {
    opacity: 0.45
  }
});
