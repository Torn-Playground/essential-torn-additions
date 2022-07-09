import * as styles from "./DashboardBarInfo.module.scss";
import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";

interface DashboardTravelBarInfoProps {
    hover: boolean;
    name: string;
    landingAt: EpochTimeStamp;
    progressColor: string;
}

export default function DashboardTravelBarInfo(props: DashboardTravelBarInfoProps) {
    const { timer, expired: landed } = useCountdownTimer(props.landingAt, true, true);

    const getFullText: () => string = () => {
        return landed ? "You've landed." : `Landing in ${timer}`;
    };

    return (
        <div>
            <span>{props.name}</span>
            <p className={styles.rightTimer}>{props.hover ? <strong>{getFullText()}</strong> : <span className={styles.timerMargin}>{timer}</span>}</p>
        </div>
    );
}
