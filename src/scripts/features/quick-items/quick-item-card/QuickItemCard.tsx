import { QuickItem, TornQuickItemResponse } from "@scripts/features/quick-items/quick-items.types";
import * as styles from "./QuickItemCard.module.scss";
import classNames from "classnames";
import { isEquipable, useItemQuickly } from "@scripts/features/quick-items/quick-items";
import { useEffect, useState } from "react";
import ItemIcon from "@scripts/features/quick-items/quick-item-card/ItemIcon";
import CloseIcon from "@scripts/features/quick-items/quick-item-card/CloseIcon";
import ItemName from "@scripts/features/quick-items/quick-item-card/ItemName";
import ItemQuantity from "@scripts/features/quick-items/quick-item-card/ItemQuantity";

interface QuickItemCardProps {
    item: QuickItem;
    onRemove: () => void;
    onLoading: () => void;
    onResponse: (response: TornQuickItemResponse | { error: string }) => void;
}

// FIXME - Allow reordering of items.
export default function QuickItemCard(props: QuickItemCardProps) {
    return isEquipable(props.item.category) ? <EquipableItemCard {...props} /> : <RegularItemCard {...props} />;
}

type InternalQuickItemCardProps = QuickItemCardProps & {
    internalResponse?: (response: TornQuickItemResponse | { error: string }) => void;
    internalClassname?: string;
};

function RegularItemCard(props: InternalQuickItemCardProps) {
    const useItem = () => {
        const onResponse = (response: TornQuickItemResponse | { error: string }) => {
            props.onResponse(response);
            props.internalResponse?.(response);
        };

        props.onLoading();
        useItemQuickly(props.item)
            .then((response) => onResponse(response))
            .catch((reason) => onResponse({ error: `Failed to use your item. Reason: '${reason}'.` }));
    };

    return (
        <div className={classNames(styles.quickItem, props.internalClassname)} onClick={useItem}>
            <ItemIcon id={props.item.id} />
            <ItemName name={props.item.name} />
            <ItemQuantity quantity={props.item.quantity} />
            <CloseIcon onRemove={props.onRemove} />
        </div>
    );
}

function EquipableItemCard(props: QuickItemCardProps) {
    const [equipped, setEquipped] = useState(false);

    useEffect(() => {
        if (!isEquipable(props.item.category)) {
            return;
        }

        let position: number;
        if (props.item.category === "Temporary") position = 4;
        else {
            return;
        }

        const equipableSlot = document.querySelector(`div[class*='equippedItems___'] button:nth-child(${position})`);
        if (!equipableSlot) {
            return;
        }

        const equippedItem = equipableSlot
            .querySelector("img")
            ?.getAttribute("src")
            ?.match(/\/items\/(\d+)\//)
            ?.map((value) => parseInt(value))
            .filter((value) => !isNaN(value))
            .pop();

        setEquipped(props.item.id === equippedItem);
    }, [props.item]);

    return (
        <RegularItemCard
            {...props}
            internalResponse={(response) => {
                if ("error" in response) {
                    return;
                }

                if (response.text.includes(" unequipped ")) setEquipped(false);
                else if (response.text.includes(" equipped ")) setEquipped(true);
            }}
            internalClassname={classNames(styles.equipable, { [styles.equipped]: equipped })}
        />
    );
}
