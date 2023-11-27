import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { swagger_config } from "./swagger_config";
import * as cookieParser from "cookie-parser";

export const Port: string = process.env.APP_PORT;

export async function app() {
	const app = await NestFactory.create(AppModule);
	SwaggerModule.setup("api/swagger", app, swagger_config);
	app.use(cookieParser());
	await app.listen(Port, () => {
		console.log(`[STARTED ON ${Port}...]`);
	});
}

app();
