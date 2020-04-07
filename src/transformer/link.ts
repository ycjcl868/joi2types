import { LinkSchema } from '@hapi/joi';

import { Parser } from './';

// TODO
// @ts-ignore
const parser: Parser<LinkSchema> = (schema, options) => {
  const {
    $_terms,
    type
  } = schema;
  let ref = $_terms.link[0].ref;
  // console.log('link', ref, ref.type);
  return {
    type: 'any',
  }
}

export default parser;
