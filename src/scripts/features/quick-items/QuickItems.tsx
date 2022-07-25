import ThemedContainer from "@common/components/themed-container/ThemedContainer";
import QuickItemCard from "@scripts/features/quick-items/quick-item-card/QuickItemCard";
import * as styles from "./QuickItems.module.scss";
import { useEffect, useState } from "react";
import { QuickItem } from "@scripts/features/quick-items/quick-items.types";
import classNames from "classnames";
import { metadataBucket, userdataBucket } from "@common/utilities/data/data";

export default function QuickItems() {
    // FIXME - Add a way to add quick items.
    const [items, setItems] = useState<Array<QuickItem>>([]);
    const [collapsed, setCollapsed] = useState(true);

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
            userdataBucket.get().then((userdata) => {
                setItems(
                    metadata.quickItems.items.map((item) => {
                        const quantity = userdata.inventory.find((i) => i.id === item.id)?.quantity ?? 0;

                        return {
                            id: item.id,
                            category: item.category,
                            name: item.name,
                            quantity,
                        };
                    }),
                );
            });

            setCollapsed(metadata.quickItems.collapsed);
        });
    }, []);

    return (
        <ThemedContainer name="Quick Items" bodyClass={classNames(styles.quickItemContainer)} collapsed={collapsed} onCollapsedUpdate={updateCollapsed}>
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
        </ThemedContainer>
    );
}
