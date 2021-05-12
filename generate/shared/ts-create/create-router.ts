import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { SharedFunctions } from '../shared-functions/shared-functions';
import { Config } from '../../config';

export class Router {
  public dir = Config.dir;
  public shFn = new SharedFunctions();

  constructor(public nameSchema: string, public namesTables: any) {
    this.routerPrincipal(nameSchema, namesTables);
  }

  routerPrincipal(nameSchema: string, namesTables: any[]) {
    const source = this.shFn.getTemplate('router');
    const template = Handlebars.compile(source);

    const nameModule = this.shFn.namePrimaryMayus(nameSchema);
    const data = { nameModule, modulos: namesTables };
    const content = template(data);

    const folder = `${this.dir}${this.shFn.replace(nameSchema)}/${this.shFn.replace(
      nameSchema,
    )}.routes.ts`;

    fs.writeFile(folder, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Router Creado: ${folder}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }
}
