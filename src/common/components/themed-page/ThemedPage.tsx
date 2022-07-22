import { ReactNode, useEffect } from "react";
import "./dark-theme.scss";
import "./light-theme.scss";
import "./reset.scss";
import { ThemeContext } from "@common/components/themed-page/ThemeContext";
import { Theme, useTheme } from "@common/components/themed-page/useTheme";

interface ThemedPageProps {
    children: ReactNode;
}

export default function ThemedPage(props: ThemedPageProps) {
    const { theme } = useTheme();

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

    return <ThemeContext.Provider value={{ theme }}>{props.children}</ThemeContext.Provider>;
}
