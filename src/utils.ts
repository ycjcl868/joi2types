import { Schema } from '@hapi/joi';

export const isSchema = (schema: Schema): boolean => {
  const any = schema && schema.type;
  if (!any) {
    return false;
  }

  return true;
};
