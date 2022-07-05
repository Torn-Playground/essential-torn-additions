import { useEffect, useState } from "react";
import { toMultipleDigits } from "@common/utilities";

type CountdownTimerValue = EpochTimeStamp | undefined;

interface CountdownTimerResult {
    timer: string;
    expired: boolean;
}

function _useCountdownTimer(value: CountdownTimerValue, showSeconds: boolean, showHours: boolean): CountdownTimerResult {
    const [intervalId, setIntervalId] = useState<number>();

    const [timer, setTimer] = useState("");
    const [expired, setExpired] = useState(false);

    const registerInterval = () => {
        const shouldExist = !!value;

        if (shouldExist && !intervalId) {
            setTimeout(() => {
                setIntervalId(setInterval(updateValue, 1000));
            }, 1010 - new Date().getUTCMilliseconds());
        } else if (!shouldExist && intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }
        updateValue();
    };
    const updateValue = () => {
        if (typeof value === "undefined") {
            setTimer("-- TODO");
            setExpired(true);
            return;
        }

        const date = new Date(value - Date.now());

        const parts: Array<number> = [];

        // TODO - days
        if (showHours) parts.push(date.getUTCHours());
        parts.push(date.getUTCMinutes());
        if (showSeconds) parts.push(date.getUTCSeconds());

        setTimer(parts.map((p) => toMultipleDigits(p)).join(":"));
        setExpired(false);
    };

    useEffect(() => {
        registerInterval();

        return () => clearInterval(intervalId);
    }, []);
    useEffect(registerInterval, [value]);

    return { timer, expired };
}

export function useCountdownTimer(value: CountdownTimerValue): CountdownTimerResult;
export function useCountdownTimer(value: CountdownTimerValue, showSeconds: boolean): CountdownTimerResult;
export function useCountdownTimer(value: CountdownTimerValue, showSeconds: boolean, showHours: boolean): CountdownTimerResult;
export function useCountdownTimer(value: CountdownTimerValue, showSeconds?: boolean, showHours?: boolean): CountdownTimerResult {
    return _useCountdownTimer(value, showSeconds ?? true, showHours ?? false);
}
