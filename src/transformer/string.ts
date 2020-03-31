import { StringSchema } from '@hapi/joi';

import { Parser } from './';

// @ts-ignore
const parser: Parser<StringSchema> = (schema, options) => {
  const {
    type = 'string',
    // @ts-ignore
    _valids,
    _flags: { description } = {},
  } = schema;

  return {
    type,
    ...(_valids?._values?.size > 0 ? { enum: Array.from(_valids._values) } : {}),
    ...(description ? { description } : {})
  }
}

export default parser;
