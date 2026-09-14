import { UserButton } from "@clerk/expo/native";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import AppButton from "@/components/appButton";
import AppText from "@/components/appText";
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
        <UserButton />
        <AppText>App Theme</AppText>
        <AppText variant="primary">This is a test</AppText>
        <ButtonGroup
          options={OPTIONS}
          selectedIndex={Math.max(OPTIONS.indexOf(themeSetting), 0)}
          onChange={handleThemeSwitch}
        />
        <AppButton onPress={() => null} title="Primary" />
        <AppButton onPress={() => null} title="Secondary" variant="secondary" />
        <AppButton onPress={() => null} title="Outline" variant="outline" />
        <AppButton onPress={() => null} title="Warning" variant="warning" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
});
