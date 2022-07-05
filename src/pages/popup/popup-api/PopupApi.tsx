import { useState } from "react";
import { fetchData, hasErrorResponse } from "@common/api";
import { KeyInfo } from "@common/api/key.types";
import Message from "../../common/message/Message";
import { apiBucket } from "@common/data/data";
import * as styles from "./PopupApi.module.css";

export default function PopupApi() {
    const [key, setKey] = useState("");

    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const updateKey = () => {
        setUpdating(true);

        fetchData<KeyInfo>("key", ["info"], key)
            .then((info) => {
                if (!info.access_level || info.access_level < 3) {
                    setError(true);
                    setMessage("Access level of this key isn't sufficient. Use a key with with at least limited access.");
                } else {
                    setError(false);
                    apiBucket.set({ apiKey: key }).then(() => setMessage("Saved your api key."));
                }
            })
            .catch((reason) => {
                setError(true);

                if (hasErrorResponse(reason)) {
                    const prefix = reason.type === "torn" ? "TornAPI" : "HTTP error";

                    setMessage(`${prefix}: ${reason.code} = ${reason.message}`);
                } else if (typeof reason === "string") {
                    setMessage(reason);
                } else {
                    setMessage("Unknown issue. Please report this.");
                    console.error("Unhandled error while polling the api.", reason);
                }
            })
            .finally(() => setUpdating(false));
    };

    return (
        <>
            {message && <Message text={message} type={error ? "error" : "normal"} />}

            <div>
                <label htmlFor="api-key">Please enter your API key: </label>
                <input type="text" id="api-key" value={key} onChange={(event) => setKey(event.target.value)} />
                <button disabled={updating} onClick={updateKey} className={styles.setButton}>
                    Set
                </button>
            </div>
            <a href="https://www.torn.com/preferences.php#tab=api" target="_blank">
                Find yours here.
            </a>
        </>
    );
}
