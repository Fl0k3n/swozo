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
 * @interface SandboxUserDetailsDto
 */
export interface SandboxUserDetailsDto {
    /**
     * 
     * @type {string}
     * @memberof SandboxUserDetailsDto
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof SandboxUserDetailsDto
     */
    password: string;
}

export function SandboxUserDetailsDtoFromJSON(json: any): SandboxUserDetailsDto {
    return SandboxUserDetailsDtoFromJSONTyped(json, false);
}

export function SandboxUserDetailsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SandboxUserDetailsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function SandboxUserDetailsDtoToJSON(value?: SandboxUserDetailsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
    };
}
