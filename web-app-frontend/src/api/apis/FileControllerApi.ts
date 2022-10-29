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
    StorageAccessRequest,
    StorageAccessRequestFromJSON,
    StorageAccessRequestToJSON,
} from '../models';

export interface GetDownloadSignedAccessRequestExternalRequest {
    remoteFileId: number;
}

/**
 * 
 */
export class FileControllerApi extends runtime.BaseAPI {

    /**
     */
    async getDownloadSignedAccessRequestExternalRaw(requestParameters: GetDownloadSignedAccessRequestExternalRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<StorageAccessRequest>> {
        if (requestParameters.remoteFileId === null || requestParameters.remoteFileId === undefined) {
            throw new runtime.RequiredError('remoteFileId','Required parameter requestParameters.remoteFileId was null or undefined when calling getDownloadSignedAccessRequestExternal.');
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
            path: `/files/external/download/{remoteFileId}`.replace(`{${"remoteFileId"}}`, encodeURIComponent(String(requestParameters.remoteFileId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StorageAccessRequestFromJSON(jsonValue));
    }

    /**
     */
    async getDownloadSignedAccessRequestExternal(requestParameters: GetDownloadSignedAccessRequestExternalRequest, initOverrides?: RequestInit): Promise<StorageAccessRequest> {
        const response = await this.getDownloadSignedAccessRequestExternalRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
