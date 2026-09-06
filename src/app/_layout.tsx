import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // <-- Esto oculta el rectángulo blanco en TODAS las pantallas
      }}
    />
  );
}