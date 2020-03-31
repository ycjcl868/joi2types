import { JSONSchema4 } from 'json-schema';
import { Schema } from '@hapi/joi';

import { Options, defaultOptions } from '../';
import objectType from './object';
import stringType from './string';
import arrayType from './array';

export type Parser<T = Schema> = (schema: T, options?: Options) => JSONSchema4;

const transformer: Parser = (schema, options = defaultOptions) => {
  const typeMap = {
    object: objectType,
    string: stringType,
    function: objectType,
    array: arrayType,
  }
  if (schema?.type && typeMap[schema?.type]) {
    return typeMap[schema.type](schema, { ...defaultOptions, ...options });
  }
  const {
    type = 'any',
    // @ts-ignore
    _flags: {
      description,
    } = {},
  } = schema;
  return {
    type,
    ...(description ? { description } : {})
  }
}

export default transformer;
