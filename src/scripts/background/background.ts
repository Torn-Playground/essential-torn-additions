import { browser } from "webextension-polyfill-ts";
import { dataBucket, settingsBucket } from "@common/data/data";
import { updateUserdata } from "./updater";
import { createAlarm } from "./alarms";
import { AlarmType } from "./alarms.types";
import { handleCooldownNotification } from "./notifications/notifications";
import { Changes } from "@extend-chrome/storage";

// FIXME - Handle loading.
//  - only create alarm if there is an api key
// FIXME - Handle api change.
//  - on api added or changed: create alarm if it doesn't exist
//  - on api removed: remove alarm

createAlarm("updateUserdata", { periodInMinutes: 1 });
browser.alarms.onAlarm.addListener((alarm) => {
    if (!alarm.name) return;

    const type = alarm.name as AlarmType;

    switch (type) {
        case "updateUserdata":
            updateUserdata().catch(); // TODO - Handle error handling
            break;
        default:
            console.warn(`Received an unhandled alarm type '${type}'.`, alarm);
            break;
    }
});

browser.management.getSelf().then(async (info) => {
    console.log(`[ETA] Loading background for ${info.name} v${info.version}.`);

    await updateUserdata();
});

settingsBucket.changeStream.subscribe((value) => {
    console.log("[ETA] Settings changed: ", value);
});
dataBucket.changeStream.subscribe((changes) => {
    console.log("[ETA] Data changed: ", changes);

    if (hasDataChanged(changes, "cooldowns")) {
        handleCooldownNotification("notificationDrugCooldown", changes.cooldowns?.newValue?.drug);
    }
});

function hasDataChanged<T>(changes: Changes<T>, key: keyof T): boolean {
    const change = changes[key];

    if (typeof change === "undefined") {
        return false;
    }

    return JSON.stringify(change.oldValue) !== JSON.stringify(change.newValue);
}
