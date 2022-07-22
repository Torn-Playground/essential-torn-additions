import { ReactNode, useState } from "react";
import { useContainerTheme } from "@common/components/themed-container/useContainerTheme";
import HidableElement from "@common/components/hidable-element/HidableElement";

interface ThemedPageProps {
    children: ReactNode;
}

export default function ThemedContainer(props: ThemedPageProps) {
    const { theme } = useContainerTheme();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="eta-container">
            <section onClick={() => setCollapsed((x) => !x)}>HEADER</section>
            <HidableElement hidden={collapsed}>
                <section>{props.children}</section>
            </HidableElement>
        </div>
    );
}
