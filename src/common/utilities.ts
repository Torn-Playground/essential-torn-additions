export function toMultipleDigits(number: number | string, digits = 2): string {
    return number.toString().length < digits ? toMultipleDigits(`0${number}`, digits) : number.toString();
}
