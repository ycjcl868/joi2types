import { Schema } from '@hapi/joi';
import { compile } from 'json-schema-to-typescript'
import transformer from './transformer';

export interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
}

export const defaultOptions = {
  additionalProperties: false,
  interfaceName: 'JoiTypes',
  bannerComment: '',
}

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options }
  const jsonSchema = transformer(schema, opts);
  const { bannerComment, interfaceName } = opts;
  const types = await compile(jsonSchema, interfaceName as string, { bannerComment });
  return types;
}

export const jsonSchema2Types = compile;
export const joi2JsonSchema = transformer;
