import type { Schema } from '@hapi/joi';
import type { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';

import transformer from './transformer';

export interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
  format?: boolean;
}

export const defaultOptions = {
  interfaceName: 'JoiTypes',
  bannerComment: '',
  format: false,
};

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options };
  const jsonSchema: JSONSchema4 = transformer(schema, opts);
  const { bannerComment, interfaceName, format } = opts;
  const types = await compile(jsonSchema, interfaceName as string, {
    bannerComment,
    unknownAny: false,
    format,
  });
  return types;
};

export const jsonSchema2Types = compile;
export const joi2JsonSchema = transformer;
