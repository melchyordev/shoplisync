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
  const [themeSetting, setThemeSetting] = useState<ThemeSettingOptions>("system");

  useEffect(() => {
    const getThemeSetting = async () => {
      try {
        const savedThemeSetting = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        switch (savedThemeSetting) {
          case "system":
            setThemeSetting("system");
            break;
          case "light":
            setThemeSetting("light");
            break;
          case "dark":
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
    setThemeSetting(newTheme);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme:
          themeSetting === "system" ? (colorScheme === "dark" ? "dark" : "light") : themeSetting,
        themeSetting,
        changeThemeSetting,
      }}
    >
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
