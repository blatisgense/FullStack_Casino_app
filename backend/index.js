import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import loginUsersRoute from "./routes/login.js";
import registerUsersRoute from "./routes/registration.js";
import refresh_tokenRoute from "./routes/refresh_token.js";
import delete_refresh_tokenRoutes from "./routes/logout.js";
import change_user_data from "./routes/for_admins/change_user_data.js";
import create_promocode from "./routes/for_admins/edit_promocode.js";
import change_user_products from "./routes/for_admins/change_user_products.js";
import promocode_routes from "./routes/promocode_check.js";
import spin_routes from "./routes/spin_wheel.js";
import edit_products from "./routes/for_admins/edit_products.js";
import get_users from "./routes/for_admins/get_users.js";
import get_promo from "./routes/for_admins/get_promo.js";
import get_product from "./routes/for_admins/get_product.js";
import get_data from "./routes/get_data.js";



dotenv.config();

const app = express();
const corsOptions = {credentials: true, origin: process.env.CLIENT_URL || '*'};
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use("/api/get_data", get_data); //get
app.use("/api/refresh_token", refresh_tokenRoute); //get
app.use("/api/spin", spin_routes); //get
app.use("/api/delete_refresh_token", delete_refresh_tokenRoutes); //delete
app.use("/api/login", loginUsersRoute); //post
app.use("/api/register", registerUsersRoute); //post
app.use("/api/promo/verify", promocode_routes); //post

app.use("/api/user/change_data", change_user_data); //post
app.use("/api/user/change_product" ,change_user_products ); //post
app.use("/api/promo/create", create_promocode); //post
app.use("/api/products/edit", edit_products); //post

app.use("/api/users/get", get_users); //post
app.use("/api/products/get", get_product); //get
app.use("/api/promo/get", get_promo); //get

app.listen(process.env.APP_PORT, process.env.APP_IP);
