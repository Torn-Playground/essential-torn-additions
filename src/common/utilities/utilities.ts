export function toMultipleDigits(number: number | string, digits = 2): string {
    return number.toString().length < digits ? toMultipleDigits(`0${number}`, digits) : number.toString();
}

export function getRFC() {
    return getCookie("rfc_v");
}

function getCookie(name: string) {
    const key = `${name}=`;

    return (
        [...decodeURIComponent(document.cookie).split(";"), ...document.cookie.split(";")]
            .map((cookie) => cookie.trimStart())
            .filter((cookie) => cookie.startsWith(key))
            .map((cookie) => cookie.substring(key.length))
            .pop() || ""
    );
}
