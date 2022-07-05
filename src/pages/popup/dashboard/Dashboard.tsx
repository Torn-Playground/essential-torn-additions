import { useData } from "../../utilities/useData";
import { dataBucket } from "@common/data/data";
import PopupBox from "../popup-box/PopupBox";
import Message from "../../common/message/Message";
import DashboardCooldown from "./dashboard-cooldown/DashboardCooldown";
import LoadingIcon from "../../common/loading-icon/LoadingIcon";
import * as styles from "./Dashboard.module.scss";
import DashboardBar from "./dashboard-bar/DashboardBar";

function DashboardLocation() {
    return <p>Torn</p>; // FIXME - implement
}

function DashboardStatus() {
    return <p>Okay</p>; // FIXME - implement
}

export default function Dashboard() {
    const { data, loading, error } = useData(dataBucket, true);

    if (loading) {
        return (
            <div className={styles.loadingWrapper}>
                <LoadingIcon size={32} />
            </div>
        );
    }

    if (error || typeof data === "undefined") {
        return (
            <PopupBox minWidth={320}>
                <Message text="Something went wrong when loading the popup, please try again or report this." type="error" />
            </PopupBox>
        );
    }

    return (
        <>
            <DashboardLocation />
            <DashboardStatus />

            <section className={styles.barWrapper}>
                <DashboardBar
                    name="Energy"
                    currentValue={data.energy.current}
                    maxValue={data.energy.maximum}
                    tickTime={data.energy.ticktime}
                    fullTime={data.energy.fulltime}
                    link="https://www.torn.com/gym.php"
                    progressColor="#56ad1e"
                />
            </section>
            <section>
                <DashboardCooldown name="Drugs" cooldown={data.cooldowns.drug} />
                <DashboardCooldown name="Boosters" cooldown={data.cooldowns.booster} />
                <DashboardCooldown name="Medical" cooldown={data.cooldowns.medical} />
            </section>
        </>
    ); // FIXME - Include the dashboard.
}
