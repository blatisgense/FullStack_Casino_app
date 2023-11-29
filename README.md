<div class="block">
    <h1 class="h1">Hello, I'm Front-end developer Lavrentij</h1>
    <h2 class="h2" style="max-width: 400px; text-align: center; margin-top: 15px;">This is my pet project witch idea based on commercial order.</h2>
    <p class="p2" style="margin-top: 20px;">App concept: <br>
    We have accounts that authentication occurs using <a href="https://jwt.io/" class="link">JWT tokens</a>, that stored in Cookies.<br>
    Account have fields:
    <br> - id (unique id),
    <br> - email (unique email, used for operation with an account and registration),
    <br> - name (name chosen during registration),
    <br> - password (password chosen during registration, stored in DB encrypted),
    <br> - money (amount of fictional money),
    <br> - wheels (tries for spin <b><i>Magic wheel</i></b>),
    <br> - role (USER or ADMIN, only admin have access to an admin panel),
    <br> - lists and meditations (some kind of prize, it can be an audio file, but it doesn't exist).
    <br>In original App <i>lists</i>, <i>meditations</i> and <i>money</i> could be received by writing to the administration (by built-in feedback sender).
    <br>Users won prizes by using Promocodes and spinning <b><i>Magic wheel</i></b>.
    <br>Tries for spins and promocodes were purchased from the administration.</p>
    <p class="p1">Navigation:</p>
    <ul class="ul">
        <li>
            <a href="" class="li1">Front-end (Coming soon)</a>
        </li>
        <li>
            <a href="#backend" class="li1">Back-end</a>
            <ul>
                <li><a href="#backend_why" class="li2">Why PostgresQL + NestJS</a></li>
                <li>
                    <a href="#backend_setup" class="li2">Setup for running</a>
                    <ul>
                        <li><a href="#backend_db" class="li3">Database</a></li>
                        <li><a href="#backend_env" class="li3">Environment</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#backend_inside_code" class="li2">Inside code</a>
                    <ul>
                        <li><a href="#backend_connect_db" class="li3">Connect database</a></li>
                        <li><a href="#backend_config" class="li3">Configuration | tools</a></li>
                        <li><a href="#backend_controllers" class="li3">Controllers</a></li>
                        <li><a href="#backend_services" class="li3">Services</a></li>
                        <li><a href="#backend_middle" class="li3">Middleware</a></li>
                        <li><a href="#backend_test" class="li3">Testing</a></li>
                        <li><a href="#backend_swagger" class="li3">Swagger</a></li>
                    </ul>
                </li>
                <li><a href="#backend_scripts" class="li2">NPM scripts</a></li>
            </ul>
        </li>
        <li>
            <a href="#contacts" class="li1">Contacts</a>
        </li>
    </ul>
    <section id="backend">
        <h2 class="h2 border">Back-end</h2>
        <div>
            <h3 id="backend_why" class="h3">Why <a class="link" href="https://www.postgresql.org/">PostgresQL</a> + <a class="link" href="https://nestjs.com/">NestJS</a></h3>
            <div class="h3_div">
                <p class="p2">This is back-end of <b><i>Magic wheel</i></b>. Its technology stack: a database is <a class="link" href="https://www.postgresql.org/">PostgresQL</a>, as a back-end I choose <a class="link" href="https://nestjs.com/">NestJS</a> (framework for NodeJS) + <a class="link" href="https://expressjs.com/">Express</a>.</p>
                <p class="p2">
                    <a class="link" href="https://www.postgresql.org/">PostgresQL</a> in case that:
                    <br> - It has flexible access to data, its organization and storage.
                    <br> - Supports a lot of data types and data formats (XML, JSON, run as NoSQL, etc.)
                    <br> - Support V8 JS engine, correspond <a href="https://en.wikipedia.org/wiki/ACID" class="link">ACID</a>
                    <br> - Good npm packages: <a href="https://www.npmjs.com/package/pg" class="link">pg</a>, <a href="https://www.npmjs.com/package/pg-hstore" class="link">pg-hstore</a>
                    <br> - Functional UI <a class="link" href="https://www.pgadmin.org/">PgAdmin</a>
                    <br> - <a href="https://git.postgresql.org/gitweb/?p=postgresql.git;a=summary" class="link">OpenSource</a> and cross-platform
                </p>
                <p class="p2"><a class="link" href="https://nestjs.com/">NestJS</a> is my chose for Javascript (Typescript) back-end, due to the following advantages:
                    <br> - Required Typescript
                    <br> - Built-in <a class="link" href="https://expressjs.com/">Express</a> integration
                    <br> - Powerful <a href="https://docs.nestjs.com/cli/overview" class="link">CLI</a> 
                    <br> - Can be used for both Monoliths and Microservices
                    <br> - well-organized structure (controllers, services, guards and repositories in specific locations and in a specific manner)
                    <br> - Syntax's 'sugar' like decorators
                    <br> - OpenSource
                </p>
            </div>
        </div> 
        <div>
            <h3 id="backend_setup" class="h3">Setup for running</h3>
            <div class="h3_div">
                <p class="p2">It is assumed that the necessary software is already installed on your computer (NodeJS, NPM, <a class="link" href="https://www.postgresql.org/">PostgresQL</a>) and dependencies from <a href="backend/package.json" class="link"><b><i>backend/package.json</i></b></a> installed.</p>
                <h4 class="h4" id="backend_db">Database</h4>
                <p class="p2">You can find file <a href="backend/src/database/db.sql" class="link"><i><b>backend/src/database/db.sql</b></i></a>  with SQL queries for a database. Firstly we need to create DB:</p>
<pre>CREATE DATABASE DB_NAME;</pre>
                <p>Then define extension for generate IDs</p>
<pre>CREATE EXTENSION IF NOT EXISTS "uuid-ossp";</pre>
                <p>When DB is ready for creating Tables, copy commands from <a href="backend/src/database/db.sql" class="link"><i><b>db.sql</b></i></a>, eventually we have four tables: (<i>Users</i>, <i>Promocodes</i>, <i>Products</i>, <i>Feedback</i>).</p>
                <h4 class="h4" id="backend_env">Environment</h4>
                <p class="p2">You need to create <b><i>.env</i></b> file in directory <a href="backend" class="link"><b><i>backend/</i></b></a>. Then put here <i>environment variables</i> if format:</p>
<pre>VAR_NAME=VAR_VALUE</pre>
                <p class="p2">Each new variable is written on a new line, without special characters between them. In our App we need these variables: token's secrets used to verify <a href="https://jwt.io/" class="link">JWT tokens</a>, APP_PORT on which our application runs, other variables need to connect DB (name, user, password...).</p>
<pre>
ACCESS_TOKEN_SECRET=value
UPDATE_TOKEN_SECRET=value
APP_PORT=value
PG_HOST=value
PG_PORT=value
PG_USER=value
PG_PASS=value
PG_DB=value
</pre>
            </div>
        </div>
        <div>
            <h3 id="backend_inside_code" class="h3">Inside code</h3>
            <div class="h3_div">
                <h4 class="h4" id="backend_connect_db">Connect database</h4>
                <div>
                    <p class="p2">We can connect DB in two ways, by separate parameters in config:</p>
<pre>
let localPoolConfig: db_config = {
    password: process.env.PG_PASS,
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
};
</pre>
                    <p class="p2">Or use <code>DB_CONNECTION_STRING</code> that usually uses on servers. I use both, if <code>DB_CONNECTION_STRING</code> doesn't exist use <code>localPoolConfig</code></p>
<pre>
const poolConfig: object = process.env.DB_CONNECTION_STRING
	? {
			connectionString: process.env.DB_CONNECTION_STRING,
			ssl: { rejectUnauthorized: false },
	  }
	: localPoolConfig;
</pre>
                <p class="p2">Then export <code>pool</code> object, through which we send requests to the database:</p>
<pre>export const pool = new Pool(poolConfig);</pre>
                <p class="p2">Example request:</p>
<pre>const result = await pool.query(`SELECT * FROM Table_name;`);</pre>
                </div>
                <h4 class="h4" id="backend_config">Configuration | tools</h4>
                <div>
                    <p class="p2">External library's:</p>
                    <p class="p2">
                        - Es-lint: <a class="link" href="backend/.eslintrc.json">.eslintrc.json</a><br>
                        - Prettier: <a class="link" href="backend/.prettierrc">.prettierrc</a><br>
                        - Mocha: <a class="link" href="backend/.mocharc">.mocharc</a><br>
                        - Nest CLI: <a class="link" href="backend/nest-cli.json">nest-cli.json</a><br>
                        - Typescript configs: <a class="link" href="backend/tsconfig.json">tsconfig.json</a>, <a class="link" href="backend/tsconfig.build.json">tsconfig.build.json</a>
                    </p>
                    <p class="p2">Tools:</p>
                    <p class="p2">
                    - <a class="link" href="backend/src/config/API.ts">API.ts</a>: API urls, structure and info within an object. Used in <a href="backend/src/controllers" class="link">controllers</a> and <a href="backend/tests" class="link">tests</a>.<br>
                    - <a class="link" href="backend/src/config/jwt.ts">jwt.ts</a>: Function create and verify <a href="https://jwt.io/" class="link">JWT tokens</a>.<br> 
                    - <a class="link" href="backend/src/config/random_product.ts">random_product.ts</a>:Function returns random product (meditation or list) in dependency of a type.<br>
                    - <a class="link" href="backend/src/config/spin_algorithm.ts">spin_algorithm.ts</a>: Function returns "prize" name with different probabilities.<br>
                    - <a class="link" href="backend/src/config/types.ts">types.ts</a>: File with types, interfaces, etc.<br>
                    </p>
                </div>
                <h4 class="h4" id="backend_controllers">Controllers</h4>
                <div>
                    <p class="p2">
                        In <a class="link" href="https://nestjs.com/">NestJS</a> we set our API entry points for <a href="#backend_services" class="link">services</a> in controllers. Controllers locate in <a href="backend/src/controllers" class="link">controllers</a> folder. I've made three controllers:<br>
                    - <a href="backend/src/controllers/admin_Controller.ts" class="link">Admin_controller</a>: for services where an Admin role required.<br>
                    - <a href="backend/src/controllers/auth_Controller.ts" class="link">Auth_controller</a>: registration, login, logout.<br>
                    - <a href="backend/src/controllers/client_Controller.ts" class="link">Client_controller</a>: for services where auth required.<br>
                    </p>
                    <p class="p2">Controllers code looks like:</p>
<pre>
//NestJs decorators
import { Controller, Req, Res } from "@nestjs/common";
//NestJs decorator for Request method
import { Patch } from "@nestjs/common";
//the aforementioned API-hint object
import { APIS } from "../config/API";
//Express types
import { Request, Response } from "express";

//services
import { users_change_money } from "../services/admin/users/change/money";

//define controller
@Controller()
export class Admin_Controller {
    //Request method takes url
    @Patch(APIS.admin.users.change.money.apiUrl)
    //call service
    async Users_change_money(@Req() req: Request, @Res() res: Response) {
        await users_change_money(req, res);
    }
    //below other services
}
</pre>
                <p class="p2">Then controllers imported to <a href="backend/src/app.module.ts" class="link">app.module.ts</a></p>
                <pre>
@Module({
    controllers: [
        Client_Controller,
        Admin_Controller,
        Auth_Controller
    ],
})
                </pre>
                </div>
                <h4 class="h4" id="backend_services">Services</h4>
                <div>
                    <p class="p2">
                        Service is a function that takes Request and Response. After processing the request, sends the Response data (status code, json, set cookies). <br> Example (service return User by email, received as path parameter):
                    </p>
<pre>
// pool object for DB query
import { pool } from "../../../../database/db";
//Express types
import { Request, Response } from "express";

//export service
export const users_get_one = async (req: Request, res: Response) => {
    //try|catch to catch internal server errors
    try {
        //get user with email equal received in parameters 
        const users = await pool.query(
            `SELECT * FROM Users WHERE user_email = $1`,
            [req.params.email],
        );
        //send error if query fails
        if (users.error) {
            return res.status(401).json({ error: users.error });
        }
        //send error if zero users found
        if (users.rows.length === 0) {
            return res.status(401).json({
                error: `User not found, check entered email.`,
            });
        }
        //send user
        return res.status(200).json(users.rows[0]);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};
</pre>
                </div>                
                <h4 class="h4" id="backend_middle">Middleware</h4>
                <div>
                    <p class="p2">Middleware in our case is a function that pre-verify request. Here we made next middleware:</p>
                    <p class="p2"><a href="backend/src/middleware/auth_middle.ts" class="link">auth_middle.ts</a>: runs at <a href="backend/src/controllers/client_Controller.ts" class="link">Client_controller</a> and <a href="backend/src/controllers/admin_Controller.ts" class="link">Admin_controller</a>, verify <a href="https://jwt.io/" class="link">JWT tokens</a> in cookies</p>
                    <p class="p2"><a href="backend/src/middleware/role_check.ts" class="link">role_check.ts</a>: Checking User's role at <a href="backend/src/controllers/admin_Controller.ts" class="link">Admin_controller</a></p>
                    <p class="p2">Middleware setting in <a href="backend/src/middleware.consumer.ts" class="link">middleware.consumer.ts</a>, below example for setting <a href="backend/src/middleware/auth_middle.ts" class="link">auth_middle.ts</a> and <a href="backend/src/middleware/role_check.ts" class="link">role_check.ts</a> middlewares:</p>
<pre>
//required middlewares
import { auth_middle } from "./middleware/auth_middle";
import { role_check } from "./middleware/role_check";
//the aforementioned API-hint object
import { APIS } from "./config/API";
//NestJs parameter
import { RequestMethod } from "@nestjs/common";

export const middlewareConsumer = (consumer) => {
	consumer.apply(auth_middle, role_check(["ADMIN"])).forRoutes(
		{
			path: APIS.admin.users.change.money.apiUrl,
			method: RequestMethod.PATCH,
		},
    )
}
</pre>
                    <p class="p2">Then we import <a href="backend/src/middleware.consumer.ts" class="link">middleware.consumer.ts</a> into <a href="backend/src/app.module.ts" class="link">app.module.ts</a> and configure:</p>
<pre>
//NestJs types
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
//middleware config
import { middlewareConsumer } from "./middleware.consumer";

export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		middlewareConsumer(consumer);
	}
}
</pre>
                </div>
                <h4 class="h4" id="backend_test">Testing</h4>
                <div>
                    <p class="p2">App <a href="backend/tests/" class="link">tests</a> wrote on a <a href="https://mochajs.org/" class="link">Mocha</a> test-running framework + <a href="https://www.chaijs.com/" class="link">Chai</a> assertion library. <a href="backend/tests/unit/" class="link">Unit</a> (User and promocode classes) and <a href="backend/tests/e2e/" class="link">E2E</a> (admin and client controllers' API, middleware) tests.</p>
                </div>
                <h4 class="h4" id="backend_swagger">Swagger</h4>
                <div>
                    <p class="p2">
                        All API have Swagger documentation in <a href="backend/src/swagger_config.ts" class="link">swagger_config.ts</a> at <br> <pre>api/swagger</pre>.<br> Swagger setups in main.ts:
<pre>
export async function app() {
	const app = await NestFactory.create(AppModule);
	<b>SwaggerModule.setup("api/swagger", app, swagger_config);</b>
	app.use(cookieParser());
	await app.listen(Port, () => {
		console.log(`[STARTED ON ${Port}...]`);
	});
}
</pre>
                </div>            
            </div>
        </div>
        <div>
            <h3 id="backend_scripts" class="h3">NPM scripts</h3>
            <div class="h3_div">
                <p class="p2"><code>npm run start</code><br>Start app in development mode, if files changed reloads.</p>
                <p class="p2"><code>npm run build</code><br>Build app for production usage.</p>
                <p class="p2"><code>npm run test</code><br>Run all <a href="https://mochajs.org/" class="link">Mocha</a> tests in tests dir.</p>
                <p class="p2"><code>npm run format</code><br>Format all files with <a href="https://prettier.io/" class="link">prettier</a>.</p>
                <p class="p2"><code>npm run lint-fix</code><br>Fix all code-style problems.</p>
            </div>
        </div>
    </section>
    <section>
        <h2 class="h2 border" id="contacts">Contacts</h2>
        <p class="p2">Thanks for reading, you can link me by the contacts below:
        <br><a href="https://t.me/Blatisgense" class="link" style="padding-left: 15px;">Telegram</a> - @Blatisgense (best way)
        <br><a href="https://discordapp.com/users/559703556295360512/" class="link" style="padding-left: 15px;">Discord</a> - blatisgense
        <br><a href="https://join.skype.com/invite/qPov3jKdAoRs" class="link" style="padding-left: 15px;">Skype</a> - blatisgense
        <br><a href="mailto: lavr.marudenko@gmail.com" class="link" style="padding-left: 15px;">Email</a> - lavr.marudenko@gmail.com
        </p>
    </section>
</div>



<style class="You seeing this because Github does not support CSS, so this for local reading.">
    .block{display: block; min-width: 420px; min-height: 100%; background-color: #E8E8E8; margin: 10px}
    .h1{color: #213547; font-family: Roboto,sans-serif; margin: 0; text-wrap: avoid; text-align: center; line-height: 40px; font-size: 36px;}
    .h2{margin: 45px auto 0 auto; color: #213547;font-family: Roboto,sans-serif; line-height: 30px; font-size: 26px;}
    .h3{margin: 25px auto 0 auto; color: #213547;font-family: Roboto,sans-serif; line-height: 25px; font-size: 23px;}
    .h4{margin: 15px auto 0 auto; color: #213547;font-family: Roboto,sans-serif; line-height: 22px; font-size: 20px;}
    .h3_div{padding-left: 30px}
    .border{padding-bottom: 7px; border-bottom: 2px #213547 solid}
    .p1{color: #213547;font-family: Calibri,sans-serif; margin-top: 60px; margin-bottom: 0; font-size: 24px;}
    .p2{color: #213547;font-family: Calibri,sans-serif; margin-top: 5px; margin-bottom: 16px; font-size: 19px; line-height: 25px;}
    .ul{margin-left: 0; padding-left: 18px; display: flex; flex-direction: column; row-gap: 22px}
    .li1{text-decoration: underline; font-size: 21px; color: #111578;}
    .li2{text-decoration: underline; font-size: 19px; color: #222ba3}
    .li3{text-decoration: underline; font-size: 18px; color: #4852db}
    .link{text-decoration: underline; font-size: inherit; color: #222ba3}
</style>