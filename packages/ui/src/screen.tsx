import { createElement, type ComponentType, type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export interface ScreenProps {
  readonly children: ReactNode;
}

const NativeView = View as unknown as ComponentType<{
  readonly children?: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}>;

export function Screen({ children }: ScreenProps) {
  return createElement(NativeView, { style: styles.root }, children);
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B0D12',
    flex: 1
  }
});
