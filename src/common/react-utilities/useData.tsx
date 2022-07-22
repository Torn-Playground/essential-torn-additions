import { useEffect, useState } from "react";
import { Bucket } from "@extend-chrome/storage";

export function useData<T extends object>(bucket: Bucket<T>, subscribe: boolean): { data: undefined | T; loading: boolean; error: boolean } {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        bucket
            .get()
            .then((data) => {
                setData(data);
                setLoading(false);
                setError(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);
    useEffect(() => {
        bucket.valueStream.subscribe(setData);
    }, [bucket]);

    return {
        data,
        loading,
        error,
    };
}
