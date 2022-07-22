import * as styles from "./DashboardIndicator.module.scss";
import { commaFormatter, NumberFormatter } from "@common/utilities/formatting";

interface DashboardIndicatorProps {
    name: string;
    count: number;
    link: string;
    formatter?: NumberFormatter;
}

export default function DashboardIndicator(props: DashboardIndicatorProps) {
    return (
        <a href={props.link} target="_blank" className={styles.indicator}>
            <span>{props.name}: </span>
            <span>{(props.formatter || commaFormatter)(props.count)}</span>
        </a>
    );
}
