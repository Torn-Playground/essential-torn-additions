import { StoredQuickItem } from "@common/utilities/data/data.types";

export type QuickItem = StoredQuickItem & {
    quantity: number | undefined;
};

export type TornQuickItemResponse = { success: boolean; text: string; links: Array<TornQuickItemLink> } | { isEquipable: true; text: string };

export interface TornQuickItemLink {
    title: string;
    url: string;
    class: string;
    attr: string;
}
