import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react';

type AuthContextValue = {
  readonly isLoaded: boolean;
  readonly isSignedIn: boolean;
  readonly getToken: () => Promise<string | null>;
  readonly signIn: () => Promise<void>;
  readonly signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(async () => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    setIsSignedIn(false);
  }, []);

  const getToken = useCallback(async () => null, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      getToken,
      isLoaded: true,
      isSignedIn,
      signIn,
      signOut
    }),
    [getToken, isSignedIn, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAppAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAppAuth must be used inside AuthProvider.');
  }

  return context;
}
