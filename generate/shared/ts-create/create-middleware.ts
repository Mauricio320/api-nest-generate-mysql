import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { Config } from '../../config';

export class Middleware {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;

  constructor(public tableName: string) {
    this.path = `${this.dir}`;
    this.createMiddlewares(tableName);
  }

  createMiddlewares(tableName: string) {
    const source = this.shFn.getTemplate('middleware');
    const template = Handlebars.compile(source);

    const nameService = this.shFn.namePrimaryMayus(tableName);

    const singular = this.shFn.singularword(tableName);
    const nameEntity = this.shFn.namePrimaryMayus(singular);

    const data = { nameService, nameEntity };
    const content = template(data);

    const folder = `${this.path}/${this.shFn.replace(
      tableName,
    )}/${this.shFn.replace(tableName)}.middleware.ts`;

    if (this.shFn.verifyFolderExists(folder)) {
      return;
    }
    fs.writeFile(folder, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Middleware Creado: ${folder}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }
}
