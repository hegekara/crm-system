const BASE_URL = "http://localhost:5085";

export const apiFetch = async (endpoint, options = {}) => {

    const defaultHeaders = {
        "Content-Type": "application/json"
    };

    const config = {
        method: options.method || "GET",
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        ...(options.body && { body: JSON.stringify(options.body) }),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Bir hata oluştu");
    }

    return await response.json();
};
