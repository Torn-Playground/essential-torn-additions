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
        const parts: Array<number> = [];

        const now = Date.now();
        let hours: number, minutes: number, seconds: number;
        if (typeof value === "undefined") {
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else if (value < now) {
            // TODO - handle value < now
            setTimer("-- TODO (value < now)");
            setExpired(true);
            return;
        } else {
            const date = new Date(value - now);

            hours = date.getUTCHours();
            minutes = date.getUTCMinutes();
            seconds = date.getUTCSeconds();
        }

        // TODO - days
        if (showHours) parts.push(hours);
        parts.push(minutes);
        if (showSeconds) parts.push(seconds);

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
