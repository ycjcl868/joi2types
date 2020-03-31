import { Schema } from '@hapi/joi';

const filterMap = (schema: Schema) => ({
  type: schema.type,
  // @ts-ignore
  properties: schema._ids && schema._ids._byKey,
  // @ts-ignore
  enums: schema._valids ? Array.from(schema._valids._values) : [],
  items: schema.$_terms?.items && schema.$_terms.items.map((item: any) => {
    if (item?.type) {
      return { type: item.type }
    }
    return undefined;
  }).filter(Boolean),
  description: schema._flags?.description,
})

export default (schema: Schema, options = {}) => {
  const { type, properties, enums, items: originItems, description } = filterMap(schema);
  let items = originItems;
  if (items?.length === 1) {
    items = items[0];
  }
  const jsonType = {
    type,
    ...(enums?.length > 0 ? { enum: enums } : {}),
    ...((items?.length > 0 || items?.type) ? { items } : {}),
    ...(description ? { description } : {}),
  }
  if (type === 'object') {
    const recursive = (properties: any, initValue = {}) => {
      if (properties?.forEach) {
        // @ts-ignore
        properties?.forEach((value, key) => {
          const { type, properties, enums, description } = filterMap(value.schema || value);
          const property = {
            type,
            ...(description ? { description } : {})
          };
          if (enums?.length) {
            // @ts-ignore
            property.enum = enums;
          }
          initValue[key] = property
          if (type === 'object') {
            initValue[key].properties = {};
            if ('additionalProperties' in options) {
              // @ts-ignore
              initValue[key].additionalProperties = options.additionalProperties;
            }
            recursive(properties, initValue[key].properties);
          }
        })
      }
      // console.log('obj', obj);
      return initValue;
    }

    if ('additionalProperties' in options) {
      // @ts-ignore
      jsonType.additionalProperties = options.additionalProperties;
    }

    if (properties?.size > 0) {
      // @ts-ignore
      jsonType.properties = {};
      // @ts-ignore
      recursive(properties, jsonType.properties)
    }
  }
  return jsonType;
}
