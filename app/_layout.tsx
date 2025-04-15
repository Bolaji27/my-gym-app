
import "./globals.css";
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';



export default function RootLayout() {

  return (
     <>
      <Stack>
      <Stack.Screen name="index" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="logs" />
        <Stack.Screen name="gains" />
        

      </Stack>
      <StatusBar style="auto" />
      </>
  );
}
