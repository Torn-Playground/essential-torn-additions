import { browser } from "webextension-polyfill-ts";

export default function DashboardSettingsLink() {
    return (
        <a href={browser.runtime.getURL("pages/settings/settings.html")} target="_blank">
            Settings
        </a>
    );
}
