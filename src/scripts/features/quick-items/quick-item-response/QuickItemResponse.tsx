import * as styles from "./QuickItemResponse.module.scss";
import LoadingIcon from "@common/components/loading-icon/LoadingIcon";
import classNames from "classnames";
import ResponseLinks from "@scripts/features/quick-items/quick-item-response/quick-item-response-links/ResponseLinks";
import { useEffect, useRef } from "react";
import { useInterval } from "@common/react-utilities/useInterval";
import { timerFormatter } from "@common/utilities/formatting";
import { TornQuickItemLink } from "@scripts/features/quick-items/quick-items.types";

interface QuickItemResponseProps {
    loading: boolean;
    success: boolean;
    response: string | undefined;
    onClose: () => void;
    links: Array<TornQuickItemLink>;
}

export default function QuickItemResponse(props: QuickItemResponseProps) {
    if (props.loading) {
        return (
            <div className={styles.quickLoading}>
                {/* FIXME - Change color depending on theme. */}
                <LoadingIcon size={32} color={"black"} />
            </div>
        );
    }

    if (!props.response) {
        return <></>;
    }

    return (
        <div className={classNames("action-wrap", "use-act", "use-action", styles.quickResponse)}>
            <form method="post" data-action="useItem">
                <ResponseText response={props.response} />
                <ResponseLinks
                    links={props.links.map((link) => ({ title: link.title, url: link.url, class: link.class, attributes: link.attr }))}
                    onClose={props.onClose}
                />
                <div className="clear" />
            </form>
        </div>
    );
}

interface ResponseTextProps {
    response: string;
}

function ResponseText(props: ResponseTextProps) {
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
