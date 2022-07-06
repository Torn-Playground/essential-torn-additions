import { useDistanceTimer } from "../../../utilities/timers/useDistanceTimer";
import { useEffect } from "react";

interface DashboardUpdatedProps {
    value: EpochTimeStamp;
}

{
    /* FIXME - update on click */
}
export default function DashboardUpdated(props: DashboardUpdatedProps) {
    const { timer } = useDistanceTimer(props.value);

    useEffect(() => {
        console.log("props changed", props.value);
    }, [props.value]);

    return (
        <p>
            Updated <strong>{timer}</strong>
        </p>
    );
}
