import { useEffect, useState } from "react";
import { toMultipleDigits } from "@common/utilities";
import { useInterval } from "../useInterval";

type CountdownTimerValue = EpochTimeStamp | undefined;

interface CountdownTimerResult {
    timer: string;
    expired: boolean;
}

function _useCountdownTimer(value: CountdownTimerValue, showSeconds: boolean, showHours: boolean): CountdownTimerResult {
    const [timer, setTimer] = useState("");
    const [expired, setExpired] = useState(false);

    const updateValue = () => {
        if (typeof value === "undefined") {
            // TODO - handle none existing timer
            setTimer("-- TODO (undefined)");
            setExpired(true);
            return;
        }

        const now = Date.now();
        if (value < now) {
            // TODO - handle value < now
            setTimer("-- TODO (value < now)");
            setExpired(true);
            return;
        }

        const date = new Date(value - now);

        const parts: Array<number> = [];

        // TODO - days
        if (showHours) parts.push(date.getUTCHours());
        parts.push(date.getUTCMinutes());
        if (showSeconds) parts.push(date.getUTCSeconds());

        setTimer(parts.map((p) => toMultipleDigits(p)).join(":"));
        setExpired(false);
    };

    useEffect(updateValue, []);
    useEffect(updateValue, [value]);
    useInterval(updateValue, 1000);

    return { timer, expired };
}

export function useCountdownTimer(value: CountdownTimerValue): CountdownTimerResult;
export function useCountdownTimer(value: CountdownTimerValue, showSeconds: boolean, showHours: boolean): CountdownTimerResult;
export function useCountdownTimer(value: CountdownTimerValue, showSeconds?: boolean, showHours?: boolean): CountdownTimerResult {
    return _useCountdownTimer(value, showSeconds ?? true, showHours ?? false);
}
