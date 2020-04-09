import { Schema } from '@hapi/joi';
import { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript'
import transformer from './transformer';

export interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
}

export const defaultOptions = {
  interfaceName: 'JoiTypes',
  bannerComment: '',
}

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options }
  let jsonSchema: JSONSchema4 = {
    type: 'any',
  }
  try {
    jsonSchema = transformer(schema, opts);
  } catch (e) {
    console.warn('[joi2types] error', e);
  }
  const { bannerComment, interfaceName } = opts;
  const types = await compile(jsonSchema, interfaceName as string, { bannerComment });
  return types;
}

export const jsonSchema2Types = compile;
export const joi2JsonSchema = transformer;
