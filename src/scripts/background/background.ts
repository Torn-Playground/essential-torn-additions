import { browser } from "webextension-polyfill-ts";
import { createAlarm } from "./alarms";
import { AlarmType } from "./alarms.types";
import { fillApiData, fillSettings, fillUserdata } from "@common/data/default-data";
import { triggerUserdataUpdate } from "@scripts/background/updater";

createAlarm("updateUserdata", { periodInMinutes: 1 });
browser.alarms.onAlarm.addListener((alarm) => {
    if (!alarm.name) return;

    const type = alarm.name as AlarmType;

    switch (type) {
        case "updateUserdata":
            triggerUserdataUpdate().catch((reason) => console.error("Failed to update userdata.", reason));
            break;
        default:
            console.warn(`Received an unhandled alarm type '${type}'.`, alarm);
            break;
    }
});

browser.management.getSelf().then(async (info) => {
    console.log(`[ETA] Loading background for ${info.name} v${info.version}.`);

    fillSettings().catch((reason) => console.error("Failed to fill settings.", reason));
    fillApiData().catch((reason) => console.error("Failed to fill settings.", reason));
    fillUserdata()
        .then(() => {
            triggerUserdataUpdate().catch((reason) => console.error("Failed to update userdata.", reason));
        })
        .catch((reason) => console.error("Failed to fill userdata.", reason));
});
