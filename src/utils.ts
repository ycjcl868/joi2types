import { JSONSchema4 } from 'json-schema';
import { Schema } from '@hapi/joi';

export interface SchemaType extends Pick<JSONSchema4, 'type' | 'properties' | 'enum' | 'items' | 'description' | 'required'> {

}

// export const filterMap = (schema: Schema): SchemaType => {
//   const joiTypesMap = {
//     alternatives: 'object',
//     function: 'object',
//   }
//   return {
//     type: joiTypesMap[schema.type || ''] || schema.type,
//     // @ts-ignore
//     properties: schema._ids && schema._ids._byKey,
//     // @ts-ignore
//     enum: schema._valids ? Array.from(schema._valids._values) : [],
//     items: schema.$_terms?.items && schema.$_terms.items.map((item: any) => {
//       if (item?.type) {
//         return { type: item.type }
//       }
//       return undefined;
//     }).filter(Boolean),
//     description: schema._flags?.description,
//     required: schema._flags?.presence === 'required' ? [] : false,
//   }
// }
