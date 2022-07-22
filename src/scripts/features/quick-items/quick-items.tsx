import { createRoot } from "react-dom/client";
import QuickItems from "@scripts/features/quick-items/QuickItems";

function render(container: Element) {
    const root = createRoot(container);
    root.render(<QuickItems />);
}

export function startQuickItems(): boolean {
    const wrapper = document.querySelector(".equipped-items-wrap");
    if (wrapper === null) {
        return false;
    }

    const element = document.createElement("div");
    element.classList.add("eta-react-root");

    wrapper.insertAdjacentElement("beforebegin", element);

    render(element);
    return true;
}
