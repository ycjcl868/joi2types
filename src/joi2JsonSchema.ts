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
  }).filter((item: any) => item),
})

export default (schema: Schema, options = {}) => {
  // console.log('schema', schema)
  const { type, properties, enums, items: originItems } = filterMap(schema);
  let items = originItems;
  if (items?.length === 1) {
    items = items[0];
  }
  const jsonType = {
    type,
    ...(enums?.length > 0 ? { enum: enums } : {}),
    ...((items?.length > 0 || typeof items === 'object') ? { items } : {})
  }
  if (type === 'object') {
    const recursive = (properties: any, initValue = {}) => {
      if (properties?.forEach) {
        // @ts-ignore
        properties?.forEach((value, key) => {
          const { type, properties, enums  } = filterMap(value.schema || value);
          const property = { type };
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

    // @ts-ignore
    if (properties?.size > 0) {
      jsonType.properties = {};
      // @ts-ignore
      recursive(properties, jsonType.properties)
    }
    if ('additionalProperties' in options) {
      // @ts-ignore
      jsonType.additionalProperties = options.additionalProperties;
    }
  }
  return jsonType;
}
