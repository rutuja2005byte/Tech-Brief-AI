import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export interface ScreenProps {
  readonly children: ReactNode;
}

export function Screen({ children }: ScreenProps) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B0D12',
    flex: 1
  }
});
