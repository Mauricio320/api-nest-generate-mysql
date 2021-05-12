import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { SharedFunctions } from '../shared-functions/shared-functions';
import { Config } from '../../config';

export class Module {
  public dir = Config.dir;
  public shFn = new SharedFunctions();

  constructor(public nameSchema: string, public namesTables: any) {
    this.createModuloPrincipal(nameSchema, namesTables);
  }

  createModuloPrincipal(nameSchema: string, namesTables: any) {
    const source = this.shFn.getTemplate('module');
    const template = Handlebars.compile(source);

    const data = { nameModule: nameSchema, modulos: namesTables };
    const content = template(data);
    console.log(data);

    const folder = `${this.dir}${this.shFn.replace(nameSchema)}.module.ts`;

    fs.writeFile(folder, content, (err) => {
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
