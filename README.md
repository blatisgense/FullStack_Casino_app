<div class="block">
    <h1 class="h1">Hello, I'm Front-end developer Lavrentij</h1>
    <h2 class="h2" style="max-width: 400px; text-align: center; margin-top: 15px;">This is my pet project witch idea based on commercial order.</h2>
    <p class="p1">Navigation:</p>
    <ul class="ul">
        <li>
            <a href="#frontend" class="li1">Front-end (will be added soon)</a>
        </li>
        <li>
            <a href="#backend" class="li1">Back-end</a>
            <ul>
                <li><a href="#backend_about" class="li2">Why PostgresQL + NestJS</a></li>
                <li>
                    <a href="#" class="li2">Setup for running</a>
                    <ul>
                        <li><a href="#" class="li3">Database</a></li>
                        <li><a href="#" class="li3">Environment</a></li>
                        <li><a href="#" class="li3">Services</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#" class="li2">Inside code</a>
                    <ul>
                        <li><a href="#" class="li3">Connect database</a></li>
                        <li><a href="#" class="li3">Configuration</a></li>
                        <li><a href="#" class="li3">Controllers</a></li>
                        <li><a href="#" class="li3">Services</a></li>
                        <li><a href="#" class="li3">Middleware</a></li>
                        <li><a href="#" class="li3">Swagger</a></li>
                    </ul>
                </li>
                <li><a href="#" class="li2">Running app</a></li>
            </ul>
        </li>
        <li>
            <a href="#contacts" class="li1">Contacts</a>
        </li>
    </ul>
    <section id="backend">
        <h2 class="h2 border">Back-end</h2>
        <div id="backend_about">
            <h3 class="h3">Why PostgresQL + NestJS</h3>
            <div class="h3_div">
                <p class="p2">This is back-end of <b><i>Magic wheel</i></b>. Its technology stack: a database is <a class="link" href="https://www.postgresql.org/">PostgresQL</a>, as a back-end I choose <a class="link">NestJS</a> (framework for <a class="link">NodeJS</a>) + <a class="link">Express</a>.</p>
                <p class="p2">
                    <a class="link" href="https://www.postgresql.org/">PostgresQL</a> in case that:
                    <br> - It has flexible access to data, its organization and storage.
                    <br> - Supports a lot of data types and data formats (XML, JSON, run as NoSQL, etc.)
                    <br> - Support V8 JS engine, correspond <a href="https://en.wikipedia.org/wiki/ACID" class="link">ACID</a>
                    <br> - Good npm packages: <a href="https://www.npmjs.com/package/pg" class="link">pg</a>, <a href="https://www.npmjs.com/package/pg-hstore" class="link">pg-hstore</a>
                    <br> - Functional UI PgAdmin
                    <br> - <a href="https://git.postgresql.org/gitweb/?p=postgresql.git;a=summary" class="link">OpenSource</a> and cross-platform
                </p>
                <p class="p2"><a class="link">NestJS</a> is my chose for Javascript (Typescript) back-end, due to the following advantages:
                    <br> - Required Typescript
                    <br> - Built-in Express integration
                    <br> - Powerful CLI
                    <br> - Created for both Monoliths and Microservices
                    <br> - well-organized structure (controllers, services, guards and repositories in specific locations and in a specific manner)
                    <br> - Syntax's 'sugar' like decorators
                    <br> - OpenSource
                </p>
            </div>
        </div> 
        <div id="backend_setup">
            <h3 class="h3">Setup for running</h3>
            <div class="h3_div">
                <h4 class="h4">Database</h4>
                <p class="p2"></p>
                <code>
                    let a = b;
                </code>
            </div>
        </div>
        <div id="backend_about_code">
            <h3 class="h3">Inside code</h3>
            <h4 class="h4">Database</h4>
            <p class="p2"></p>
        </div>
        <div id="backend_running">
            <h3 class="h3">Running app</h3>
        </div>
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