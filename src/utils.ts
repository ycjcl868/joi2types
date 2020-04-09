import { Schema } from '@hapi/joi';

export const isSchema = (schema: Schema): boolean => {
  const any = schema && schema[exports.symbols.any];
  if (!any) {
    return false;
  }

  return true;
};
