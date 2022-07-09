import ReactLoading from "react-loading";
import { Theme, ThemeContext } from "../themed-page/ThemeContext";

interface LoadingIconProps {
    size: number;
}

export default function LoadingIcon(props: LoadingIconProps) {
    const getColor = (theme: Theme) => {
        switch (theme) {
            case Theme.LIGHT:
                return "black";
            case Theme.DARK:
            default:
                return "white";
        }
    };

    return (
        <ThemeContext.Consumer>
            {(context) => <ReactLoading type="spin" color={getColor(context.theme)} height={props.size} width={props.size} />}
        </ThemeContext.Consumer>
    );
}
