import { getBucket } from "@extend-chrome/storage";
import { ETAApiData, ETASettings, ETAUserdata } from "./data.types";
import { DEFAULT_SETTINGS } from "@common/data/default-data";

export const settingsBucket = getBucket<ETASettings>("settings");
export function updateSettings(path: string[], newValue: any) {
    settingsBucket
        .set((s) => {
            let settings: any = s;
            let defaultSettings: any = DEFAULT_SETTINGS;

            for (let i = 0; i < path.length - 1; i++) {
                const p = path[i];

                if (!(p in settings)) {
                    settings[p] = defaultSettings[p];
                }

                settings = settings[p];
                defaultSettings = defaultSettings[p];
            }

            const lastSplit = path[path.length - 1];
            settings[lastSplit] = newValue;

            return s;
        })
        .catch(() => console.error("Failed to save new settings."));
}

export const apiBucket = getBucket<ETAApiData>("api");

export const dataBucket = getBucket<ETAUserdata>("data");
