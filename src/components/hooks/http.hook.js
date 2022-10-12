import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true);
        
        try {
            const response = await fetch(url, {method, body, headers});
            if(!response.ok) {
                throw new Error(`Ошибка в ${url}, статус ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error);
            console.log(error);
        }
    }, []);

    const clearError = useCallback(() => {setError(null)}, []);

    return {loading, request, error, clearError, setLoading, setError}
}

export default useHttp;