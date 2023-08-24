import APIS from "./api.js";
import fill_data from "../user_data/fill_data.js";


const refresh_token = async () => {
    let response = await fetch(APIS.refresh_token, {
        method: 'GET',
        credentials:'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    response = await response.json()

    if (response){
        await fill_data()
    }
}

window.onload = ()=> refresh_token();

export default refresh_token;