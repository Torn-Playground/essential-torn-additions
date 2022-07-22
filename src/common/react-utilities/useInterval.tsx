import { useEffect, useRef } from "react";

export function useInterval(callback: Function, delay: number) {
    const savedCallback = useRef<Function>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (typeof savedCallback.current === "undefined") {
                return;
            }

            savedCallback.current();
        }

        if (delay !== null) {
            let id: number;
            setTimeout(() => {
                id = setInterval(tick, delay);
            }, 1000 - (Date.now() % 1000));

            return () => clearInterval(id);
        }
    }, [delay]);
}
