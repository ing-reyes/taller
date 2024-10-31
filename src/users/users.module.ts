import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [    ], // importaciones de modulos
    exports: [], // exportaciones de modulos y proveedores
    providers: [ UsersService ], // importaciones de servicios
    controllers: [ UsersController ], // importaciones de controladores
})
export class UsersModule {}