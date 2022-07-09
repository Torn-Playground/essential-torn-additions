import { fetchData } from "@common/api";
import { dataBucket } from "@common/data/data";
import { UserBar, UserBars, UserCooldowns, UserTravel } from "@common/api/user.types";
import { ApiTimestamp } from "@common/api/api.types";
import { BarData } from "@common/data/data.types";

export async function updateUserdata() {
    const { timestamp, cooldowns, travel, ...userdata } = await fetchData<ApiTimestamp & UserCooldowns & UserBars & UserTravel>("user", [
        "timestamp",
        "cooldowns",
        "bars",
        "travel",
    ]);

    await dataBucket.set({
        cooldowns: {
            drug: getTimestampFromSeconds(timestamp, cooldowns.drug),
            booster: getTimestampFromSeconds(timestamp, cooldowns.booster),
            medical: getTimestampFromSeconds(timestamp, cooldowns.medical),
        },
        energy: getBarData(userdata.energy, timestamp),
        nerve: getBarData(userdata.nerve, timestamp),
        happy: getBarData(userdata.happy, timestamp),
        life: getBarData(userdata.life, timestamp),
        lastUpdate: getTimestamp(timestamp),
        travel: {
            destination: travel.destination,
            timestamp: getTimestamp(travel.timestamp),
            departed: getTimestamp(travel.departed),
            timeLeft: travel.time_left > 0 ? travel.time_left : undefined,
        },
    });
}

function getTimestamp(timestamp: number): EpochTimeStamp {
    return timestamp * 1000;
}

function getTimestampFromSeconds(timestamp: number, cooldown: number): EpochTimeStamp | undefined {
    if (cooldown === 0) {
        return undefined;
    }

    return (timestamp + cooldown) * 1000;
}

function getBarData(bar: UserBar, timestamp: EpochTimeStamp): BarData {
    return {
        current: bar.current,
        maximum: bar.maximum,
        ticktime: getTimestampFromSeconds(timestamp, bar.ticktime) as EpochTimeStamp,
        fulltime: getTimestampFromSeconds(timestamp, bar.fulltime),
        interval: bar.interval,
        increment: bar.increment,
    };
}
