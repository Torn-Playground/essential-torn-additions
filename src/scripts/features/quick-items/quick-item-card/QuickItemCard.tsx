import { QuickItem, TornQuickItemResponse } from "@scripts/features/quick-items/quick-items.types";
import * as styles from "./QuickItemCard.module.scss";
import { IoClose } from "react-icons/all";
import classNames from "classnames";
import { useItemQuickly } from "@scripts/features/quick-items/quick-items";

interface QuickItemCardProps {
    item: QuickItem;
    onRemove: () => void;
    onLoading: () => void;
    onResponse: (response: TornQuickItemResponse | { error: string }) => void;
}

export default function QuickItemCard(props: QuickItemCardProps) {
    const useItem = () => {
        props.onLoading();
        useItemQuickly(props.item)
            .then((response) => props.onResponse(response))
            .catch((reason) => props.onResponse({ error: `Failed to use your item. Reason: '${reason}'.` }));
    };

    // FIXME - Style equipable item.
    // FIXME - Allow reordering of items.
    return (
        <div className={classNames(styles.quickItem)} onClick={useItem}>
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
