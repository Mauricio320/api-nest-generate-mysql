import { Sequelize } from 'sequelize-typescript';
import { Entity } from '../app.entities';

export const sequelizeProvider = {
  provide: 'Sequelize',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      models: Entity,
    });

    return sequelize;
  },
};
