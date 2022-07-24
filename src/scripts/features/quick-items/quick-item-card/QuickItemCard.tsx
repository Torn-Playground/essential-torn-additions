import { QuickItem } from "@scripts/features/quick-items/QuickItems";
import * as styles from "./QuickItemCard.module.scss";
import { IoClose } from "react-icons/all";

interface QuickItemCardProps {
    item: QuickItem;
}

export default function QuickItemCard(props: QuickItemCardProps) {
    // FIXME - Implement tooltips.
    // FIXME - Implement reordering.
    return (
        <div
            className={styles.quickItem}
            onClick={() => {
                // FIXME - Implement usage.
            }}
        >
            <div className={styles.icon} style={{ backgroundImage: `url(/images/items/${props.item.id}/medium.png)` }}></div>
            <div className={styles.title}>{props.item.name}</div>
            <div className={styles.quantity}>{props.item.quantity}x</div>
            {/* FIXME - Implement removal. */}
            <IoClose size={16} className={styles.closeIcon} stroke="#a7a7a7" fill="#a7a7a7" />
        </div>
    );
}
