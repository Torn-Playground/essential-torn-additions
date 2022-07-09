import DashboardIndicator from "@pages/popup/dashboard/dashboard-indicators/dashboard-indicator/DashboardIndicator";
import { ETAUserdata } from "@common/data/data.types";
import { Theme, ThemeContext } from "@pages/common/themed-page/ThemeContext";
import * as styles from "./DashboardIndicators.module.scss";

interface DashboardIndicatorsProps {
    data: ETAUserdata;
}

export default function DashboardIndicators(props: DashboardIndicatorsProps) {
    const getBackgroundColor = (theme: Theme) => {
        switch (theme) {
            case Theme.LIGHT:
                return "#ececec";
            case Theme.DARK:
            default:
                return "#343434";
        }
    };

    return (
        <ThemeContext.Consumer>
            {(context) => (
                <section style={{ backgroundColor: getBackgroundColor(context.theme) }} className={styles.indicators}>
                    <DashboardIndicator name="Events" count={props.data.newEvents.length} link="https://www.torn.com/events.php" />
                    <DashboardIndicator name="Messages" count={props.data.newMessages.length} link="https://www.torn.com/messages.php" />
                </section>
            )}
        </ThemeContext.Consumer>
    );
}
