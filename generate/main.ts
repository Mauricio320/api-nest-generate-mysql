import { prompt } from 'inquirer';
import { OnDatabase } from './actions/database';

export class Generate {
  constructor() {
    this.promptS();
  }

  promptS() {
    prompt([
      {
        type: 'list',
        name: 'accion',
        message: 'Crear estructura a partir de',
        choices: ['1.) Base de datos'],
      },
    ]).then((answer) => {
      this.onStructureModel(answer.accion);
    });
  }

  onStructureModel(schema: string) {
    const accion = Number(schema[0]);
    switch (accion) {
      case 1:
        this.OncreateDatabase();
        break;

      default:
        break;
    }
  }

  private OncreateDatabase() {
    new OnDatabase();
  }
}

new Generate();
