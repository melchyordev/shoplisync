import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";

import AppText from "@/components/appText";
import { useTheme } from "@/lib/themeContext";

type AppButtonProps = {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline" | "warning";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function AppButton({
  onPress,
  title,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: AppButtonProps) {
  const { colors } = useTheme();

  const backgroundColors = {
    primary: colors.primary,
    secondary: colors.secondary,
    outline: "transparent",
    warning: colors.destructive,
  };

  const textColors = {
    primary: colors.primaryText,
    secondary: colors.secondaryText,
    outline: colors.primary,
    warning: colors.destructiveText,
  };

  const backgroundColor = backgroundColors[variant];
  const textColor = textColors[variant];
  const borderColor = variant === "outline" ? colors.primary : "transparent";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, borderColor },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText style={[styles.text, { color: textColor }, textStyle]}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
