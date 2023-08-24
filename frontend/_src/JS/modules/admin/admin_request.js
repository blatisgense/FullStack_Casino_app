import error from "../error.js";
const admin_request = async (data, api) => {
    let response = await fetch(api, {
        method: 'POST',
        credentials:'include',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    if (response.error) {
        error(true, response.error)
        return;
    }
    error(true, response.msg)
}

export default admin_request;