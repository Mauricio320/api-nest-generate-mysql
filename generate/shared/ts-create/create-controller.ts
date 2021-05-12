import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { Config } from '../../config';

export class Controller {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;

  constructor(public tableName: string) {
    this.path = `${this.dir}`;
    this.createController(tableName);
  }

  createController(tableName: string) {
    const source = this.shFn.getTemplate('controller');
    const template = Handlebars.compile(source);

    const name = this.shFn.namePrimaryMayus(tableName);

    const nameService = `${name}Service`;

    const data = {
      nameService,
      nameController: name,
      pathService: `./${this.shFn.replace(tableName)}.service`,
      tableName
    };
    const content = template(data);

    const folder = `${this.path}/${this.shFn.replace(
      tableName,
    )}/${this.shFn.replace(tableName)}.controller.ts`;

    if (this.shFn.verifyFolderExists(folder)) {
      return;
    }
    fs.writeFile(folder, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Controller Creado: ${folder}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }
}
