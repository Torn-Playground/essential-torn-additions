import { useEffect, useState } from "react";

export enum Theme {
    DARK,
    LIGHT,
}

export function useTheme(): { theme: Theme } {
    const [theme, setTheme] = useState(Theme.DARK);

    useEffect(() => {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme(Theme.DARK);
        } else {
            // Currently only DARK theme is supported.
            setTheme(Theme.DARK);
        }
    }, []);

    return { theme };
}
