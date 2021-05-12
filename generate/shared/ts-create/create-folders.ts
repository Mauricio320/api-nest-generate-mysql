import * as fs from 'fs';
import * as chalk from 'chalk';
import { SharedFunctions } from '../shared-functions/shared-functions';
import { Config } from '../../config';

const dir = Config.dir;
const shFn = new SharedFunctions();

export class FolderShema {
  public path: string;
  constructor(public nameSchema: string) {
    this.path = `${dir}${shFn.replace(nameSchema)}`;
    this.OncreateFolderShema();
  }

  private OncreateFolderShema() {
    fs.existsSync(this.path) ? this.folderExist() : this.createFolder();
  }

  private folderExist() {
    console.log(
      chalk.bold.green('x') +
        chalk.bold.green(` Carpeta principal ya existe : ${this.path} `) +
        chalk.bold.green('x'),
    );
  }

  private createFolder() {
    fs.mkdirSync(this.path);
    console.log(
      '✅' +
        chalk.bold.magenta(` Carpeta Creada: ${this.path}`) +
        chalk.bold.green(' ✔'),
    );
  }
}

export class FolderTable {
  public path: string;
  constructor(public nameFolder: string) {
    this.path = `${dir}${shFn.replace(nameFolder)}`;
    this.OncreateFolderTable();
  }

  private OncreateFolderTable() {
    fs.existsSync(this.path) ? this.folderExist() : this.createFolder();
  }

  private folderExist() {
    console.log(
      chalk.bold.green('x') +
        chalk.bold.magenta(` Carpeta ya existe: ${this.path} `) +
        chalk.bold.green('x'),
    );
  }

  private createFolder() {
    fs.mkdirSync(this.path);
    console.log(
      '✅' +
        chalk.bold.magenta(` Carpeta Creada: ${this.path}`) +
        chalk.bold.green(' ✔'),
    );
  }
}
