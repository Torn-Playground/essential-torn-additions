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

function isEligible(id: number, category: string) {
    return (
        ["Medical", "Drug", "Energy Drink", "Alcohol", "Candy", "Booster"].includes(category) ||
        [
            // Temporary Items
            220, 221, 222, 226, 229, 239, 242, 246, 256, 257, 392, 394, 581, 611, 616, 742, 833, 840, 1042,
            // Others
            403,
        ].includes(id)
    );
}

export function isEquipable(category: string) {
    return ["Temporary"].includes(category);
}

export function getEligibleElements() {
    // @ts-ignore
    return ([...document.querySelectorAll(".items-cont[aria-expanded=true] > li[data-item]")] as Array<HTMLElement>).filter((item) =>
        isEligible(parseInt(item.dataset.item || ""), item.dataset.category || ""),
    );
}
