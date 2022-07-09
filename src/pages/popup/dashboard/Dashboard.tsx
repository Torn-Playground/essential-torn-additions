import { useData } from "../../utilities/useData";
import { dataBucket } from "@common/data/data";
import PopupBox from "../popup-box/PopupBox";
import Message from "../../common/message/Message";
import DashboardCooldown from "./dashboard-cooldown/DashboardCooldown";
import LoadingIcon from "../../common/loading-icon/LoadingIcon";
import * as styles from "./Dashboard.module.scss";
import DashboardBar from "./dashboard-bar/DashboardBar";
import DashboardUpdated from "./dashboard-updated/DashboardUpdated";
import DashboardTravelBar from "@pages/popup/dashboard/dashboard-bar/DashboardTravelBar";
import DashboardIndicators from "@pages/popup/dashboard/dashboard-indicators/DashboardIndicators";
import DashboardStatus from "@pages/popup/dashboard/dashboard-status/DashboardStatus";
import DashboardChainBar from "@pages/popup/dashboard/dashboard-bar/DashboardChainBar";
import { useCountdownTimer } from "@pages/utilities/timers/useCountdownTimer";

export default function Dashboard() {
    const { data, loading, error } = useData(dataBucket, true);

    const { expired: chainExpired } = useCountdownTimer(data?.chain.timeout);

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
            {/* FIXME - Settings link */}
            <DashboardStatus data={data} />

            <section className={styles.barWrapper}>
                <DashboardBar name="Energy" bar={data.energy} link="https://www.torn.com/gym.php" progressColor="#56ad1e" />
                <DashboardBar name="Nerve" bar={data.nerve} link="https://www.torn.com/crimes.php" progressColor="#cc4b2d" />
                <DashboardBar name="Happy" bar={data.happy} link="https://www.torn.com/properties.php" progressColor="#ccb62a" resetWhenOver={true} />
                <DashboardBar name="Life" bar={data.life} link="https://www.torn.com/item.php#medical-items" progressColor="#3f43cf" />
                {data.chain.current > 0 ? (
                    <DashboardChainBar
                        name="Chain"
                        currentValue={data.chain.current}
                        maximumValue={data.chain.maximum}
                        timeout={data.chain.timeout}
                        link="https://www.torn.com/factions.php?step=your"
                        progressColor="#6b6b6b"
                    />
                ) : undefined}
                {typeof data.travel.timeLeft !== "undefined" ? (
                    <DashboardTravelBar
                        name="Travelling"
                        landingAt={data.travel.timestamp}
                        departedAt={data.travel.departed}
                        link="https://www.torn.com/index.php"
                        progressColor="#cf62be"
                    />
                ) : undefined}
            </section>
            <section className={styles.cooldownWrapper}>
                <DashboardCooldown name="Drugs" cooldown={data.cooldowns.drug} link="https://www.torn.com/item.php#drugs-items" color="#32b72e" />
                <DashboardCooldown name="Boosters" cooldown={data.cooldowns.booster} link="https://www.torn.com/item.php#boosters-items" color="#f17827" />
                <DashboardCooldown name="Medical" cooldown={data.cooldowns.medical} link="https://www.torn.com/item.php#medical-items" color="#5783fd" />
            </section>

            <DashboardIndicators data={data} />

            <DashboardUpdated value={data.lastUpdate} />
        </>
    );
}
