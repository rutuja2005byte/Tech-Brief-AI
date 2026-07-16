import type { ReactNode } from 'react';
import { View } from 'react-native';

export interface ScreenProps {
  readonly children: ReactNode;
}

export function Screen({ children }: ScreenProps) {
  return <View className="flex-1 bg-ink">{children}</View>;
}
