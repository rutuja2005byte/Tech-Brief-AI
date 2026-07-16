import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from './colors';

export function AppScreen({ children }: { readonly children: ReactNode }) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.ink,
    flex: 1
  }
});
