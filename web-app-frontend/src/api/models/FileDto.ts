/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface FileDto
 */
export interface FileDto {
    /**
     * 
     * @type {number}
     * @memberof FileDto
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof FileDto
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof FileDto
     */
    sizeBytes: number;
    /**
     * 
     * @type {Date}
     * @memberof FileDto
     */
    createdAt: Date;
}

export function FileDtoFromJSON(json: any): FileDto {
    return FileDtoFromJSONTyped(json, false);
}

export function FileDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FileDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'sizeBytes': json['sizeBytes'],
        'createdAt': (new Date(json['createdAt'])),
    };
}

export function FileDtoToJSON(value?: FileDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'sizeBytes': value.sizeBytes,
        'createdAt': (value.createdAt.toISOString()),
    };
}

