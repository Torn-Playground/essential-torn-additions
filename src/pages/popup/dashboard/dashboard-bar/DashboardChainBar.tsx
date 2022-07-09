import DashboardBarProgress from "./dashboard-bar-progress/DashboardBarProgress";
import * as styles from "./DashboardBar.module.scss";
import { useState } from "react";
import DashboardChainBarInfo from "@pages/popup/dashboard/dashboard-bar/dashboard-bar-info/DashboardChainBarInfo";
import { getNextChain } from "@pages/utilities/torn";

interface DashboardChainBarProps {
    name: string;
    currentValue: number;
    maximumValue: number;
    timeout: EpochTimeStamp | undefined;
    link: string;
    progressColor: string;
}

export default function DashboardChainBar(props: DashboardChainBarProps) {
    const [hover, setHover] = useState(false);

    const getMaxChain = () => {
        return Math.min(props.maximumValue, getNextChain(props.currentValue));
    };

    return (
        <a href={props.link} target="_blank" className={styles.bar} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
            <DashboardChainBarInfo
                hover={hover}
                name={props.name}
                currentValue={props.currentValue}
                maxValue={getMaxChain()}
                timeout={props.timeout}
                progressColor={props.progressColor}
            />
            <DashboardBarProgress currentValue={props.currentValue} maxValue={getMaxChain()} color={props.progressColor} />
        </a>
    );
}
