import { FlashList } from '@shopify/flash-list';
import { Send } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/components/ui/colors';
import { AppScreen } from '@/components/ui/screen';
import { useChatStore } from '@/features/chat/chat-store';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const messages = useChatStore((state) => state.messages);
  const ask = useChatStore((state) => state.ask);

  function submit() {
    ask(message);
    setMessage('');
  }

  return (
    <AppScreen>
      <View style={styles.root}>
        <Text style={styles.heading}>AI Chat</Text>
        <FlashList
          data={messages}
          estimatedItemSize={90}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.role}>{item.role === 'user' ? 'You' : 'Tech Brief AI'}</Text>
              <Text style={styles.message}>{item.content}</Text>
            </View>
          )}
        />
        <View style={styles.composer}>
          <TextInput
            multiline
            placeholder="Ask about your tech brief"
            placeholderTextColor={colors.subtle}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />
          <Pressable accessibilityRole="button" style={styles.sendButton} onPress={submit}>
            <Send color={colors.text} size={18} />
          </Pressable>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  aiBubble: {
    backgroundColor: colors.panel
  },
  bubble: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14
  },
  composer: {
    alignItems: 'flex-end',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 12
  },
  heading: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 18
  },
  input: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    flex: 1,
    maxHeight: 110,
    minHeight: 46,
    padding: 12
  },
  message: {
    color: colors.text,
    lineHeight: 22,
    marginTop: 6
  },
  role: {
    color: colors.signal,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 64
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 8,
    height: 46,
    justifyContent: 'center',
    width: 46
  },
  userBubble: {
    backgroundColor: colors.panelAlt
  }
});
