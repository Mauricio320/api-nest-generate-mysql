import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { Config } from '../../config';

export class Service {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;

  constructor(public tableName: string) {
    this.path = `${this.dir}`;
    this.createServices(tableName);
  }

  createServices(tableName: string) {
    const source = this.shFn.getTemplate('service');
    const template = Handlebars.compile(source);

    const nameService = this.shFn.namePrimaryMayus(tableName);

    const data = { name: nameService };
    const content = template(data);

    const folder = `${this.path}/${this.shFn.replace(
      tableName,
    )}/${this.shFn.replace(tableName)}.service.ts`;

    if (this.shFn.verifyFolderExists(folder)) {
      return;
    }
    fs.writeFile(folder, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Service Creado: ${folder}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }
}
