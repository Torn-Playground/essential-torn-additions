import * as styles from "./QuickItemCard.module.scss";

export default function ItemQuantity(props: { quantity: number | undefined }) {
    if (props.quantity === undefined) {
        return <></>;
    }

    return <div className={styles.quantity}>{props.quantity}x</div>;
}
