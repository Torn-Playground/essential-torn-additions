import { useEffect, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useInterval } from "@common/react-utilities/useInterval";

type CountdownTimerValue = EpochTimeStamp;

interface CountdownTimerResult {
    timer: string;
}

export function useDistanceTimer(value: CountdownTimerValue): CountdownTimerResult {
    const [timer, setTimer] = useState("");

    const updateValue = () => {
        setTimer(formatDistanceToNowStrict(value, { addSuffix: true }));
    };

    useEffect(updateValue, []);
    useEffect(updateValue, [value]);
    useInterval(updateValue, 1000);

    return { timer };
}
