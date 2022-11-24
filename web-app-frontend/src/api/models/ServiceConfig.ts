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
import {
    ParameterDescription,
    ParameterDescriptionFromJSON,
    ParameterDescriptionFromJSONTyped,
    ParameterDescriptionToJSON,
} from './ParameterDescription';

/**
 * 
 * @export
 * @interface ServiceConfig
 */
export interface ServiceConfig {
    /**
     * 
     * @type {string}
     * @memberof ServiceConfig
     */
    serviceName: string;
    /**
     * 
     * @type {Array<ParameterDescription>}
     * @memberof ServiceConfig
     */
    parameterDescriptions: Array<ParameterDescription>;
    /**
     * 
     * @type {Set<string>}
     * @memberof ServiceConfig
     */
    isolationModes: Set<ServiceConfigIsolationModesEnum>;
}

/**
* @export
* @enum {string}
*/
export enum ServiceConfigIsolationModesEnum {
    Shared = 'SHARED',
    Isolated = 'ISOLATED'
}

export function ServiceConfigFromJSON(json: any): ServiceConfig {
    return ServiceConfigFromJSONTyped(json, false);
}

export function ServiceConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'serviceName': json['serviceName'],
        'parameterDescriptions': ((json['parameterDescriptions'] as Array<any>).map(ParameterDescriptionFromJSON)),
        'isolationModes': json['isolationModes'],
    };
}

export function ServiceConfigToJSON(value?: ServiceConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'serviceName': value.serviceName,
        'parameterDescriptions': ((value.parameterDescriptions as Array<any>).map(ParameterDescriptionToJSON)),
        'isolationModes': value.isolationModes,
    };
}

