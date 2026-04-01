
const base_url = "http://todo.test/api/v1";

export const checkUserName = async (username) => {
    try {
        const response = await fetch(`${base_url}/users/${username}`, {
            method: "GET",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error checking username:", error);
        throw error;
    }
}

//image/png

export const login = async (haveAccount, username, password) => {
    try {
        const endpoint = haveAccount ? `${base_url}/auth/login` : `${base_url}/user/`
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("Error login:", error);
        throw error;
    }
}

let refreshInterval = null;

export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) return null;

        const response = await fetch(`${base_url}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });
        // (200 <= respopnse status < 299) ===> response.ok=true
        if (!response.ok) {
            stopAutoRefresh();
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
            return null;
        }

        const result = await response.json();

        if (result?.access) {
            localStorage.setItem("access", result.access);
        }

        return result;
    } catch (error) {
        console.log("Refresh error:", error);
    }
};

export const startAutoRefresh = () => {
    stopAutoRefresh();

    refreshInterval = setInterval(() => {
        refreshToken();
    }, 13 * 60 * 1000);
};


export const stopAutoRefresh = () => {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = null;
};