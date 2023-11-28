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
            <a href="#frontend" class="li1">Front-end (will be added soon)</a>
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
                        <li><a href="#backend_controllers" class="li3">Controllers</a></li>
                        <li><a href="#backend_services" class="li3">Services</a></li>
                        <li><a href="#backend_middle" class="li3">Middleware</a></li>
                        <li><a href="#backend_config" class="li3">Configuration</a></li>
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
<code>CREATE DATABASE DB_NAME;</code>
                <p>Then define extension for generate IDs</p>
<code>CREATE EXTENSION IF NOT EXISTS "uuid-ossp";</code>
                <p>When DB is ready for creating Tables, copy commands from <a href="backend/src/database/db.sql" class="link"><i><b>db.sql</b></i></a>, eventually we have four tables: (<i>Users</i>, <i>Promocodes</i>, <i>Products</i>, <i>Feedback</i>).</p>
                <h4 class="h4" id="backend_env">Environment</h4>
                <p class="p2">You need to create <b><i>.env</i></b> file in directory <a href="backend" class="link"><b><i>backend/</i></b></a>. Then put here <i>environment variables</i> if format:</p>
<code>VAR_NAME=VAR_VALUE</code>
                <p class="p2">Each new variable is written on a new line, without special characters between them. In our App we need these variables: token's secrets used to verify <a href="https://jwt.io/" class="link">JWT tokens</a>, APP_PORT on which our application runs, other variables need to connect DB (name, user, password...).</p>
                <img src="docs_media/env.png" alt=".env variables">
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
                    <p class="p2">Or use <code>DB_CONNECTION_STRING</code> that usually uses on servers. I use both, if <code>DB_CONNECTION_STRING</code> doesnt exist use <code>localPoolConfig</code></p>
<pre>
const poolConfig: object = process.env.DB_CONNECTION_STRING
	? {
			connectionString: process.env.DB_CONNECTION_STRING,
			ssl: { rejectUnauthorized: false },
	  }
	: localPoolConfig;
</pre>
                </div>
                <h4 class="h4" id="backend_controllers">Controllers</h4>
                <div>
                    <p class="p2"></p>
                </div>
                <h4 class="h4" id="backend_services">Services</h4>
                <div>
                    <p class="p2"></p>
                </div>                
                <h4 class="h4" id="backend_middle">Middleware</h4>
                <div>
                    <p class="p2"></p>
                </div>                
                <h4 class="h4" id="backend_config">Configuration</h4>
                <div>
                    <p class="p2"></p>
                </div>                
                <h4 class="h4" id="backend_test">Testing</h4>
                <div>
                    <p class="p2"></p>
                </div>
                <h4 class="h4" id="backend_swagger">Swagger</h4>
                <div>
                    <p class="p2"></p>
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