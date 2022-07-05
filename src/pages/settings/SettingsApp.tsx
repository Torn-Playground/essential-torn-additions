import { useCallback, useEffect, useState } from "react";
import { ETASettings } from "@common/data/data.types";
import { settingsBucket } from "@common/data/data";
import Option from "./option/Option";

export default function SettingsApp() {
    return (
        <>
            <h1>Settings</h1>
            <Settings />
        </>
    );
}

function Settings() {
    const [settings, setSettings] = useState<ETASettings>();

    const loadSettings = useCallback(() => {
        settingsBucket.get().then(setSettings);
    }, []);

    useEffect(loadSettings, []);

    if (!settings) {
        return <p>loading...</p>;
    }

    return (
        <Option
            label="Notification"
            defaultValue={false}
            value={settings.notifications?.types?.drugCooldown}
            onUpdate={loadSettings}
            path={["notifications", "types", "drugCooldown"]}
        />
    );
}
