import React from 'react';
import {
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '@/state/theme-store';

interface LayoutWithScrollProps {
  mode: 'scroll';
  contentContainerStyle?: ViewStyle; // Estilo para el contenido
  scrollProps?: ScrollViewProps; // Props extras para ScrollView
}

interface LayoutWithoutScrollProps {
  mode: 'view';
  containerStyle?: ViewStyle;
}

type LayoutProps =
  | {
      children: React.ReactNode;
      withBottom?: boolean;
    } & (LayoutWithScrollProps | LayoutWithoutScrollProps);

export default function Layout(props: LayoutProps) {
  const barStyle = useThemeStore(state => state.barStyle);

  const Container = props.mode === 'scroll' ? ScrollView : View;

  const edges: Edges = props.withBottom ? ['top', 'bottom'] : ['top'];

  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <StatusBar barStyle={barStyle} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Container
          {...(props.mode === 'scroll'
            ? {
                contentContainerStyle: [
                  styles.scrollContent,
                  props.contentContainerStyle,
                ],
                keyboardShouldPersistTaps: 'handled',
                ...props.scrollProps,
              }
            : { style: [styles.viewContent, props.containerStyle] })}
        >
          {props.children}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
  viewContent: {
    flex: 1,
  },
});
