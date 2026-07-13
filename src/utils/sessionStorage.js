export const setSessionStorage = (key, value) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};

export const getSessionStorage = (key) => {
    if (typeof window !== "undefined") {
        const data = sessionStorage.getItem(key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (err) {
                return data;
            }
        }
    }
    return null;
};

export const removeSessionStorage = (key) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
    }
};
