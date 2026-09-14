import { Text, TextProps } from "react-native";

import { useTheme } from "@/lib/themeContext";

type AppTextProps = TextProps & { variant?: "primary" | "accent" | "subtext" };

export default function AppText({ variant, style, ...props }: AppTextProps) {
  const { colors } = useTheme();

  const textColors = {
    primary: colors.primary,
    accent: colors.accentText,
    subtext: colors.mutedText,
    default: colors.text,
  };

  const color = textColors[variant || "default"];

  return <Text style={[{ color, fontSize: 16 }, style]} {...props} />;
}
