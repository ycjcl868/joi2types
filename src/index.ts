import { Schema } from '@hapi/joi';
import { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';
import transformer from './transformer';

export interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
  format?: boolean;
  unknownAny?: boolean;
}

export const defaultOptions = {
  interfaceName: 'JoiTypes',
  bannerComment: '',
  format: false,
  unknownAny: false,
};

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options };
  const jsonSchema: JSONSchema4 = transformer(schema, opts);
  const { bannerComment, interfaceName, format, unknownAny = false } = opts;
  const types = await compile(jsonSchema, interfaceName as string, {
    bannerComment,
    unknownAny,
    format,
  });
  return types;
};

export const jsonSchema2Types = compile;
export const joi2JsonSchema = transformer;
