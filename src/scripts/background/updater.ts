import { fetchData } from "@common/api";
import { dataBucket } from "@common/data/data";
import { UserBars, UserCooldowns } from "@common/api/user.types";
import { ApiTimestamp } from "@common/api/api.types";

export async function updateUserdata() {
    const { timestamp, cooldowns, ...userdata } = await fetchData<ApiTimestamp & UserCooldowns & UserBars>("user", ["timestamp", "cooldowns", "bars"]);

    await dataBucket.set({
        cooldowns: {
            drug: getTimestampFromSeconds(timestamp, cooldowns.drug),
            booster: getTimestampFromSeconds(timestamp, cooldowns.booster),
            medical: getTimestampFromSeconds(timestamp, cooldowns.medical),
        },
        energy: {
            current: userdata.energy.current,
            maximum: userdata.energy.maximum,
            ticktime: getTimestampFromSeconds(timestamp, userdata.energy.ticktime) as EpochTimeStamp,
            fulltime: getTimestampFromSeconds(timestamp, userdata.energy.fulltime),
        },
        nerve: {
            current: userdata.nerve.current,
            maximum: userdata.nerve.maximum,
            ticktime: getTimestampFromSeconds(timestamp, userdata.nerve.ticktime) as EpochTimeStamp,
            fulltime: getTimestampFromSeconds(timestamp, userdata.nerve.fulltime),
        },
        lastUpdate: getTimestamp(timestamp),
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
