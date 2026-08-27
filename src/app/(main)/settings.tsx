import { UserButton } from "@clerk/expo/native";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import ButtonGroup from "@/components/buttonGroup";
import { useTheme } from "@/lib/themeContext";
import { ThemeSettingOptions } from "@/lib/types";

const OPTIONS: ThemeSettingOptions[] = ["system", "light", "dark"];

export default function SettingsScreen() {
  const { themeSetting, changeThemeSetting } = useTheme();

  const handleThemeSwitch = (index: number) => {
    const nextTheme = OPTIONS[index];
    if (nextTheme === undefined) {
      return;
    }
    changeThemeSetting(nextTheme);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Settings",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <UserButton />
        <ButtonGroup
          options={OPTIONS}
          selectedIndex={Math.max(OPTIONS.indexOf(themeSetting), 0)}
          onChange={handleThemeSwitch}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
