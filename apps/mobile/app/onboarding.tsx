import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { postJson } from '@/lib/api-client';
import { useAppAuth } from '@/providers/auth-provider';
import {
  type OnboardingPreferencesInput,
  briefCategorySchema,
  onboardingPreferencesSchema
} from '@tech-brief-ai/validation';

const categoryOptions = briefCategorySchema.options;

export default function OnboardingScreen() {
  const { getToken } = useAppAuth();
  const router = useRouter();
  const form = useForm<OnboardingPreferencesInput>({
    resolver: zodResolver(onboardingPreferencesSchema),
    defaultValues: {
      categories: ['ai', 'developer-tools', 'mobile'],
      notificationHourLocal: 8,
      podcastVoice: 'en-US-AriaNeural',
      briefCadence: 'daily',
      darkMode: 'system',
      pushNotificationsEnabled: true
    }
  });

  const mutation = useMutation({
    async mutationFn(values: OnboardingPreferencesInput) {
      const token = await getToken();

      if (!token) {
        return { user: { id: 'expo-go-demo-user' } };
      }

      return postJson<{ readonly user: { readonly id: string } }, OnboardingPreferencesInput>(
        '/api/onboarding',
        values,
        { token },
      );
    },
    onSuccess() {
      router.replace('/(tabs)');
    }
  });

  const selectedCategories = form.watch('categories');

  function toggleCategory(category: (typeof categoryOptions)[number]) {
    const nextCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
      : [...selectedCategories, category];

    form.setValue('categories', nextCategories, { shouldValidate: true });
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text style={styles.eyebrow}>Setup</Text>
      <Text style={styles.title}>Tune your brief</Text>
      <Text style={styles.subtitle}>Choose the signals Tech Brief AI should prioritize.</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Topics</Text>
        <View style={styles.chips}>
          {categoryOptions.map((category) => {
            const selected = selectedCategories.includes(category);

            return (
              <Pressable
                key={category}
                style={[styles.chip, selected ? styles.chipSelected : styles.chipIdle]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={selected ? styles.chipTextSelected : styles.chipTextIdle}>
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Controller
        control={form.control}
        name="pushNotificationsEnabled"
        render={({ field }) => (
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Daily reminder</Text>
              <Text style={styles.helper}>Send a push when your brief is ready.</Text>
            </View>
            <Switch value={field.value} onValueChange={field.onChange} />
          </View>
        )}
      />

      <Pressable
        accessibilityRole="button"
        disabled={mutation.isPending}
        style={[styles.submit, mutation.isPending ? styles.submitDisabled : null]}
        onPress={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <Text style={styles.submitText}>{mutation.isPending ? 'Saving...' : 'Finish setup'}</Text>
      </Pressable>

      {form.formState.errors.categories ? (
        <Text style={styles.error}>{form.formState.errors.categories.message}</Text>
      ) : null}
      {mutation.error ? <Text style={styles.error}>{mutation.error.message}</Text> : null}
      {mutation.isSuccess ? <Text style={styles.success}>Preferences saved.</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B0D12',
    flexGrow: 1,
    padding: 24,
    paddingTop: 72
  },
  eyebrow: {
    color: '#14B8A6',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    marginTop: 10
  },
  subtitle: {
    color: '#B9C2D0',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10
  },
  section: {
    marginTop: 34
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  helper: {
    color: '#8792A3',
    marginTop: 4
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14
  },
  chip: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  chipIdle: {
    backgroundColor: '#151922',
    borderColor: '#2A3140'
  },
  chipSelected: {
    backgroundColor: '#EAF1FF',
    borderColor: '#4F8CFF'
  },
  chipTextIdle: {
    color: '#D7DEE9'
  },
  chipTextSelected: {
    color: '#12315F',
    fontWeight: '700'
  },
  switchRow: {
    alignItems: 'center',
    backgroundColor: '#151922',
    borderColor: '#2A3140',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 16
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#4F8CFF',
    borderRadius: 8,
    marginTop: 28,
    paddingVertical: 15
  },
  submitDisabled: {
    opacity: 0.7
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  error: {
    color: '#FF7A7A',
    lineHeight: 20,
    marginTop: 16
  },
  success: {
    color: '#14B8A6',
    lineHeight: 20,
    marginTop: 16
  }
});
