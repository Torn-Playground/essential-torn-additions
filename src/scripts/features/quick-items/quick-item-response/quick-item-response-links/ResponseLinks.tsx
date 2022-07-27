import { CloseLink } from "@scripts/features/quick-items/quick-item-response/quick-item-response-links/CloseLink";
import classNames from "classnames";

interface ResponseLinksProps {
    links: Array<ResponseLinkProps>;
    onClose: () => void;
}

export default function ResponseLinks(props: ResponseLinksProps) {
    return (
        <p>
            <CloseLink onClose={props.onClose} />
            {props.links.map((link) => (
                <ResponseLink {...link} key={link.title} />
            ))}
        </p>
    );
}

interface ResponseLinkProps {
    class: string;
    url: string;
    title: string;
    attributes: string;
}

function ResponseLink(props: ResponseLinkProps) {
    return (
        <a
            className={classNames("t-blue", "h", "m-left10", props.class)}
            href={props.url}
            {...props.attributes
                .split(" ")
                .filter((x) => !!x)
                .map((x) => x.split("="))
                .reduce((previousValue, currentValue) => ({ ...previousValue, [currentValue[0]]: currentValue[1] }), {})}
        >
            {props.title}
        </a>
    );
}
