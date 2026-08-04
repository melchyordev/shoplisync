import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { ThemeOptions, ThemeSettingOptions } from "@/lib/types";

import { colors } from "./colors";

const THEME_STORAGE_KEY = "shoplisync_theme";

type ThemeContextType = {
  theme: ThemeOptions;
  themeSetting: ThemeSettingOptions;
  changeThemeSetting: (newTheme: ThemeSettingOptions) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeOptions>(
    colorScheme === "unspecified" ? "light" : colorScheme,
  );
  const [themeSetting, setThemeSetting] = useState<ThemeSettingOptions>(
    colorScheme === "unspecified" ? "light" : colorScheme,
  );

  useEffect(() => {
    if (themeSetting === "system") {
      setTheme(colorScheme === "unspecified" ? "light" : colorScheme);
    }
  }, [colorScheme]);

  useEffect(() => {
    const getThemeSetting = async () => {
      try {
        const savedThemeSetting = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        switch (savedThemeSetting) {
          case "system":
            setTheme(colorScheme === "unspecified" ? "light" : colorScheme);
            setThemeSetting("system");
            break;
          case "light":
            setTheme("light");
            setThemeSetting("light");
            break;
          case "dark":
            setTheme("dark");
            setThemeSetting("dark");
            break;
          default:
            break;
        }
      } catch (error) {
        console.log("Error loading theme: ", error);
      }
    };
    getThemeSetting();
  }, []);

  const changeThemeSetting = (newTheme: ThemeSettingOptions) => {
    const systemOption = colorScheme === "unspecified" ? "light" : colorScheme;
    setTheme(newTheme === "system" ? systemOption : newTheme);
    setThemeSetting(newTheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeSetting, changeThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Component exists outside the ThemeProvider");
  }

  const colorSet = colors[context.theme];

  return { ...context, colors: colorSet };
};
