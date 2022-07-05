import { createContext } from "react";

export enum Theme {
    DARK,
    LIGHT,
}

export const ThemeContext = createContext({
    theme: Theme.DARK,
    changeTheme: (theme: Theme) => {},
});
