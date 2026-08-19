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
    <View style={[styles.container, { borderColor: colors.border }]} accessibilityRole="radiogroup">
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <Pressable
            key={option}
            onPress={() => onChange(index)}
            style={[
              styles.button,
              { backgroundColor: colors.surface },
              isSelected && { ...styles.selected, backgroundColor: colors.divider },
              isFirst && styles.first,
              isLast && styles.last,
            ]}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.text,
                { color: colors.text },
                isSelected && { ...styles.selectedText, color: colors.primary },
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
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selected: {
    borderRadius: 6,
  },
  first: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  last: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: "bold",
  },
});
