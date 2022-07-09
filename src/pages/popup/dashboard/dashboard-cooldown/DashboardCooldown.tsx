import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";
import * as styles from "./DashboardCooldown.module.scss";

interface DashboardCooldownProps {
    name: string;
    cooldown: EpochTimeStamp | undefined;
    link: string;
    color: string;
}

export default function DashboardCooldown(props: DashboardCooldownProps) {
    const { timer } = useCountdownTimer(props.cooldown, true, true);

    return (
        <a href={props.link} target="_blank" className={styles.cooldown}>
            <strong style={{ color: props.color }}>{props.name}</strong>
            <span className={styles.timerText}>{timer}</span>
        </a>
    );
}
