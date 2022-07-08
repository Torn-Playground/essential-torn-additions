import { useDistanceTimer } from "@pages/utilities/timers/useDistanceTimer";
import { updateUserdata } from "@scripts/background/updater";
import * as styles from "./DashboardUpdated.module.scss";

interface DashboardUpdatedProps {
    value: EpochTimeStamp;
}

export default function DashboardUpdated(props: DashboardUpdatedProps) {
    const { timer } = useDistanceTimer(props.value);

    return (
        <p onClick={updateUserdata} className={styles.updateTime}>
            Updated <strong>{timer}</strong>
        </p>
    );
}
