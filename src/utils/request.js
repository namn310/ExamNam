const API_DOMAIN = "http://localhost:8080/"

export const get = async (patch) => {
    const response = await fetch(API_DOMAIN + patch);
    const result = response.json()
    return result
}

export const post = async (patch, option) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option)
    });
    const result = response.json()
    return result
}
export const del = async (patch) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "DELETE",
    });
    const result = await response.json()
    return result
}

export const patch = async (patch, option) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option)
    });
    const result = await response.json()
    return result
}

export const put = async (patch, option) => {
    const response = await fetch(API_DOMAIN + patch, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option)
    });
    const result = await response.json()
    return result
}