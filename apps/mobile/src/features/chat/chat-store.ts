import { create } from 'zustand';

interface ChatMessage {
  readonly id: string;
  readonly role: 'assistant' | 'user';
  readonly content: string;
}

interface ChatState {
  readonly messages: readonly ChatMessage[];
  readonly ask: (message: string) => void;
}

const initialMessages: readonly ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Ask about today’s brief, source trends, or what to read next.'
  }
];

export const useChatStore = create<ChatState>((set) => ({
  messages: initialMessages,
  ask(message) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `${Date.now()}-user`,
          role: 'user',
          content: trimmedMessage
        },
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content:
            'The local Expo Go assistant is using the cached brief. Connect the authenticated API to enable Groq-powered RAG answers over the full article index.'
        }
      ]
    }));
  }
}));
