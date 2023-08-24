import APIS from "./api.js";
import error from "../error.js";

const get_data = async () => {
    let response = await fetch(APIS.get_data, {
        method: 'GET',
        credentials:'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    response = await response.json();

    if (response.error){
        error(true, response.error)
        return;
    }

    return response;
}

export default get_data;