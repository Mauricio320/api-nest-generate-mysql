import { FolderShema, FolderTable } from '../shared/ts-create/create-folders';
import { getSchema } from 'mysql-schema';
import { config } from 'dotenv';

import { SharedFunctions } from '../shared/shared-functions/shared-functions';
import { Entity } from '../shared/ts-create/create-entitys';
import { Middleware } from '../shared/ts-create/create-middleware';
import { SubModulo } from '../shared/ts-create/create-sub-modulos';
import { Service } from '../shared/ts-create/create-service';
import { Controller } from '../shared/ts-create/create-controller';
import { Router } from '../shared/ts-create/create-router';
import { Module } from '../shared/ts-create/create-module';
import { EmtitysContainer } from '../shared/ts-create/create-entitys-container';

export class OnDatabase {
  public shFn = new SharedFunctions();
  public configDateBase: any;
  constructor() {
    config();
    this.OnpgStructure();
  }

  async OnpgStructure() {
    await getSchema({
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || '3306',
      database: process.env.DB_NAME || 'test',
      configurations: process.env.DB_CONFIGURATIONS || false,
      extensions: process.env.DB_EXTENSIONS || false,
      asJson: false,
      output: `generate/output/schema.js`,
    }).then((res: any) => {
      this.configDateBase = res;
      this.onCreateContend();
    });
  }

  onCreateContend() {
    const columns = this.configDateBase.columns;
    const nameTables = [];

    for (const table in columns) {
      new FolderTable(table);
      new Entity(table, columns[table]);
      new SubModulo(table);
      new Service(table);
      new Controller(table);
      // new Middleware(table);
      nameTables.push({
        path: this.shFn.replace(table),
        name: this.shFn.namePrimaryMayus(table),
      });
    }

    new Module('database', nameTables);
    new EmtitysContainer(nameTables);
  }
}
