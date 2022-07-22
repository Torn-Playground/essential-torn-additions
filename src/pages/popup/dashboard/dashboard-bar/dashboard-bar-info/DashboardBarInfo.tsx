import * as styles from "./DashboardBarInfo.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useCountdownTimer } from "@common/react-utilities/timers/useCountdownTimer";

interface DashboardBarInfoProps {
    hover: boolean;
    name: string;
    currentValue: number;
    maxValue: number;
    tickTime: EpochTimeStamp;
    fullTime: EpochTimeStamp | undefined;
    progressColor: string;
    resetWhenOver?: boolean;
}

export default function DashboardBarInfo(props: DashboardBarInfoProps) {
    const { timer: tickTimer } = useCountdownTimer(props.tickTime);
    const { timer: fullTimer, expired: fullExpired } = useCountdownTimer(props.fullTime, true, true);
    const [willReset, setWillReset] = useState(false);

    const getFullText: () => string = () => {
        if (willReset) {
            return `Resets in ${tickTimer}`;
        }

        return fullExpired ? "FULL" : `Full in ${fullTimer}`;
    };

    useEffect(() => {
        setWillReset(!!props.resetWhenOver && props.currentValue > props.maxValue);
    }, [props.resetWhenOver, props.currentValue, props.maxValue]);

    return (
        <div>
            <span>{props.name}</span>
            <p className={styles.rightTimer}>
                {props.hover ? (
                    <strong className={classNames({ [styles.willReset]: willReset })}>{getFullText()}</strong>
                ) : (
                    <>
                        <span>
                            {props.currentValue}/{props.maxValue}
                        </span>
                        <span className={classNames(styles.timerMargin, { [styles.willReset]: willReset })}>{tickTimer}</span>
                    </>
                )}
            </p>
        </div>
    );
}
