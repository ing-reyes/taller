import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigModule, ConfigService } from '@nestjs/config';


ConfigModule.forRoot({
    envFilePath: `.env.development`,
});

const configService = new ConfigService();

export const DataSourceConfig:DataSourceOptions = {
    type: 'postgres',
    host: configService.get("DB_HOST"),
    port: +configService.get("DB_PORT"),
    username: configService.get("POSTGRES_USER"),
    password: configService.get("POSTGRES_PASSWORD"),
    database: configService.get("POSTGRES_DB"),
    entities: [ __dirname + './../../**/**/*.entity{.ts,.js}' ],
    migrations: [ __dirname + './../../migrations/*{.ts,.js}' ],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
}


export const AppDS = new DataSource(DataSourceConfig);