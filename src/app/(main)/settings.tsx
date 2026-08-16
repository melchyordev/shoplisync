import { UserButton } from "@clerk/expo/native";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
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
