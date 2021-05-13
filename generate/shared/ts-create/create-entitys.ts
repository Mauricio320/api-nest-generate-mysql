import { Formatos } from '../formatos/formatos';
import { SharedFunctions } from '../shared-functions/shared-functions';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as chalk from 'chalk';
import { Config } from '../../config';

export class Entity {
  public dir = Config.dir;
  public shFn = new SharedFunctions();
  public path: string;

  constructor(public tableName: string, public table: any) {
    this.path = `${this.dir}`;
    this.onCreateEntity(tableName, table);
  }

  onCreateEntity(tableName: string, table: any) {
    const columns = this.getColsForEntity(table);

    const className = this.shFn.namePrimaryMayus(
      this.shFn.singularword(tableName),
    );

    const context = {
      tableName,
      columns,
      className,
      ...this.getRelations(tableName, table),
    };

    this.createFile(context, tableName);
  }

  createFile(context: any, tableName: string) {
    const template = this.shFn.getTemplate('entity');

    const builder = Handlebars.compile(template);
    const entity = builder(context);
    const singularTableName = this.shFn.singularword(tableName);

    const path = `${this.path}/${this.shFn.replace(
      tableName,
    )}/${this.shFn.replace(singularTableName)}.entity.ts`;

    if (this.shFn.verifyFolderExists(path)) {
      return;
    }

    fs.writeFile(path, entity, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          chalk.bold.yellow(`--- Entity Creado: ${path}`) +
            chalk.bold.green('✔'),
        );
      }
    });
  }

  getColsForEntity(table: any) {
    const columns = [];

    for (const key in table) {
      if (key !== 'id') {
        const type = Formatos.getFormatos[table[key].type];
        columns.push({ name: key, type });
      }
    }

    return columns;
  }

  getRelations(tableName: string, table: any) {
    const belongsTo = [];
    const hasMany = [];

    /**
     * @hasMany
     * 1 to m
     */
    for (const key in table) {
      if (table[key].referencesHas.length > 0) {
        const relations = table[key].referencesHas;

        for (const relation of relations) {
          const name = this.shFn.namePrimaryMayus(
            this.shFn.singularword(relation.referencedTable),
          );
          hasMany.push({
            name,
            foreignKey: relation.column,
            tableName: relation.referencedTable,
          });
        }
      }
    }

    /**
     * @belongsTo
     * m to 1
     */

    for (const key in table) {
      if (table[key].referencesTo.length > 0) {
        const relations = table[key].referencesTo;

        for (const relation of relations) {
          const name = this.shFn.namePrimaryMayus(
            this.shFn.singularword(relation.referencedTable),
          );
          belongsTo.push({
            name,
            foreignKey: relation.column,
            tableName: relation.referencedTable,
          });
        }
      }
    }

    const relations = { hasMany, belongsTo };
    const imports = this.getImportsForEntity(relations);

    return { ...relations, imports };
  }

  getImportsForEntity(relations: any) {
    const imports = [];
    for (const relationType in relations) {
      if (relations.hasOwnProperty(relationType)) {
        const _relations = relations[relationType];
        for (const relation of _relations) {
          /**
           * @todo "verify if import exists"
           * @todo "verify if make reference to this"
           */
          const singular = this.shFn.singularword(relation.tableName);
          const entityName = this.shFn.replace(singular);
          const folder = this.shFn.replace(relation.tableName);
          const name = this.shFn.primaryMayus(singular);
          const path = `../${folder}/${entityName}.entity`;
          imports.push({ name, path });
        }
      }
    }

    return imports;
  }
}
