import { useEffect, useState } from "react";
import * as styles from "./DashboardStatusState.module.scss";

interface DashboardStatusStateProps {
    state: string;
    color: string;
}

export default function DashboardStatusState(props: DashboardStatusStateProps) {
    const [colorClass, setColorClass] = useState(styles.greenState);

    useEffect(() => {
        switch (props.color) {
            case "red":
                setColorClass(styles.redState);
                break;
            case "orange":
                setColorClass(styles.orangeState);
                break;
            case "green":
            default:
                setColorClass(styles.greenState);
                break;
        }
    }, [props.color]);

    // FIXME - implement
    return <h3 className={colorClass}>{props.state}</h3>;
}
