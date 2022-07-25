import { QuickItem } from "@scripts/features/quick-items/quick-items.types";
import * as styles from "./QuickItemCard.module.scss";
import { IoClose } from "react-icons/all";
import classNames from "classnames";
import { getRFC } from "@common/utilities/utilities";

interface QuickItemCardProps {
    item: QuickItem;
    onRemove: () => void;
}

interface XResponse {
    success: boolean;
    text: string;
}

function useItemQuickly(id: number) {
    // FIXME - Rework function.
    const body = new URLSearchParams();
    // body.set("step", "actionForm")
    // body.set("confirm", "1")
    // body.set("action", "equip")
    // body.set("id", xid);

    body.set("step", "useItem");
    body.set("id", id.toString());
    body.set("itemID", id.toString());

    const params = new URLSearchParams();
    params.set("rfcv", getRFC());

    fetch(`https://www.torn.com/item.php?${params}`, { method: "POST", headers: { "x-requested-with": "XMLHttpRequest" }, body })
        .then((response) => response.json() as Promise<XResponse>)
        .then((response) => console.log("DKK use item", response, response.success, response.text))
        .catch((reason) => console.warn("DKK failed to use item", reason));
}

export default function QuickItemCard(props: QuickItemCardProps) {
    const useItem = () => {
        // FIXME - Use item on click.
        // FIXME - Implement equipable item.
        console.log("DKK use quick item", props.item);
        useItemQuickly(props.item.id);
    };

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
