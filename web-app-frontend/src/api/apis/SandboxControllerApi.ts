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


import * as runtime from '../runtime';
import {
    CreateSandboxEnvironmentRequest,
    CreateSandboxEnvironmentRequestFromJSON,
    CreateSandboxEnvironmentRequestToJSON,
    ServiceModuleSandboxDto,
    ServiceModuleSandboxDtoFromJSON,
    ServiceModuleSandboxDtoToJSON,
} from '../models';

export interface CreateServiceModuleTestingEnvironmentRequest {
    serviceModuleId: number;
    createSandboxEnvironmentRequest: CreateSandboxEnvironmentRequest;
}

/**
 * 
 */
export class SandboxControllerApi extends runtime.BaseAPI {

    /**
     */
    async createServiceModuleTestingEnvironmentRaw(requestParameters: CreateServiceModuleTestingEnvironmentRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ServiceModuleSandboxDto>> {
        if (requestParameters.serviceModuleId === null || requestParameters.serviceModuleId === undefined) {
            throw new runtime.RequiredError('serviceModuleId','Required parameter requestParameters.serviceModuleId was null or undefined when calling createServiceModuleTestingEnvironment.');
        }

        if (requestParameters.createSandboxEnvironmentRequest === null || requestParameters.createSandboxEnvironmentRequest === undefined) {
            throw new runtime.RequiredError('createSandboxEnvironmentRequest','Required parameter requestParameters.createSandboxEnvironmentRequest was null or undefined when calling createServiceModuleTestingEnvironment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/sandbox/{serviceModuleId}`.replace(`{${"serviceModuleId"}}`, encodeURIComponent(String(requestParameters.serviceModuleId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateSandboxEnvironmentRequestToJSON(requestParameters.createSandboxEnvironmentRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModuleSandboxDtoFromJSON(jsonValue));
    }

    /**
     */
    async createServiceModuleTestingEnvironment(requestParameters: CreateServiceModuleTestingEnvironmentRequest, initOverrides?: RequestInit): Promise<ServiceModuleSandboxDto> {
        const response = await this.createServiceModuleTestingEnvironmentRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
