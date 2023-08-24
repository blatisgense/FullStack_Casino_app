import APIS from "../server/api.js";
import error from "../error.js";

let user_get_all = document.getElementById('user_get_all'),
    user_get_all_table = document.getElementById('user_get_all_table');


const user_get = async () => {
    const form_data = {
        identificator:user_get_all.identificator.value,
        method:user_get_all.method.value,
        all:user_get_all.all.value
    };
    let response = await fetch(APIS.get_users, {
        method: 'POST',
        credentials:'include',
        cache:'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form_data)
    })
    response = await response.json();
    if (response.error){
        error(true, response.error);
        return;
    }
    user_get_all_table.innerHTML = '';
    if ((Array.isArray(response.res)) && (response.res.length >= 2)){
        for (let i = 0; i < response.res.length; i++) {
            console.log(response.res[i])
            user_get_all_table.innerHTML += `
                        <tr>
                            <td>${response.res[i].user_email}</td>  <td>${response.res[i].user_money}</td> <td>${response.res[i].user_wheel}</td> <td>${response.res[i].user_list}</td> <td>${response.res[i].user_meditation}</td> <td>${response.res[i].user_role}</td>
                        </tr>
        `
        }
        return;
    }
    user_get_all_table.innerHTML += `
                        <tr>
                            <td>${response.user_email}</td>  <td>${response.user_money}</td> <td>${response.user_wheel}</td> <td>${response.user_list}</td> <td>${response.user_meditation}</td> <td>${response.user_role}</td>
                        </tr>
        `
}

if (user_get_all){
    user_get_all.onsubmit = async (e) =>{
        e.preventDefault();
        await user_get();
    }
}



export default user_get;