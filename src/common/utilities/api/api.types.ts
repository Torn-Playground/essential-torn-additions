import { UserSelection } from "./user.types";
import { KeySelection } from "@common/utilities/api/key.types";

export type ApiSection = "user" | "key";

export type ApiId = number | string | undefined;

export type ApiSelections = UserSelection | KeySelection | "timestamp";

export interface ApiTimestamp {
    timestamp: EpochTimeStamp;
}

export interface ApiError {
    code: number;
    message: string;
    type: "http" | "torn" | "other";
}
