import * as styles from "./DashboardIndicator.module.scss";

interface DashboardIndicatorProps {
    name: string;
    count: number;
    link: string;
}

export default function DashboardIndicator(props: DashboardIndicatorProps) {
    return (
        <a href={props.link} target="_blank" className={styles.indicator}>
            <span>{props.name}: </span>
            <span>{props.count}</span>
        </a>
    );
}
