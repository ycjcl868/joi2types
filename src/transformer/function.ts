import { LinkSchema } from '@hapi/joi';

import { Parser } from './';

// @ts-ignore
const parser: Parser<LinkSchema> = (schema, options) => {
  const {
    $_terms,
    type,
    _flags: {
      description,
    } = {},
  } = schema;
  return {
    instanceOf: 'Function',
    tsType: '(() => any)',
    ...(description ? { description } : {})
  }
}

export default parser;
