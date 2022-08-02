import { useEffect, useState } from "react";

export enum TornTheme {
    DARK,
    LIGHT,
}

export function useTornTheme(): { theme: TornTheme } {
    const [theme, setTheme] = useState(TornTheme.DARK);

    const checkTheme = () => {
        const { classList } = document.body;

        if (classList.contains("dark-mode")) {
            setTheme(TornTheme.DARK);
        } else {
            setTheme(TornTheme.LIGHT);
        }
    };

    useEffect(() => {
        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    return { theme };
}
