export type NumberFormatter = (value: number) => string;

export const commaFormatter: NumberFormatter = (value) => value.toLocaleString("en-US");

export const moneyFormatter: NumberFormatter = (value) => {
    return `$${commaFormatter(value)}`;
};
