import { StyleSheet, Text, View } from 'react-native';

import { appConfig } from '@tech-brief-ai/config';

export default function IndexScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{appConfig.name}</Text>
      <Text style={styles.body}>
        Mobile shell is ready for Phase 5 UI work after backend foundations land.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B0D12',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '600'
  },
  body: {
    color: '#EEF2F8',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12
  }
});
