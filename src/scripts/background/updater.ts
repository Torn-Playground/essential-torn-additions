import { fetchData } from "@common/api";
import { dataBucket } from "@common/data/data";
import { UserBar, UserBars, UserCooldowns, UserNewEvent, UserNewEvents, UserNewMessage, UserNewMessages, UserTravel } from "@common/api/user.types";
import { ApiTimestamp } from "@common/api/api.types";
import { BarData } from "@common/data/data.types";

export async function updateUserdata() {
    const { timestamp, cooldowns, travel, events, messages, ...userdata } = await fetchData<
        ApiTimestamp & UserCooldowns & UserBars & UserTravel & UserNewEvents & UserNewMessages
    >("user", ["timestamp", "cooldowns", "bars", "travel", "newevents", "newmessages"]);

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
        newEvents: convertEvents(events),
        newMessages: convertMessages(messages),
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

function convertEvents(events: { [id: string]: UserNewEvent }): { event: string }[] {
    return Object.entries(events).map(([, value]) => {
        return { event: value.event };
    });
}

function convertMessages(messages: { [id: string]: UserNewMessage }): { title: string }[] {
    return Object.entries(messages).map(([, value]) => {
        return { title: value.title };
    });
}
