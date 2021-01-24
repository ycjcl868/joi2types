import type { Schema } from '@hapi/joi';
import type { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';

import transformer from './transformer';

export interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
}

export const defaultOptions = {
  interfaceName: 'JoiTypes',
  bannerComment: '',
};

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const opts = { ...defaultOptions, ...options };
  const jsonSchema: JSONSchema4 = transformer(schema, opts);
  const { bannerComment, interfaceName } = opts;
  const types = await compile(jsonSchema, interfaceName as string, {
    bannerComment,
    unknownAny: false,
    // not using prettier, bundled will increase 9M in package
    format: false,
  });
  return types;
};

export const jsonSchema2Types = compile;
export const joi2JsonSchema = transformer;
