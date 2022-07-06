import { useCountdownTimer } from "../../../utilities/useCountdownTimer";
import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import * as styles from "./DashboardBar.module.scss";
import { useState } from "react";

interface DashboardBarProps {
    name: string;
    currentValue: number;
    maxValue: number;
    tickTime: EpochTimeStamp;
    fullTime: EpochTimeStamp | undefined;
    link: string;
    progressColor: string;
}

// FIXME - rollover
export default function DashboardBar(props: DashboardBarProps) {
    const [hover, setHover] = useState(false);
    const { timer: tickTimer } = useCountdownTimer(props.tickTime);
    const { timer: fullTimer, expired: fullExpired } = useCountdownTimer(props.fullTime, true, true);

    const getFullText: () => string = () => {
        return fullExpired ? "FULL" : `Full in ${fullTimer}`;
    };

    return (
        <a href={props.link} target="_blank" className={styles.bar} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <div>
                <span>{props.name}</span>
                <p className={styles.rightTimer}>
                    {hover ? (
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

            <DashboardBarProgress currentValue={props.currentValue} maxValue={props.maxValue} color={props.progressColor} />
        </a>
    );
}
