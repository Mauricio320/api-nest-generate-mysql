import * as fs from 'fs';
import { Config } from '../../config';

export class SharedFunctions {
  primaryMayus(name: string) {
    const _name = name.split('_');
    let newString = '';
    _name.forEach(element => {
      newString += element.charAt(0).toUpperCase() + element.slice(1);
    });
    return newString;
  }

  replace(name: string) {
    const regex = /_/gi;
    const newString = name.replace(regex, '-');
    return newString;
  }

  singularword(name: string) {
    const array = name.split('_');
    array.forEach((element, i) => {
      if (!element.split('tes').pop()) {
        return (array[i] = element.substring(0, element.length - 1));
      }

      if (!element.split('es').pop()) {
        return (array[i] = element.substring(0, element.length - 2));
      }

      if (!element.split('s').pop()) {
        return (array[i] = element.substring(0, element.length - 1));
      }
    });
    return array.join('_');
  }

  singularwordEntitys(name: string) {
    const array = name.split('-');
    array.forEach((element, i) => {
      if (!element.split('tes').pop()) {
        return (array[i] = element.substring(0, element.length - 1));
      }

      if (!element.split('es').pop()) {
        return (array[i] = element.substring(0, element.length - 2));
      }

      if (!element.split('s').pop()) {
        return (array[i] = element.substring(0, element.length - 1));
      }
    });
    return array.join('-');
  }

  namePrimaryMayus(name: string) {
    const _name = name.split('_');
    let newString = '';
    _name.forEach(element => {
      newString += element.charAt(0).toUpperCase() + element.slice(1);
    });

    return newString;
  }

  namePrimaryMayusEntitys(name: string) {
    const _name = name.split('-');
    let newString = '';
    _name.forEach(element => {
      newString += element.charAt(0).toUpperCase() + element.slice(1);
    });

    return newString;
  }

  getTemplate(templateName: string) {
    const path = `${Config.template}${templateName}.html`;
    const template = fs.readFileSync(path, 'utf8');
    return template;
  }

  verifyFolderExists(path) {
    if (fs.existsSync(`${path}`)) {
      return true;
    }

    return false;
  }
}
