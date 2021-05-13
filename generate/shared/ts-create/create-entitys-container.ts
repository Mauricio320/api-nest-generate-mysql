import { Config } from '../../config';
import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';

export class EmtitysContainer {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;
  constructor( public namesTables: any) {
    this.path = `${this.dir}`;
    this.onCreateEntitys(namesTables);
  }

  onCreateEntitys(namesTables: any) {
    const data = { data: [] };
    namesTables.forEach((element) => {
      const clase = this.shFn.singularwordEntitys(element.path);

      const name = this.shFn.namePrimaryMayusEntitys(
        this.shFn.singularwordEntitys(element.path)
      );
      data.data.push({
        name,
        path: `./${element.path}/${clase}.entity`,
      });
    });
    this.createEntityContend(data);
  }

  createEntityContend(data: any) {
    const template = this.shFn.getTemplate('create-entiys-container');
    const builder = Handlebars.compile(template);
    const entity = builder(data);

    const path = `${this.path}/app.entities.ts`;

    fs.writeFile(path, entity, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Entity Principal: ${path}`) +
            chalk.bold.green('✔')
        );
      }
    });
  }
}
