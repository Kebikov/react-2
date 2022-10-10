import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const onLoading = (value) => {
        setLoading(value);
    }

    const onError = (value) => {
        setError(value);
    }

    return {loading, error, onLoading, onError}
}

export default useHttp;