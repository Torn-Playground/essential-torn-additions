import ReactLoading from "react-loading";
import { Theme } from "@common/components/themed-page/useTheme";
import { ThemeContext } from "@common/components/themed-page/ThemeContext";

interface LoadingIconProps {
    size: number;
    color?: string;
}

export default function LoadingIcon(props: LoadingIconProps) {
    if (props.color) {
        return <_LoadingIcon size={props.size} color={props.color} />;
    }

    const getColor = (theme: Theme) => {
        switch (theme) {
            case Theme.LIGHT:
                return "black";
            case Theme.DARK:
            default:
                return "white";
        }
    };

    return <ThemeContext.Consumer>{(context) => <_LoadingIcon size={props.size} color={getColor(context.theme)} />}</ThemeContext.Consumer>;
}

function _LoadingIcon(props: Required<LoadingIconProps>) {
    return <ReactLoading type="spin" color={props.color} height={props.size} width={props.size} />;
}
