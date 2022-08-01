import { IoClose } from "react-icons/all";
import * as styles from "./QuickItemCard.module.scss";

export default function CloseIcon(props: { onRemove: () => void }) {
    return (
        <IoClose
            size={16}
            className={styles.closeIcon}
            stroke="#a7a7a7"
            fill="#a7a7a7"
            onClick={(event) => {
                event.stopPropagation();

                props.onRemove();
            }}
        />
    );
}
