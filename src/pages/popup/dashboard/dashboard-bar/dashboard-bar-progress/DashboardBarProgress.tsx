import * as styles from "./DashboardBarProgress.module.scss";

interface DashboardBarProgressProps {
    currentValue: number;
    maxValue: number;
    color: string;
}

export default function DashboardBarProgress(props: DashboardBarProgressProps) {
    return (
        <div className={styles.progress}>
            <div className={styles.progressValue} style={{ width: `${(props.currentValue / props.maxValue) * 100}%`, backgroundColor: props.color }} />
        </div>
    );
}
