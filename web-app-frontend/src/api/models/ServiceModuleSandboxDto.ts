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
    CourseDetailsDto,
    CourseDetailsDtoFromJSON,
    CourseDetailsDtoFromJSONTyped,
    CourseDetailsDtoToJSON,
} from './CourseDetailsDto';
import {
    SandboxUserDetailsDto,
    SandboxUserDetailsDtoFromJSON,
    SandboxUserDetailsDtoFromJSONTyped,
    SandboxUserDetailsDtoToJSON,
} from './SandboxUserDetailsDto';

/**
 * 
 * @export
 * @interface ServiceModuleSandboxDto
 */
export interface ServiceModuleSandboxDto {
    /**
     * 
     * @type {CourseDetailsDto}
     * @memberof ServiceModuleSandboxDto
     */
    courseDetailsDto: CourseDetailsDto;
    /**
     * 
     * @type {Array<SandboxUserDetailsDto>}
     * @memberof ServiceModuleSandboxDto
     */
    sandboxStudents: Array<SandboxUserDetailsDto>;
    /**
     * 
     * @type {Date}
     * @memberof ServiceModuleSandboxDto
     */
    validTo: Date;
}

export function ServiceModuleSandboxDtoFromJSON(json: any): ServiceModuleSandboxDto {
    return ServiceModuleSandboxDtoFromJSONTyped(json, false);
}

export function ServiceModuleSandboxDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ServiceModuleSandboxDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'courseDetailsDto': CourseDetailsDtoFromJSON(json['courseDetailsDto']),
        'sandboxStudents': ((json['sandboxStudents'] as Array<any>).map(SandboxUserDetailsDtoFromJSON)),
        'validTo': (new Date(json['validTo'])),
    };
}

export function ServiceModuleSandboxDtoToJSON(value?: ServiceModuleSandboxDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'courseDetailsDto': CourseDetailsDtoToJSON(value.courseDetailsDto),
        'sandboxStudents': ((value.sandboxStudents as Array<any>).map(SandboxUserDetailsDtoToJSON)),
        'validTo': (value.validTo.toISOString()),
    };
}
