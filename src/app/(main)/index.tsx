import { Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const renderHeaderLeft = () => (
    <Pressable>
      <SymbolView name={{ ios: "plus", android: "add", web: "add" }} />
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable onPress={() => router.push("/settings")}>
      <SymbolView name={{ ios: "gear", android: "settings", web: "settings" }} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Shopping Lists",
          headerTitleAlign: "center",
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <View style={styles.container}>
        <Text>Home screen</Text>
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
