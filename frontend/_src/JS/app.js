//=================
// Imports
//=================
// switches cabinet page and
import switch_cabinet_page from "./modules/switch_cabinet_page.js";

// open\close cabinet modal
import cabinet_toggle from "./modules/cabinet_toggle.js";

// shows errors and messages modal
import error from "./modules/error.js";

// blur background when modal is on
import blur from "./modules/blur.js";

// refresh auth token and update data on client \ returns auth token
import refresh_token from "./modules/server/refresh_token.js";

// delete auth token form cookies and clear data on client
import logout from "./modules/server/logout.js";

// spins the wheel and shows prize modal
import spin from "./modules/server/spin.js";

// login into account
import login from "./modules/server/login.js";

// register new account
import register from "./modules/server/register.js";

// send promocode to backend
import promocode from "./modules/server/promocode.js";


//=================
// Variables
//=================
let
    mobile_text = document.getElementById('mobile_text'),
    mobile_text_btn = document.getElementById('mobile_text_btn');


//=================
// Event listeners
//=================
mobile_text_btn.onclick = () =>{
    mobile_text.classList.toggle('active')
};