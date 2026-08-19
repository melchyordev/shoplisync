import { UserButton } from "@clerk/expo/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ButtonGroup from "@/components/buttonGroup";
import { useTheme } from "@/lib/themeContext";
import { ThemeSettingOptions } from "@/lib/types";

const OPTIONS: ThemeSettingOptions[] = ["system", "light", "dark"];

export default function SettingsScreen() {
  const { themeSetting, changeThemeSetting } = useTheme();

  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);

  useEffect(() => {
    setSelectedThemeIndex(OPTIONS.indexOf(themeSetting));
  }, [themeSetting]);

  const handleThemeSwitch = (index: number) => {
    const nextTheme = OPTIONS[index];
    if (nextTheme === undefined) {
      return;
    }
    setSelectedThemeIndex(index);
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
          selectedIndex={selectedThemeIndex}
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
