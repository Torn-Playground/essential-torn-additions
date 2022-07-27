import classNames from "classnames";

interface CloseLinkProps {
    onClose: () => void;
}

export function CloseLink(props: CloseLinkProps) {
    return (
        <a className={classNames("t-blue", "h", "close-act")} href="#" onClick={props.onClose}>
            Close
        </a>
    );
}
