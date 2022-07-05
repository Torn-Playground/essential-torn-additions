import { AlarmType } from "./alarms.types";
import { Alarms, browser } from "webextension-polyfill-ts";
import CreateAlarmInfoType = Alarms.CreateAlarmInfoType;

export function createAlarm(type: AlarmType, alarmInfo: CreateAlarmInfoType) {
    browser.alarms.create(type, alarmInfo);
}

export function cancelAlarms(type: AlarmType) {
    browser.alarms.clear(type).catch((reason) => console.error("Failed to cancel alarm.", reason));
}
