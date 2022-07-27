import ThemedContainer from "@common/components/themed-container/ThemedContainer";
import QuickItemCard from "@scripts/features/quick-items/quick-item-card/QuickItemCard";
import * as styles from "./QuickItems.module.scss";
import { useEffect, useState } from "react";
import { QuickItem, TornQuickItemLink } from "@scripts/features/quick-items/quick-items.types";
import classNames from "classnames";
import { metadataBucket, userdataBucket } from "@common/utilities/data/data";
import QuickItemResponse from "@scripts/features/quick-items/quick-item-response/QuickItemResponse";

export default function QuickItems() {
    // FIXME - Add a way to add quick items.
    const [items, setItems] = useState<Array<QuickItem>>([]);
    const [collapsed, setCollapsed] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState<string>();
    const [links, setLinks] = useState<Array<TornQuickItemLink>>([]);

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
                            ...item,
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
                    onLoading={() => {
                        setLoading(true);
                        setSuccess(false);
                        setResponse(undefined);
                    }}
                    onResponse={(response) => {
                        setLoading(false);

                        if ("error" in response) {
                            setSuccess(false);
                            setResponse(response.error);
                            setLinks([]);
                        } else {
                            setSuccess(success);
                            setResponse(response.text);

                            if ("links" in response) {
                                setLinks(response.links);
                            }
                        }
                    }}
                />
            ))}
            <QuickItemResponse
                loading={loading}
                success={success}
                response={response}
                onClose={() => {
                    setLoading(false);
                    setSuccess(false);
                    setResponse(undefined);
                }}
                links={links}
            />
        </ThemedContainer>
    );
}
