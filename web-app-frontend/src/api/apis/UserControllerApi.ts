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
    CreateUserRequest,
    CreateUserRequestFromJSON,
    CreateUserRequestToJSON,
    MeDto,
    MeDtoFromJSON,
    MeDtoToJSON,
    RefreshTokenDto,
    RefreshTokenDtoFromJSON,
    RefreshTokenDtoToJSON,
    StorageAccessRequest,
    StorageAccessRequestFromJSON,
    StorageAccessRequestToJSON,
    UserAdminDetailsDto,
    UserAdminDetailsDtoFromJSON,
    UserAdminDetailsDtoToJSON,
    UserAdminSummaryDto,
    UserAdminSummaryDtoFromJSON,
    UserAdminSummaryDtoToJSON,
    UserDetailsDto,
    UserDetailsDtoFromJSON,
    UserDetailsDtoToJSON,
} from '../models';

export interface CreateUserOperationRequest {
    createUserRequest: CreateUserRequest;
}

export interface GetFavouriteFileDownloadRequestRequest {
    remoteFileId: number;
}

export interface GetUserDetailsForAdminRequest {
    userId: number;
}

export interface LogoutRequest {
    refreshTokenDto: RefreshTokenDto;
}

export interface SetFileAsFavouriteRequest {
    activityId: number;
    remoteFileId: number;
}

export interface SetUserRolesRequest {
    userId: number;
    requestBody: Array<string>;
}

export interface UnsetFileAsFavouriteRequest {
    remoteFileId: number;
}

/**
 * 
 */
export class UserControllerApi extends runtime.BaseAPI {

    /**
     */
    async createUserRaw(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<UserAdminDetailsDto>> {
        if (requestParameters.createUserRequest === null || requestParameters.createUserRequest === undefined) {
            throw new runtime.RequiredError('createUserRequest','Required parameter requestParameters.createUserRequest was null or undefined when calling createUser.');
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
            path: `/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateUserRequestToJSON(requestParameters.createUserRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserAdminDetailsDtoFromJSON(jsonValue));
    }

    /**
     */
    async createUser(requestParameters: CreateUserOperationRequest, initOverrides?: RequestInit): Promise<UserAdminDetailsDto> {
        const response = await this.createUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getFavouriteFileDownloadRequestRaw(requestParameters: GetFavouriteFileDownloadRequestRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<StorageAccessRequest>> {
        if (requestParameters.remoteFileId === null || requestParameters.remoteFileId === undefined) {
            throw new runtime.RequiredError('remoteFileId','Required parameter requestParameters.remoteFileId was null or undefined when calling getFavouriteFileDownloadRequest.');
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
            path: `/users/favourite/{remoteFileId}`.replace(`{${"remoteFileId"}}`, encodeURIComponent(String(requestParameters.remoteFileId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StorageAccessRequestFromJSON(jsonValue));
    }

    /**
     */
    async getFavouriteFileDownloadRequest(requestParameters: GetFavouriteFileDownloadRequestRequest, initOverrides?: RequestInit): Promise<StorageAccessRequest> {
        const response = await this.getFavouriteFileDownloadRequestRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getSystemAdminsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<UserDetailsDto>>> {
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
            path: `/users/admins`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserDetailsDtoFromJSON));
    }

    /**
     */
    async getSystemAdmins(initOverrides?: RequestInit): Promise<Array<UserDetailsDto>> {
        const response = await this.getSystemAdminsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getUserDetailsForAdminRaw(requestParameters: GetUserDetailsForAdminRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<UserAdminDetailsDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUserDetailsForAdmin.');
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
            path: `/users/details/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserAdminDetailsDtoFromJSON(jsonValue));
    }

    /**
     */
    async getUserDetailsForAdmin(requestParameters: GetUserDetailsForAdminRequest, initOverrides?: RequestInit): Promise<UserAdminDetailsDto> {
        const response = await this.getUserDetailsForAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getUserInfoRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<MeDto>> {
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
            path: `/users/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MeDtoFromJSON(jsonValue));
    }

    /**
     */
    async getUserInfo(initOverrides?: RequestInit): Promise<MeDto> {
        const response = await this.getUserInfoRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getUsersRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<UserAdminSummaryDto>>> {
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
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserAdminSummaryDtoFromJSON));
    }

    /**
     */
    async getUsers(initOverrides?: RequestInit): Promise<Array<UserAdminSummaryDto>> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async logoutRaw(requestParameters: LogoutRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.refreshTokenDto === null || requestParameters.refreshTokenDto === undefined) {
            throw new runtime.RequiredError('refreshTokenDto','Required parameter requestParameters.refreshTokenDto was null or undefined when calling logout.');
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
            path: `/users/me/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RefreshTokenDtoToJSON(requestParameters.refreshTokenDto),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async logout(requestParameters: LogoutRequest, initOverrides?: RequestInit): Promise<void> {
        await this.logoutRaw(requestParameters, initOverrides);
    }

    /**
     */
    async setFileAsFavouriteRaw(requestParameters: SetFileAsFavouriteRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<MeDto>> {
        if (requestParameters.activityId === null || requestParameters.activityId === undefined) {
            throw new runtime.RequiredError('activityId','Required parameter requestParameters.activityId was null or undefined when calling setFileAsFavourite.');
        }

        if (requestParameters.remoteFileId === null || requestParameters.remoteFileId === undefined) {
            throw new runtime.RequiredError('remoteFileId','Required parameter requestParameters.remoteFileId was null or undefined when calling setFileAsFavourite.');
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
            path: `/users/favourite/{activityId}/files/{remoteFileId}`.replace(`{${"activityId"}}`, encodeURIComponent(String(requestParameters.activityId))).replace(`{${"remoteFileId"}}`, encodeURIComponent(String(requestParameters.remoteFileId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MeDtoFromJSON(jsonValue));
    }

    /**
     */
    async setFileAsFavourite(requestParameters: SetFileAsFavouriteRequest, initOverrides?: RequestInit): Promise<MeDto> {
        const response = await this.setFileAsFavouriteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async setUserRolesRaw(requestParameters: SetUserRolesRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<UserAdminDetailsDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling setUserRoles.');
        }

        if (requestParameters.requestBody === null || requestParameters.requestBody === undefined) {
            throw new runtime.RequiredError('requestBody','Required parameter requestParameters.requestBody was null or undefined when calling setUserRoles.');
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
            path: `/users/roles/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.requestBody,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserAdminDetailsDtoFromJSON(jsonValue));
    }

    /**
     */
    async setUserRoles(requestParameters: SetUserRolesRequest, initOverrides?: RequestInit): Promise<UserAdminDetailsDto> {
        const response = await this.setUserRolesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async unsetFileAsFavouriteRaw(requestParameters: UnsetFileAsFavouriteRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<MeDto>> {
        if (requestParameters.remoteFileId === null || requestParameters.remoteFileId === undefined) {
            throw new runtime.RequiredError('remoteFileId','Required parameter requestParameters.remoteFileId was null or undefined when calling unsetFileAsFavourite.');
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
            path: `/users/favourite/{remoteFileId}`.replace(`{${"remoteFileId"}}`, encodeURIComponent(String(requestParameters.remoteFileId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MeDtoFromJSON(jsonValue));
    }

    /**
     */
    async unsetFileAsFavourite(requestParameters: UnsetFileAsFavouriteRequest, initOverrides?: RequestInit): Promise<MeDto> {
        const response = await this.unsetFileAsFavouriteRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
