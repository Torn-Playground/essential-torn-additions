import { ETAApiData, ETASettings, ETAUserdata } from "@common/utilities/data/data.types";
import { Bucket } from "@extend-chrome/storage";
import merge from "ts-deepmerge";
import { apiBucket, settingsBucket, userdataBucket } from "@common/utilities/data/data";

export const DEFAULT_SETTINGS: ETASettings = {
    notifications: {
        types: {
            drugCooldown: true,
            boosterCooldown: true,
        },
    },
};
const DEFAULT_API_DATA: ETAApiData = {
    apiKey: undefined,
};
const DEFAULT_USERDATA: ETAUserdata = {
    cooldowns: {
        drug: undefined,
        booster: undefined,
        medical: undefined,
    },
    energy: {
        current: 0,
        maximum: 0,
        ticktime: 0,
        fulltime: undefined,
        interval: 0,
        increment: 0,
    },
    nerve: {
        current: 0,
        maximum: 0,
        ticktime: 0,
        fulltime: undefined,
        interval: 0,
        increment: 0,
    },
    happy: {
        current: 0,
        maximum: 0,
        ticktime: 0,
        fulltime: undefined,
        interval: 0,
        increment: 0,
    },
    life: {
        current: 0,
        maximum: 0,
        ticktime: 0,
        fulltime: undefined,
        interval: 0,
        increment: 0,
    },
    lastUpdate: 0,
    travel: {
        destination: "",
        timestamp: 0,
        departed: 0,
        timeLeft: undefined,
    },
    newEvents: [],
    newMessages: [],
    status: {
        description: "",
        state: "",
        color: "",
        until: undefined,
    },
    chain: {
        current: 0,
        maximum: 10,
        timeout: undefined,
        cooldown: 0,
    },
    moneyOnHand: 0,
};

async function fillStorage<T extends object>(bucket: Bucket<T>, defaultData: T): Promise<T> {
    return await bucket.set((data) => {
        return merge.withOptions({ mergeArrays: false }, defaultData, data) as T;
    });
}

export const fillSettings = () => fillStorage(settingsBucket, DEFAULT_SETTINGS);
export const fillApiData = () => fillStorage(apiBucket, DEFAULT_API_DATA);
export const fillUserdata = () => fillStorage(userdataBucket, DEFAULT_USERDATA);
