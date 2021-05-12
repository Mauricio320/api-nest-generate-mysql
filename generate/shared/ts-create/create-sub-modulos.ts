import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { Config } from '../../config';

export class SubModulo {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;

  constructor(public nameTable: string) {
    this.path = `${this.dir}`;
    this.createSubModulos(nameTable);
  }

  createSubModulos(tableName: string) {
    const source = this.shFn.getTemplate('sub-module');
    const template = Handlebars.compile(source);

    const nameModule = this.shFn.namePrimaryMayus(tableName);
    const pathRouter = `/${this.shFn.replace(
      tableName,
    )}`;
    const from = this.shFn.replace(tableName);

    const data = { nameModule, pathRouter, from };
    const content = template(data);

    const folder = `${this.path}/${this.shFn.replace(
      tableName,
    )}/${this.shFn.replace(tableName)}.module.ts`;

    if (this.shFn.verifyFolderExists(folder)) {
      return;
    }
    fs.writeFile(folder, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Modulo Creado: ${folder}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }
}
