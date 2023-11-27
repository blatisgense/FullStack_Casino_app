//system
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

//controllers
import { Client_Controller } from "./controllers/client_Controller";
import { Admin_Controller } from "./controllers/admin_Controller";
import { Auth_Controller } from "./controllers/auth_Controller";

//middleware
import { middlewareConsumer } from "./middleware.consumer";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
	],
	controllers: [Client_Controller, Admin_Controller, Auth_Controller],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		middlewareConsumer(consumer);
	}
}
