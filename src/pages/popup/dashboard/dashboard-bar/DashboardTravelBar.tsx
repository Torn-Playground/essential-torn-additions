import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import * as styles from "./DashboardBar.module.scss";
import { useState } from "react";
import DashboardTravelBarInfo from "@pages/popup/dashboard/dashboard-bar/dashboard-bar-info/DashboardTravelBarInfo";
import { useInterval } from "@pages/utilities/useInterval";

interface DashboardTravelBarProps {
    name: string;
    landingAt: EpochTimeStamp;
    departedAt: EpochTimeStamp;
    link: string;
    progressColor: string;
}

export default function DashboardTravelBar(props: DashboardTravelBarProps) {
    const [hover, setHover] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(Date.now() - props.departedAt);

    useInterval(() => {
        setCurrentProgress(Date.now() - props.departedAt);
    }, 1000);

    return (
        <a href={props.link} target="_blank" className={styles.bar} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <DashboardTravelBarInfo hover={hover} name={props.name} landingAt={props.landingAt} progressColor={props.progressColor} />
            <DashboardBarProgress currentValue={currentProgress} maxValue={props.landingAt - props.departedAt} color={props.progressColor} />
        </a>
    );
}
