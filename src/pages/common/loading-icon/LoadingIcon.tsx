import ReactLoading from "react-loading";
import { Theme, ThemeContext } from "../themed-page/ThemeContext";

interface LoadingIconProps {
    size: number;
}

export default function LoadingIcon(props: LoadingIconProps) {
    const getColor = (theme: Theme) => {
        switch (theme) {
            case Theme.DARK:
                return "white";
            case Theme.LIGHT:
            default:
                return "black";
        }
    };

    return (
        <ThemeContext.Consumer>
            {(context) => <ReactLoading type="spin" color={getColor(context.theme)} height={props.size} width={props.size} />}
        </ThemeContext.Consumer>
    );
}
