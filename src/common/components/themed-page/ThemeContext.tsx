import { createContext } from "react";
import { Theme } from "@common/components/themed-page/useTheme";

export const ThemeContext = createContext({
    theme: Theme.DARK,
});
