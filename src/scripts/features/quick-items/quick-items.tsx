import { createRoot } from "react-dom/client";
import QuickItems from "@scripts/features/quick-items/QuickItems";
import { getRFC } from "@common/utilities/utilities";
import { QuickItem, TornQuickItemResponse } from "@scripts/features/quick-items/quick-items.types";

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
            // 220, 221, 222, 226, 229, 239, 242, 246, 256, 257, 392, 394, 581, 611, 616, 742, 833, 840, 1042, 1294,
            // Others
            403,
        ].includes(id)
    );
}

export function isEquipable(category: string) {
    return ["Temporary"].includes(category);
}

export function useItemQuickly(item: QuickItem): Promise<TornQuickItemResponse> {
    const equipable = isEquipable(item.category);

    // FIXME - Rework function.
    const body = new URLSearchParams();
    if (equipable) {
        // FIXME - Implement equipable item.
        if (!item.xid) {
            throw "Equipable item does not have correct data stored!";
        }

        body.set("step", "actionForm");
        body.set("confirm", "1");
        body.set("action", "equip");
        body.set("id", item.xid.toString());
    } else {
        body.set("step", "useItem");
        body.set("id", item.id.toString());
        body.set("itemID", item.id.toString());
    }

    const params = new URLSearchParams();
    params.set("rfcv", getRFC());

    return new Promise<TornQuickItemResponse>(async (resolve) => {
        const fetchResponse = await fetch(`https://www.torn.com/item.php?${params}`, {
            method: "POST",
            headers: { "x-requested-with": "XMLHttpRequest" },
            body,
        });

        if (equipable) {
            resolve({
                isEquipable: true,
                text: await fetchResponse.text(),
            });
        } else {
            const json = await fetchResponse.json();

            resolve({ success: json.success, text: json.text, links: json.links || [] });
        }
    });
}
