import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import "./dark-theme.scss";
import "./light-theme.scss";

interface ThemedPageProps {
    children: ReactNode;
}

export default function ThemedPage(props: ThemedPageProps) {
    const [theme, setTheme] = useState(Theme.DARK);

    const changeTheme = (theme: Theme) => setTheme(theme);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme(Theme.DARK);
        } else {
            // Currently only DARK theme is supported.
            setTheme(Theme.DARK);
        }
    }, []);
    useEffect(() => {
        switch (theme) {
            case Theme.LIGHT:
                document.body.classList.add("light-theme");
                document.body.classList.remove("dark-theme");
                break;
            case Theme.DARK:
            default:
                document.body.classList.add("dark-theme");
                document.body.classList.remove("light-theme");
                break;
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{props.children}</ThemeContext.Provider>;
}
