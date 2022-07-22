import * as styles from "./DashboardCooldown.module.scss";
import { useCountdownTimer } from "@common/react-utilities/timers/useCountdownTimer";

interface DashboardCooldownProps {
    name: string;
    cooldown: EpochTimeStamp | undefined;
    link: string;
    color: string;
}

export default function DashboardCooldown(props: DashboardCooldownProps) {
    const { timer } = useCountdownTimer(props.cooldown, { showSeconds: true, showHours: true, transferDays: true });

    return (
        <a href={props.link} target="_blank" className={styles.cooldown}>
            <strong style={{ color: props.color }}>{props.name}</strong>
            <span className={styles.timerText}>{timer}</span>
        </a>
    );
}
