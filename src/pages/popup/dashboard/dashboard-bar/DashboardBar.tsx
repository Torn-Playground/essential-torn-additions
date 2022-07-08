import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import DashboardBarInfo from "./dashboard-bar-info/DashboardBarInfo";
import * as styles from "./DashboardBar.module.scss";
import { useEffect, useState } from "react";
import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";
import { BarData } from "@common/data/data.types";

interface DashboardBarProps {
    name: string;
    bar: BarData;
    link: string;
    progressColor: string;
}

export default function DashboardBar(props: DashboardBarProps) {
    const [hover, setHover] = useState(false);

    const [tickTime, setTickTime] = useState(props.bar.ticktime);
    const [currentValue, setCurrentValue] = useState(props.bar.current);

    useEffect(() => setTickTime(props.bar.ticktime), [props.bar.ticktime]);
    useEffect(() => setCurrentValue(props.bar.current), [props.bar.current]);

    const { expired } = useCountdownTimer(props.bar.ticktime);

    useEffect(() => {
        if (!expired) return;

        setTickTime((tickTime) => tickTime + props.bar.interval * 1000);
        setCurrentValue((currentValue) => currentValue + props.bar.increment);
    }, [expired]);

    return (
        <a href={props.link} target="_blank" className={styles.bar} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <DashboardBarInfo
                hover={hover}
                name={props.name}
                currentValue={currentValue}
                maxValue={props.bar.maximum}
                tickTime={tickTime}
                fullTime={props.bar.fulltime}
                progressColor={props.progressColor}
            />
            <DashboardBarProgress currentValue={props.bar.current} maxValue={props.bar.maximum} color={props.progressColor} />
        </a>
    );
}
