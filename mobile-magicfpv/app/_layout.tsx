import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function RootLayoutContent() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoggedIn === null) return;

    const inAuthGroup = segments[0] === "login";

    if (!isLoggedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isLoggedIn && inAuthGroup) {
      router.replace("/main");
    }
  }, [isLoggedIn, segments]);

  if (isLoggedIn === null) {
    return null; // Loading state
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="main/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="archive/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="passchange/index"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
