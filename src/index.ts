import { Schema } from '@hapi/joi';
import { compile } from 'json-schema-to-typescript'
import convert from './joi2JsonSchema';

interface Options {
  additionalProperties?: boolean;
  interfaceName?: string;
  bannerComment?: string;
}

const defaultOptions = {
  additionalProperties: false,
  interfaceName: 'JoiTypes',
  bannerComment: '',
}

/**
 * convert into types
 */
export default async (schema: Schema, options: Options = defaultOptions) => {
  const jsonSchema: any = convert(schema, options);
  const types = await compile(jsonSchema, options.interfaceName as string, options);
  return types;
}

export const jsonSchema2Types = compile;
export const joi2JsonSchema = convert;
