import { useCountdownTimer } from "../../../utilities/useCountdownTimer";
import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import * as styles from "./DashboardBar.module.scss";

interface DashboardBarProps {
    name: string;
    currentValue: number;
    maxValue: number;
    tickTime: EpochTimeStamp;
    fullTime: EpochTimeStamp | undefined;
    link: string;
    progressColor: string;
}

export default function DashboardBar(props: DashboardBarProps) {
    const { timer: tickTimer } = useCountdownTimer(props.tickTime);
    const { timer: fullTimer, expired: fullExpired } = useCountdownTimer(props.fullTime, true, true);

    const getFullText: () => string = () => {
        return fullExpired ? "FULL" : `Full in ${fullTimer}`;
    };

    // FIXME - implement
    // - design
    // - on hover full text
    return (
        <a href={props.link} target="_blank" data-full={getFullText()} className={styles.bar}>
            <div>
                <span>{props.name}</span>

                <p className={styles.rightTimer}>
                    <span>
                        {props.currentValue}/{props.maxValue}
                    </span>
                    <span className={styles.timerMargin}>{tickTimer}</span>
                </p>
            </div>

            <DashboardBarProgress currentValue={props.currentValue} maxValue={props.maxValue} color={props.progressColor} />
        </a>
    );
}
