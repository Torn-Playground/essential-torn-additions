import * as styles from "./QuickItemCard.module.scss";

export default function ItemName(props: { name: string }) {
    return <div className={styles.title}>{props.name}</div>;
}
