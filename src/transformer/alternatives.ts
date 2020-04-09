import joi, { AlternativesSchema, Schema } from '@hapi/joi';

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
  const oneOf = matches.map(({ schema }: { schema: Schema }) => joi?.isSchema?.(schema) && transformer(schema)).filter(Boolean);
  return {
    oneOf,
    ...(description ? { description } : {})
  }
}

export default parser;
