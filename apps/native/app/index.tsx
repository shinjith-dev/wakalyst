import { THEME } from "@waka/config";
import { Text, useColorScheme, View } from "react-native";

export default function Index() {
  const theme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.color[theme].background,
      }}
    >
      <Text
        style={{
          color: THEME.color[theme].foreground,
        }}
      >
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
