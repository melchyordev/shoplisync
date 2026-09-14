import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/lib/themeContext";

type ButtonGroupProps = {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
};

export default function ButtonGroup({ options, selectedIndex, onChange }: ButtonGroupProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.card }]} accessibilityRole="radiogroup">
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;

        return (
          <Pressable
            key={option}
            onPress={() => onChange(index)}
            style={[
              { backgroundColor: colors.card },
              isSelected && { backgroundColor: colors.accent },
              styles.button,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                { color: colors.text },
                styles.text,
                isSelected && { ...styles.selectedText },
              ]}
            >{`${option.charAt(0).toUpperCase()}${option.slice(1)}`}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: "bold",
  },
});
