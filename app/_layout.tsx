import { THEME } from "@/lib";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const theme = useColorScheme()

  return <Stack
    screenOptions={{
      headerStyle: { backgroundColor: THEME.color[theme].base },
      headerTitleStyle: { color: THEME.color[theme].foreground }
    }}
  />;
}
