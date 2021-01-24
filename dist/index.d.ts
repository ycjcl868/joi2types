/// <reference types="hapi__joi" />
import type { Schema } from '@hapi/joi';
import { compile } from 'json-schema-to-typescript';
export interface Options {
    additionalProperties?: boolean;
    interfaceName?: string;
    bannerComment?: string;
    format?: boolean;
}
export declare const defaultOptions: {
    interfaceName: string;
    bannerComment: string;
    format: boolean;
};
declare const _default: (schema: Schema, options?: Options) => Promise<string>;
/**
 * convert into types
 */
export default _default;
export declare const jsonSchema2Types: typeof compile;
export declare const joi2JsonSchema: import("./transformer").Parser<Schema>;