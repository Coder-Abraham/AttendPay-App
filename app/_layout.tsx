import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Component, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AuthProvider } from '@/context/AuthContext';

// Prevent the splash screen from auto-hiding before we're ready
SplashScreen.preventAutoHideAsync().catch(() => {});

// Error boundary to catch and display crashes instead of closing
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: String(error?.message || error) };
  }

  componentDidCatch(error: any, info: any) {
    console.error('App crash:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#0A2540', padding: 24, paddingTop: 60 }}>
          <Text style={{ color: '#EF4444', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            App Error — Please Report This
          </Text>
          <ScrollView style={{ backgroundColor: '#1A3A52', borderRadius: 8, padding: 16 }}>
            <Text style={{ color: '#E8F4FF', fontSize: 13, fontFamily: 'monospace' }}>
              {this.state.error}
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.setState({ hasError: false, error: '' })}
            style={{ marginTop: 20, backgroundColor: '#0080E1', padding: 14, borderRadius: 8, alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

function RootLayoutContent() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <StatusBar style="auto" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
