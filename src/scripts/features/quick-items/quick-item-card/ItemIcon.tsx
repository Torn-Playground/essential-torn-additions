import * as styles from "./QuickItemCard.module.scss";

export default function ItemIcon(props: { id: number }) {
    return <div className={styles.icon} style={{ backgroundImage: `url(/images/items/${props.id}/medium.png)` }}></div>;
}
