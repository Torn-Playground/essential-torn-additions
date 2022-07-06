import * as styles from "./DashboardBarInfo.module.scss";
import { useCountdownTimer } from "../../../../utilities/timers/useCountdownTimer";

interface DashboardBarInfoProps {
    hover: boolean;
    name: string;
    currentValue: number;
    maxValue: number;
    tickTime: EpochTimeStamp;
    fullTime: EpochTimeStamp | undefined;
    progressColor: string;
}

export default function DashboardBarInfo(props: DashboardBarInfoProps) {
    const { timer: tickTimer } = useCountdownTimer(props.tickTime);
    const { timer: fullTimer, expired: fullExpired } = useCountdownTimer(props.fullTime, true, true);

    const getFullText: () => string = () => {
        return fullExpired ? "FULL" : `Full in ${fullTimer}`;
    };

    return (
        <div>
            <span>{props.name}</span>
            <p className={styles.rightTimer}>
                {props.hover ? (
                    <strong>{getFullText()}</strong>
                ) : (
                    <>
                        <span>
                            {props.currentValue}/{props.maxValue}
                        </span>
                        <span className={styles.timerMargin}>{tickTimer}</span>
                    </>
                )}
            </p>
        </div>
    );
}
