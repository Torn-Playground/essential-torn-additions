import { cancelAlarms, createAlarm } from "../alarms";
import { AlarmType } from "../alarms.types";

export function handleCooldownNotification(type: AlarmType, timestamp: EpochTimeStamp | undefined) {
    console.log("DKK handling cooldown notification", type, timestamp);

    if (timestamp) createAlarm(type, { when: timestamp });
    else cancelAlarms(type);
}

function scheduleNotification() {}
