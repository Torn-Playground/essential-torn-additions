import * as styles from "./QuickItemResponse.module.scss";
import LoadingIcon from "@common/components/loading-icon/LoadingIcon";
import classNames from "classnames";
import ResponseLinks from "@scripts/features/quick-items/quick-item-response/quick-item-response-links/ResponseLinks";
import { TornQuickItemLink } from "@scripts/features/quick-items/quick-items.types";
import ResponseText from "@scripts/features/quick-items/quick-item-response/ResponseText";

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
        <div className={styles.quickResponse}>
            <div className={classNames("action-wrap", "use-act", "use-action")}>
                <form method="post" data-action="useItem">
                    <ResponseText response={props.response} />
                    <ResponseLinks
                        links={props.links.map((link) => ({ title: link.title, url: link.url, class: link.class, attributes: link.attr }))}
                        onClose={props.onClose}
                    />
                    <div className="clear" />
                </form>
            </div>
        </div>
    );
}
