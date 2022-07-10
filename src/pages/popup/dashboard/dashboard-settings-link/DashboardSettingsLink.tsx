import { browser, Manifest } from "webextension-polyfill-ts";
import { useEffect, useState } from "react";

export default function DashboardSettingsLink() {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
        const manifest = browser.runtime.getManifest() as Manifest.WebExtensionManifest;
        if (!manifest.options_ui) {
            return;
        }

        const url = browser.runtime.getURL(manifest.options_ui.page);

        setUrl(url);
    }, []);

    return (
        <a href={url} target="_blank">
            Settings
        </a>
    );
}
