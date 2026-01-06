const API_BASE_URL = "https://apps.turyna.eu/apitte/api/v1/"

function login(identifier, password) {
    return fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier: identifier,
            password: password
        })
    }).then(response => {
        return response.status() != 200 ? Promise.reject("Login failed") : response.json()
}).catch(error => {

});
}


export default API_BASE_URL;