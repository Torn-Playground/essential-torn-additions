import ThemedContainer from "@common/components/themed-container/ThemedContainer";
import QuickItemCard from "@scripts/features/quick-items/quick-item-card/QuickItemCard";
import * as styles from "./QuickItems.module.scss";
import { useEffect, useState } from "react";
import { getEligibleElements } from "@scripts/features/quick-items/quick-items";
import { QuickItem } from "@scripts/features/quick-items/quick-items.types";
import classNames from "classnames";
import { metadataBucket } from "@common/utilities/data/data";

export default function QuickItems() {
    const [items, setItems] = useState<Array<QuickItem>>([]);
    const [temporaryItem, setTemporaryItem] = useState<QuickItem>();
    const [collapsed, setCollapsed] = useState(false);

    const setupListeners = () => {
        for (const item of getEligibleElements()) {
            const titleWrap = item.querySelector(".title-wrap");
            if (!titleWrap || titleWrap.hasAttribute("draggable")) continue;

            titleWrap.setAttribute("draggable", "true");
            // @ts-ignore
            titleWrap.addEventListener("dragstart", onDragStart);
            titleWrap.addEventListener("dragend", onDragEnd);
        }
    };
    const onDragStart = (event: DragEvent) => {
        if (!event.dataTransfer || !event.target) return;

        event.dataTransfer.clearData("text/plain");

        const target = event.target as HTMLElement;
        if (!target.parentElement || !target.parentElement.dataset.item) return;

        const id = parseInt(target.parentElement.dataset.item);
        // Remove duplicates from the quick items.
        if (items.find((item) => item.id === id)) return;

        let name = target.querySelector(".name-wrap .name")?.textContent;
        if (!name) {
            // FIXME - Get name from API.
            name = "TODO";
        }

        let category = target.parentElement.dataset.category;
        if (!category) {
            // FIXME - Get category from API.
            category = "Unknown";
        }

        // FIXME - Get quantity from API.
        const quantity = -1;

        setTemporaryItem({ id, category, name, quantity });
    };
    const onDragEnd = () => setTemporaryItem(undefined);

    const saveItems = (items: Array<QuickItem>) => {
        metadataBucket
            .set((prev) => ({
                quickItems: {
                    ...prev.quickItems,
                    items: items,
                },
            }))
            .catch((reason) => console.error("Failed to save ETA quick items.", reason));
    };
    const updateCollapsed = (collapsed: boolean) => {
        setCollapsed(collapsed);
        metadataBucket
            .set((prev) => ({
                quickItems: {
                    ...prev.quickItems,
                    collapsed,
                },
            }))
            .catch((reason) => console.error("Failed to save ETA quick items container collapsed status.", reason));
    };

    useEffect(() => {
        metadataBucket.get().then((metadata) => {
            setItems(
                metadata.quickItems.items.map((item) => {
                    // FIXME - Get quantity from API.
                    let quantity = undefined;

                    return {
                        id: item.id,
                        category: item.category,
                        name: item.name,
                        quantity,
                    };
                }),
            );
            setCollapsed(metadata.quickItems.collapsed);
        });

        // FIXME - Intercept fetch for better listeners.
        setupListeners();
    }, []);

    return (
        <ThemedContainer
            name="Quick Items"
            bodyClass={classNames(styles.quickItemContainer, { [styles.dragging]: !!temporaryItem })}
            allowDragging
            onDrop={() => {
                if (!temporaryItem) return;

                const newItems = [...items, temporaryItem];

                setTemporaryItem(undefined);
                setItems(newItems);
                saveItems(newItems);
            }}
            collapsed={collapsed}
            onCollapsedUpdate={updateCollapsed}
        >
            {items.map((item) => (
                <QuickItemCard
                    item={item}
                    key={item.id}
                    onRemove={() => {
                        const newItems = items.filter((i) => i !== item);

                        setItems(newItems);
                        saveItems(newItems);
                    }}
                />
            ))}
            {temporaryItem && <QuickItemCard item={temporaryItem} temporary={true} onRemove={() => setTemporaryItem(undefined)} />}
        </ThemedContainer>
    );
}
