import { ApiError, ApiId, ApiSection, ApiSelections } from "./api.types";
import { UserSelection } from "@common/api/user.types";
import { KeySelection } from "@common/api/key.types";
import { apiBucket } from "@common/data/data";

function fetchTorn<T>(section: ApiSection, id: ApiId, apiKey: string, selections: Array<string>): Promise<T> {
    const params = new URLSearchParams();
    params.append("selections", selections.join(","));
    params.append("key", apiKey);
    params.append("comment", "eta");

    const url = `https://api.torn.com/${section}/${id ?? ""}${params.toString() ? "?" + params : ""}`;

    return fetch(url).then(async (response) => {
        if (response.status !== 200) {
            // TODO - Handle error message.
            throw { code: response.status, message: "TODO", type: "http" } as ApiError;
        }

        const result = await response.clone().json();
        if (result.error) {
            throw { code: result.error.code, message: result.error.error, type: "torn" } as ApiError;
        }

        return result as unknown as T;
    });
}

function getApiKey(): Promise<string> {
    return apiBucket
        .get()
        .then((apiData) => apiData.apiKey)
        .then((key) => {
            if (key === undefined) throw "API key has not been set.";

            return key;
        });
}

export function fetchData<T>(section: "user", selections: Array<UserSelection | "timestamp">): Promise<T>;
export function fetchData<T>(section: "key", selections: Array<KeySelection | "timestamp">): Promise<T>;
export function fetchData<T>(section: "key", selections: Array<KeySelection | "timestamp">, key: string): Promise<T>;
export function fetchData<T>(section: ApiSection, selections: Array<ApiSelections>, key?: string): Promise<T> {
    const getKey: Promise<string> = key ? Promise.resolve(key) : getApiKey();

    return getKey.then((key) => fetchTorn(section, undefined, key, selections));
}

export function hasErrorResponse(response: unknown): response is ApiError {
    const error = response as ApiError;

    return error.code !== undefined && error.message !== undefined && error.type !== undefined;
}
