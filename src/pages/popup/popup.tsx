import { createRoot } from "react-dom/client";
import PopupApp from "./PopupApp";
import ThemedPage from "../common/themed-page/ThemedPage";

const container = document.getElementById("root")!;

const root = createRoot(container);
root.render(
    <ThemedPage>
        <PopupApp />
    </ThemedPage>,
);
