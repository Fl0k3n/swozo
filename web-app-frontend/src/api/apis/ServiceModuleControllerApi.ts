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
    FinishServiceModuleCreationRequest,
    FinishServiceModuleCreationRequestFromJSON,
    FinishServiceModuleCreationRequestToJSON,
    ReserveServiceModuleRequest,
    ReserveServiceModuleRequestFromJSON,
    ReserveServiceModuleRequestToJSON,
    ServiceConfig,
    ServiceConfigFromJSON,
    ServiceConfigToJSON,
    ServiceModuleDetailsDto,
    ServiceModuleDetailsDtoFromJSON,
    ServiceModuleDetailsDtoToJSON,
    ServiceModuleReservationDto,
    ServiceModuleReservationDtoFromJSON,
    ServiceModuleReservationDtoToJSON,
    ServiceModuleSummaryDto,
    ServiceModuleSummaryDtoFromJSON,
    ServiceModuleSummaryDtoToJSON,
} from '../models';

export interface FinishServiceModuleCreationOperationRequest {
    finishServiceModuleCreationRequest: FinishServiceModuleCreationRequest;
}

export interface GetServiceModuleRequest {
    id: number;
}

export interface InitServiceModuleCreationRequest {
    reserveServiceModuleRequest: ReserveServiceModuleRequest;
}

/**
 * 
 */
export class ServiceModuleControllerApi extends runtime.BaseAPI {

    /**
     */
    async finishServiceModuleCreationRaw(requestParameters: FinishServiceModuleCreationOperationRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ServiceModuleDetailsDto>> {
        if (requestParameters.finishServiceModuleCreationRequest === null || requestParameters.finishServiceModuleCreationRequest === undefined) {
            throw new runtime.RequiredError('finishServiceModuleCreationRequest','Required parameter requestParameters.finishServiceModuleCreationRequest was null or undefined when calling finishServiceModuleCreation.');
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
            path: `/service-modules`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: FinishServiceModuleCreationRequestToJSON(requestParameters.finishServiceModuleCreationRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModuleDetailsDtoFromJSON(jsonValue));
    }

    /**
     */
    async finishServiceModuleCreation(requestParameters: FinishServiceModuleCreationOperationRequest, initOverrides?: RequestInit): Promise<ServiceModuleDetailsDto> {
        const response = await this.finishServiceModuleCreationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getModuleListRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ServiceModuleDetailsDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/all-system-modules`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModuleDetailsDtoFromJSON));
    }

    /**
     */
    async getModuleList(initOverrides?: RequestInit): Promise<Array<ServiceModuleDetailsDto>> {
        const response = await this.getModuleListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getModuleSummaryListRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ServiceModuleSummaryDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/summary`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModuleSummaryDtoFromJSON));
    }

    /**
     */
    async getModuleSummaryList(initOverrides?: RequestInit): Promise<Array<ServiceModuleSummaryDto>> {
        const response = await this.getModuleSummaryListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getServiceModuleRaw(requestParameters: GetServiceModuleRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ServiceModuleDetailsDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getServiceModule.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModuleDetailsDtoFromJSON(jsonValue));
    }

    /**
     */
    async getServiceModule(requestParameters: GetServiceModuleRequest, initOverrides?: RequestInit): Promise<ServiceModuleDetailsDto> {
        const response = await this.getServiceModuleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getSupportedServicesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ServiceConfig>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/config`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceConfigFromJSON));
    }

    /**
     */
    async getSupportedServices(initOverrides?: RequestInit): Promise<Array<ServiceConfig>> {
        const response = await this.getSupportedServicesRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getUserModulesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ServiceModuleDetailsDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/user`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModuleDetailsDtoFromJSON));
    }

    /**
     */
    async getUserModules(initOverrides?: RequestInit): Promise<Array<ServiceModuleDetailsDto>> {
        const response = await this.getUserModulesRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getUserModulesSummaryRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<ServiceModuleSummaryDto>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("JWT_AUTH", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/service-modules/user/summary`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ServiceModuleSummaryDtoFromJSON));
    }

    /**
     */
    async getUserModulesSummary(initOverrides?: RequestInit): Promise<Array<ServiceModuleSummaryDto>> {
        const response = await this.getUserModulesSummaryRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async initServiceModuleCreationRaw(requestParameters: InitServiceModuleCreationRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<ServiceModuleReservationDto>> {
        if (requestParameters.reserveServiceModuleRequest === null || requestParameters.reserveServiceModuleRequest === undefined) {
            throw new runtime.RequiredError('reserveServiceModuleRequest','Required parameter requestParameters.reserveServiceModuleRequest was null or undefined when calling initServiceModuleCreation.');
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
            path: `/service-modules`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ReserveServiceModuleRequestToJSON(requestParameters.reserveServiceModuleRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ServiceModuleReservationDtoFromJSON(jsonValue));
    }

    /**
     */
    async initServiceModuleCreation(requestParameters: InitServiceModuleCreationRequest, initOverrides?: RequestInit): Promise<ServiceModuleReservationDto> {
        const response = await this.initServiceModuleCreationRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
