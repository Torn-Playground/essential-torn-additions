import { useEffect, useRef } from "react";
import { timerFormatter } from "@common/utilities/formatting";
import { useInterval } from "@common/react-utilities/useInterval";

interface ResponseTextProps {
    response: string;
}

export default function ResponseText(props: ResponseTextProps) {
    const node = useRef<HTMLParagraphElement>(null);

    const updateDeadline = (counter: HTMLElement) => {
        if (!counter.dataset["eta_deadline"]) return;

        const date = new Date(parseInt(counter.dataset["eta_deadline"]) - Date.now());
        counter.textContent = timerFormatter([(date.getUTCDate() - 1) * 24 + date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]);
    };

    useEffect(() => {
        const counter = node.current?.querySelector(".counter-wrap") as HTMLElement;
        if (!counter || !counter.dataset.time) return;

        counter.dataset["eta_deadline"] = (Date.now() + parseInt(counter.dataset.time) * 1000).toString();
        updateDeadline(counter);
    }, [node.current]);
    useInterval(() => {
        const counter = node.current?.querySelector(".counter-wrap") as HTMLElement;
        if (!counter || !counter.dataset["eta_deadline"]) return;

        updateDeadline(counter);
    }, 1000);

    return <p dangerouslySetInnerHTML={{ __html: props.response }} ref={node} />;
}
