import { QuickItem } from "@scripts/features/quick-items/quick-items.types";
import * as styles from "./QuickItemCard.module.scss";
import { IoClose } from "react-icons/all";
import classNames from "classnames";

interface QuickItemCardProps {
    item: QuickItem;
    temporary?: boolean;
    onRemove: () => void;
}

export default function QuickItemCard(props: QuickItemCardProps) {
    const useItem = () => {
        // FIXME - Use item on click.
        console.log("DKK use quick item", props.item);
    };

    // FIXME - Style temporary item.
    // FIXME - Implement equipable item.

    // FIXME - Show  on hover.
    // FIXME - Allow reordering of items.
    return (
        <div className={classNames(styles.quickItem, { TEMP: props.temporary })} onClick={useItem}>
            <div className={styles.icon} style={{ backgroundImage: `url(/images/items/${props.item.id}/medium.png)` }}></div>
            <div className={styles.title}>{props.item.name}</div>
            {props.item.quantity && <div className={styles.quantity}>{props.item.quantity}x</div>}
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
        </div>
    );
}
