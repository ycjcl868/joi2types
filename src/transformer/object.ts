import { ObjectSchema } from '@hapi/joi';

import transformer, { Parser } from './';

// @ts-ignore
const parser: Parser<ObjectSchema> = (schema, options) => {
  const {
    type,
    $_terms,
    // @ts-ignore
    _flags: {
      description,
      presence,
      unknown,
    } = {},
    // @ts-ignore
    _ids: { _byKey } = {},
  } = schema;

  const properties = ($_terms?.keys || []).map((propertySchema: any) => {
    const { key, schema } = propertySchema;
    return {
      key,
      property: transformer(schema, options),
    };
  }).reduce((acc: any, curr: any) => ({
    ...acc,
    [curr.key]: curr.property,
  }), $_terms?.keys ? {} : null);

  return {
    type,
    ...(properties ? { properties } : {}),
    ...(description ? { description } : {}),
    ...(presence === 'required' && _byKey?.size > 0 ? { required: Array.from(_byKey.keys()) } : {}),
    ...(unknown ? { additionalProperties: true } : {}),
  }
}

export default parser;
