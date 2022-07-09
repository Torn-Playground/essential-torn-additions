import * as styles from "./DashboardBarInfo.module.scss";
import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";

interface DashboardChainBarInfoProps {
    hover: boolean;
    name: string;
    currentValue: number;
    maxValue: number;
    timeout: EpochTimeStamp | undefined;
    progressColor: string;
}

export default function DashboardChainBarInfo(props: DashboardChainBarInfoProps) {
    const { timer, expired } = useCountdownTimer(props.timeout);

    const getFullText: () => string = () => {
        if (expired) {
            // TODO - Implement chain cooldown.
            return "TODO - cooldown";
        }

        return timer;
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
                        <span className={styles.timerMargin}>{timer}</span>
                    </>
                )}
            </p>
        </div>
    );
}
