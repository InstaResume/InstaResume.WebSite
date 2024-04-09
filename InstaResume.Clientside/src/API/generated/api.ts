/* tslint:disable */
/* eslint-disable */
/**
 * InstaResume.WebApi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';


/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [username] 
         * @param {string} [role] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLoginGet: async (username?: string, role?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (username !== undefined) {
                localVarQueryParameter['username'] = username;
            }

            if (role !== undefined) {
                localVarQueryParameter['role'] = role;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authOauthCallbackGet: async (returnUrl?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Auth/oauth/callback`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (returnUrl !== undefined) {
                localVarQueryParameter['returnUrl'] = returnUrl;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [provider] 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authOauthGet: async (provider?: string, returnUrl?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Auth/oauth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (provider !== undefined) {
                localVarQueryParameter['provider'] = provider;
            }

            if (returnUrl !== undefined) {
                localVarQueryParameter['returnUrl'] = returnUrl;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        privilegeGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/privilege`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} [username] 
         * @param {string} [role] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authLoginGet(username?: string, role?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authLoginGet(username, role, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authOauthCallbackGet(returnUrl?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authOauthCallbackGet(returnUrl, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [provider] 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authOauthGet(provider?: string, returnUrl?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authOauthGet(provider, returnUrl, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async privilegeGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.privilegeGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthApiFp(configuration)
    return {
        /**
         * 
         * @param {string} [username] 
         * @param {string} [role] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authLoginGet(username?: string, role?: string, options?: any): AxiosPromise<void> {
            return localVarFp.authLoginGet(username, role, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authOauthCallbackGet(returnUrl?: string, options?: any): AxiosPromise<void> {
            return localVarFp.authOauthCallbackGet(returnUrl, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [provider] 
         * @param {string} [returnUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authOauthGet(provider?: string, returnUrl?: string, options?: any): AxiosPromise<void> {
            return localVarFp.authOauthGet(provider, returnUrl, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        privilegeGet(options?: any): AxiosPromise<void> {
            return localVarFp.privilegeGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userGet(options?: any): AxiosPromise<void> {
            return localVarFp.userGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @param {string} [username] 
     * @param {string} [role] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authLoginGet(username?: string, role?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authLoginGet(username, role, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [returnUrl] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authOauthCallbackGet(returnUrl?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authOauthCallbackGet(returnUrl, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {string} [provider] 
     * @param {string} [returnUrl] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public authOauthGet(provider?: string, returnUrl?: string, options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).authOauthGet(provider, returnUrl, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public privilegeGet(options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).privilegeGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public userGet(options?: AxiosRequestConfig) {
        return AuthApiFp(this.configuration).userGet(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * HealthApi - axios parameter creator
 * @export
 */
export const HealthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        healthGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/Health`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HealthApi - functional programming interface
 * @export
 */
export const HealthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async healthGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.healthGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * HealthApi - factory interface
 * @export
 */
export const HealthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        healthGet(options?: any): AxiosPromise<void> {
            return localVarFp.healthGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthApi - object-oriented interface
 * @export
 * @class HealthApi
 * @extends {BaseAPI}
 */
export class HealthApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthApi
     */
    public healthGet(options?: AxiosRequestConfig) {
        return HealthApiFp(this.configuration).healthGet(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * ResumeCreationApi - axios parameter creator
 * @export
 */
export const ResumeCreationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resumeCreationGet: async (name?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/ResumeCreation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resumeCreationPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/ResumeCreation`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ResumeCreationApi - functional programming interface
 * @export
 */
export const ResumeCreationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ResumeCreationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resumeCreationGet(name?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resumeCreationGet(name, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resumeCreationPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resumeCreationPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ResumeCreationApi - factory interface
 * @export
 */
export const ResumeCreationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ResumeCreationApiFp(configuration)
    return {
        /**
         * 
         * @param {string} [name] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resumeCreationGet(name?: string, options?: any): AxiosPromise<void> {
            return localVarFp.resumeCreationGet(name, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resumeCreationPost(options?: any): AxiosPromise<void> {
            return localVarFp.resumeCreationPost(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ResumeCreationApi - object-oriented interface
 * @export
 * @class ResumeCreationApi
 * @extends {BaseAPI}
 */
export class ResumeCreationApi extends BaseAPI {
    /**
     * 
     * @param {string} [name] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResumeCreationApi
     */
    public resumeCreationGet(name?: string, options?: AxiosRequestConfig) {
        return ResumeCreationApiFp(this.configuration).resumeCreationGet(name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResumeCreationApi
     */
    public resumeCreationPost(options?: AxiosRequestConfig) {
        return ResumeCreationApiFp(this.configuration).resumeCreationPost(options).then((request) => request(this.axios, this.basePath));
    }
}

