import { AlternativesSchema, Schema } from '@hapi/joi';

import { isSchema } from '../utils';
import transformer, { Parser } from './';

// TODO
// @ts-ignore
const parser: Parser<AlternativesSchema> = (schema, options) => {
  const {
    $_terms: { matches } = {},
    _flags: {
      description,
    } = {},
  } = schema;
  const oneOf = matches.map(({ schema }: { schema: Schema }) => isSchema(schema) && transformer(schema)).filter(Boolean);
  return {
    oneOf,
    ...(description ? { description } : {})
  }
}

export default parser;
