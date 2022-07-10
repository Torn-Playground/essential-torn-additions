import { browser } from "webextension-polyfill-ts";
import { triggerUserdataUpdate } from "./updater";
import { createAlarm } from "./alarms";
import { AlarmType } from "./alarms.types";

createAlarm("updateUserdata", { periodInMinutes: 1 });
browser.alarms.onAlarm.addListener((alarm) => {
    if (!alarm.name) return;

    const type = alarm.name as AlarmType;

    switch (type) {
        case "updateUserdata":
            triggerUserdataUpdate().catch(); // TODO - Handle error handling
            break;
        default:
            console.warn(`Received an unhandled alarm type '${type}'.`, alarm);
            break;
    }
});

browser.management.getSelf().then(async (info) => {
    console.log(`[ETA] Loading background for ${info.name} v${info.version}.`);

    await triggerUserdataUpdate();
});
