import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (uri, onSuccess) => {
    const [url] = useState(uri);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const performFetch = useCallback(async () => {
        const source = axios.CancelToken.source();
        axios.get(url, { cancelToken: source.token })
            .then(res => {
                //checking for multiple kinds of responses
                res.data.content && setData(res.data.content);
                res.content && setData(res.content);

                (res.status === 200 && onSuccess) && onSuccess(res);
            })
            .catch(err => {
                setError('An error occurred.')
            })
        return () => {
            source.cancel();
        }
    }, [url]);

    useEffect(() => {
        performFetch();
    }, [url]);

    return { data, error };
};

export default useFetch;