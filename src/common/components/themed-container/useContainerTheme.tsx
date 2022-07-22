import { useState } from "react";

export enum ContainerTheme {
    DEFAULT,
}

export function useContainerTheme(): { theme: ContainerTheme } {
    const [theme, setTheme] = useState(ContainerTheme.DEFAULT);

    return { theme };
}
