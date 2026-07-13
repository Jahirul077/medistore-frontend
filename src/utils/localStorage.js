export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem(key);
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

export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};
