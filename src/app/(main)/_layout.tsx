import { Stack } from "expo-router";

import { useTheme } from "@/lib/themeContext";

export default function MainLayout() {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface0 },
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.text,
      }}
    />
  );
}
