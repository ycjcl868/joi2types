import { ArraySchema } from '@hapi/joi';

import transformer, { Parser } from './';

// @ts-ignore
const parser: Parser<ArraySchema> = (schema, options) => {
  const {
    $_terms
  } = schema;
  let items = $_terms.items;
  if (items[0]) {
    items = transformer(items[0], options);
  }
  return {
    type: schema.type || 'array',
    ...((items?.length > 0 || items?.type) ? { items } : {}),
  }
}

export default parser;
