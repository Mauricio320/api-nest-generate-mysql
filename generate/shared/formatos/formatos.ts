export class Formatos {
  static get getFormatos() {
    return {
      ['smallint']: 'number',
      ['integer']: 'number',
      ['character']: 'string',
      ['character varying']: 'string',
      ['date']: 'Date',
      ['numeric']: 'number',
      ['timestamp with time zone']: 'Date',
      ['timestamp']: 'Date',
      ['time']: 'Date',
      ['boolean']: 'boolean',
      ['json']: 'JSON',
      ['text']: 'string',
      ['timestamp without time zone']: 'Date',
      ['double precision']: 'number',
      ['bigint']: 'number',
      ['real']: 'number',
      // mysql
      ['number']: 'number',
    };
  }
}

interface formatos {
  smallint: string;
  integer: string;
  character: string;
  'character varying': string;
  date: string;
  numeric: string;
  'timestamp with time zone': string;
  timestamp: string;
  time: string;
  boolean: string;
  json: string;
  text: string;
  'timestamp without time zone': string;
  'double precision': string;
  bigint: string;
  real: string;
}
