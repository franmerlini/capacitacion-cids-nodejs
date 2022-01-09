import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
     type: "mysql",
     host: process.env.TYPEORM_HOST,
     port: Number(process.env.TYPEORM_PORT),
     username: process.env.TYPEORM_USERNAME,
     password: process.env.TYPEORM_PASSWORD,
     database: process.env.TYPEORM_DATABASE,

     entities: [__dirname + "/**/*.entities{.ts,.js}"],

     synchronize: process.env.TYPEORM_SYNCHRONIZE
          ? process.env.TYPEORM_SYNCHRONIZE.toLowerCase() === "true"
          : false,

     migrationsRun: false,

     logging: process.env.TYPEORM_LOGGING
          ? process.env.TYPEORM_LOGGING.toLowerCase() === "true"
          : false,
};

export = config;
