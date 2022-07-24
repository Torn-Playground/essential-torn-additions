import ThemedContainer from "@common/components/themed-container/ThemedContainer";
import QuickItemCard from "@scripts/features/quick-items/quick-item-card/QuickItemCard";
import * as styles from "./QuickItems.module.scss";

export default function QuickItems() {
    // FIXME - Implement adding items.
    // FIXME - Implement items from storage.
    const items: Array<QuickItem> = [
        { id: 180, name: "Bottle of Beer", quantity: 12279 },
        { id: 732, name: "Blood Bag: A+", quantity: 440 },
        { id: 734, name: "Blood Bag: B+", quantity: 142 },
        { id: 731, name: "Empty Blood Bag", quantity: 255 },
        { id: 206, name: "Xanax", quantity: 167 },
        { id: 68, name: "Small First Aid Kit", quantity: 2236 },
        { id: 205, name: "Vicodin", quantity: 6 },
        { id: 366, name: "Erotic DVD", quantity: 10 },
        { id: 367, name: "Feathery Hotel Coupon", quantity: 19 },
    ];

    return (
        <ThemedContainer name="Quick Items" bodyClass={styles.quickItemContainer}>
            {items.map((item) => (
                <QuickItemCard item={item} key={item.id} />
            ))}
        </ThemedContainer>
    );
}

export interface QuickItem {
    id: number;
    name: string;
    quantity: number | undefined;
}
