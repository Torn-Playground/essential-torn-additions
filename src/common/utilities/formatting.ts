import { toMultipleDigits } from "@common/utilities/utilities";

export type NumberFormatter = (value: number) => string;

export const commaFormatter: NumberFormatter = (value) => value.toLocaleString("en-US");

export const moneyFormatter: NumberFormatter = (value) => {
    return `$${commaFormatter(value)}`;
};

export function timerFormatter(parts: Array<number>): string {
    return parts.map((p) => toMultipleDigits(p)).join(":");
}
