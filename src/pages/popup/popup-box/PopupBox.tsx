import { ReactNode } from "react";
import * as styles from "./PopupBox.module.scss";

interface PopupBoxProps {
    children: ReactNode;
    minWidth: number;
}

export default function PopupBox(props: PopupBoxProps) {
    return (
        <div style={{ minWidth: props.minWidth }} className={styles.popupBox}>
            {props.children}
        </div>
    );
}
