import { StoredQuickItem } from "@common/utilities/data/data.types";

export type QuickItem = StoredQuickItem & {
    quantity: number | undefined;
};
