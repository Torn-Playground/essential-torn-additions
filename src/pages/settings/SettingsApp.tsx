import { useCallback, useEffect, useState } from "react";
import { ETASettings } from "@common/utilities/data/data.types";
import { settingsBucket } from "@common/utilities/data/data";
import Option from "./option/Option";

export default function SettingsApp() {
    return (
        <section style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <div>
                <h1>W.I.P.</h1>
                <p>Coming soon, currently only the popup is available.</p>
            </div>
        </section>
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
