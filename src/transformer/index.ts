import { JSONSchema4 } from 'json-schema';
import { Schema } from '@hapi/joi';

import { Options, defaultOptions } from '../';

import objectType from './object';
import linkType from './link';
import alternativesType from './alternatives';
import stringType from './string';
import functionType from './function';
import arrayType from './array';

export type Parser<T = Schema> = (schema: T, options?: Options) => JSONSchema4;

const transformer: Parser = (schema, options = defaultOptions) => {
  const typeMap = {
    object: objectType,
    string: stringType,
    function: functionType,
    array: arrayType,
    alternatives: alternativesType,
    link: linkType,
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
