import { Text, TextProps } from "react-native";

import { useTheme } from "@/lib/themeContext";

type AppTextProps = TextProps & { variant?: "primary" | "accent" | "subtext" };

export default function AppText({ variant, style, ...props }: AppTextProps) {
  const { colors } = useTheme();

  const textColors = {
    primary: colors.primary0,
    accent: colors.accent0,
    subtext: colors.surface50,
    default: colors.text,
  };

  const color = textColors[variant || "default"];

  return <Text style={[{ color, fontSize: 16 }, style]} {...props} />;
}
