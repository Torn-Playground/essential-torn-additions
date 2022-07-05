import { useEffect, useState } from "react";
import * as styles from "./Message.module.css";

interface MessageProps {
    text: string;
    type?: "normal" | "error";
}

export default function Message(props: MessageProps) {
    const [colorClass, setColorClass] = useState<string>();

    useEffect(() => {
        switch (props.type) {
            case "error":
                setColorClass(styles.error);
                break;
            case "normal":
            default:
                setColorClass(undefined);
                break;
        }
    }, [props.type]);

    return <p className={colorClass}>{props.text}</p>;
}
