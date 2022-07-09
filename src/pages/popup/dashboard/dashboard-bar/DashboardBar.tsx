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
    resetWhenOver?: boolean;
}

export default function DashboardBar(props: DashboardBarProps) {
    const [hover, setHover] = useState(false);

    const [tickTime, setTickTime] = useState(props.bar.ticktime);
    const [currentValue, setCurrentValue] = useState(props.bar.current);

    useEffect(() => setTickTime(props.bar.ticktime), [props.bar.ticktime]);
    useEffect(() => setCurrentValue(props.bar.current), [props.bar.current]);

    const { expired } = useCountdownTimer(tickTime);

    useEffect(() => {
        if (!expired) return;

        const timesOff = Math.ceil((Date.now() - tickTime) / (props.bar.interval * 1000));

        setTickTime((tickTime) => tickTime + props.bar.interval * 1000 * timesOff);
        setCurrentValue((currentValue) => {
            const newValue = currentValue + props.bar.increment * timesOff;

            if (newValue > props.bar.maximum) {
                if (props.resetWhenOver) {
                    return props.bar.maximum;
                }

                return currentValue;
            }

            return newValue;
        });
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
                resetWhenOver={props.resetWhenOver}
            />
            <DashboardBarProgress currentValue={props.bar.current} maxValue={props.bar.maximum} color={props.progressColor} />
        </a>
    );
}
