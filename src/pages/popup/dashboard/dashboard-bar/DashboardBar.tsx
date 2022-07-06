import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import DashboardBarInfo from "./dashboard-bar-info/DashboardBarInfo";
import * as styles from "./DashboardBar.module.scss";
import { useEffect, useState } from "react";
import { useCountdownTimer } from "../../../utilities/timers/useCountdownTimer";

interface DashboardBarProps {
    name: string;
    currentValue: number;
    maxValue: number;
    tickTime: EpochTimeStamp;
    fullTime: EpochTimeStamp | undefined;
    interval: number;
    increment: number;
    link: string;
    progressColor: string;
}

export default function DashboardBar(props: DashboardBarProps) {
    const [hover, setHover] = useState(false);

    const [tickTime, setTickTime] = useState(props.tickTime);
    const [currentValue, setCurrentValue] = useState(props.currentValue);

    useEffect(() => setTickTime(props.tickTime), [props.tickTime]);
    useEffect(() => setCurrentValue(props.currentValue), [props.currentValue]);

    const { expired } = useCountdownTimer(props.tickTime);

    useEffect(() => {
        if (!expired) return;

        setTickTime((tickTime) => tickTime + props.interval * 1000);
        setCurrentValue((currentValue) => currentValue + props.increment);
    }, [expired]);

    return (
        <a href={props.link} target="_blank" className={styles.bar} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <DashboardBarInfo
                hover={hover}
                name={props.name}
                currentValue={currentValue}
                maxValue={props.maxValue}
                tickTime={tickTime}
                fullTime={props.fullTime}
                progressColor={props.progressColor}
            />
            <DashboardBarProgress currentValue={props.currentValue} maxValue={props.maxValue} color={props.progressColor} />
        </a>
    );
}
