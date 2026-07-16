import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/ui/screen';
import { AudioPlayer } from '@/features/briefs/audio-player';
import { BriefCard } from '@/features/briefs/brief-card';
import { useLatestBrief } from '@/features/briefs/use-latest-brief';
import { colors } from '@/components/ui/colors';

export default function TodayScreen() {
  const latestBriefQuery = useLatestBrief();
  const brief = latestBriefQuery.data?.brief ?? null;

  return (
    <AppScreen>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={latestBriefQuery.isRefetching}
            tintColor={colors.accent}
            onRefresh={() => void latestBriefQuery.refetch()}
          />
        }
      >
        <Text style={styles.eyebrow}>Today</Text>
        <Text style={styles.heading}>Your tech signal</Text>
        {latestBriefQuery.isLoading ? <StateMessage title="Loading brief" /> : null}
        {latestBriefQuery.error ? <StateMessage title={latestBriefQuery.error.message} /> : null}
        {!latestBriefQuery.isLoading && !latestBriefQuery.error && !brief ? (
          <StateMessage title="No brief yet" body="Run the generation pipeline to publish one." />
        ) : null}
        {brief ? (
          <View style={styles.stack}>
            <BriefCard brief={brief} />
            <AudioPlayer audioUrl={brief.audioUrl} />
          </View>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}

function StateMessage({ title, body }: { readonly title: string; readonly body?: string }) {
  return (
    <View style={styles.stateCard}>
      <Text style={styles.stateTitle}>{title}</Text>
      {body ? <Text style={styles.stateBody}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    padding: 20,
    paddingTop: 64
  },
  eyebrow: {
    color: colors.signal,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40
  },
  stack: {
    gap: 16
  },
  stateCard: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18
  },
  stateTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700'
  },
  stateBody: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 8
  }
});
