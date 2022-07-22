import DashboardIndicator from "@pages/popup/dashboard/dashboard-indicators/dashboard-indicator/DashboardIndicator";
import { ETAUserdata } from "@common/utilities/data/data.types";
import * as styles from "./DashboardIndicators.module.scss";
import { moneyFormatter } from "@common/utilities/formatting";
import { ThemeContext } from "@common/components/themed-page/ThemeContext";
import { Theme } from "@common/components/themed-page/useTheme";

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
                    <DashboardIndicator
                        name="Cash"
                        count={props.data.moneyOnHand}
                        link="https://www.torn.com/properties.php#/p=options&tab=vault"
                        formatter={moneyFormatter}
                    />
                </section>
            )}
        </ThemeContext.Consumer>
    );
}
