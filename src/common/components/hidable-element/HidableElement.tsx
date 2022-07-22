import { ReactNode } from "react";

interface HidableElementProps {
    children: ReactNode;
    hidden: boolean;
}

export default function HidableElement(props: HidableElementProps) {
    return props.hidden ? <></> : <>{props.children}</>;
}
