/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ContainerController } from './../controllers/container.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Dockerode.Port": {
        "dataType": "refObject",
        "properties": {
            "IP": {"dataType":"string","required":true},
            "PrivatePort": {"dataType":"double","required":true},
            "PublicPort": {"dataType":"double","required":true},
            "Type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dockerode.NetworkInfo": {
        "dataType": "refObject",
        "properties": {
            "IPAMConfig": {"dataType":"any"},
            "Links": {"dataType":"any"},
            "Aliases": {"dataType":"any"},
            "NetworkID": {"dataType":"string","required":true},
            "EndpointID": {"dataType":"string","required":true},
            "Gateway": {"dataType":"string","required":true},
            "IPAddress": {"dataType":"string","required":true},
            "IPPrefixLen": {"dataType":"double","required":true},
            "IPv6Gateway": {"dataType":"string","required":true},
            "GlobalIPv6Address": {"dataType":"string","required":true},
            "GlobalIPv6PrefixLen": {"dataType":"double","required":true},
            "MacAddress": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dockerode.ContainerInfo": {
        "dataType": "refObject",
        "properties": {
            "Id": {"dataType":"string","required":true},
            "Names": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "Image": {"dataType":"string","required":true},
            "ImageID": {"dataType":"string","required":true},
            "Command": {"dataType":"string","required":true},
            "Created": {"dataType":"double","required":true},
            "Ports": {"dataType":"array","array":{"dataType":"refObject","ref":"Dockerode.Port"},"required":true},
            "Labels": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"},"required":true},
            "State": {"dataType":"string","required":true},
            "Status": {"dataType":"string","required":true},
            "HostConfig": {"dataType":"nestedObjectLiteral","nestedProperties":{"NetworkMode":{"dataType":"string","required":true}},"required":true},
            "NetworkSettings": {"dataType":"nestedObjectLiteral","nestedProperties":{"Networks":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"Dockerode.NetworkInfo"},"required":true}},"required":true},
            "Mounts": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"Propagation":{"dataType":"string","required":true},"RW":{"dataType":"boolean","required":true},"Mode":{"dataType":"string","required":true},"Driver":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]},"Destination":{"dataType":"string","required":true},"Source":{"dataType":"string","required":true},"Type":{"dataType":"string","required":true},"Name":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"undefined"}]}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContainerResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsContainerController_listContainers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/containers',
            ...(fetchMiddlewares<RequestHandler>(ContainerController)),
            ...(fetchMiddlewares<RequestHandler>(ContainerController.prototype.listContainers)),

            async function ContainerController_listContainers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContainerController_listContainers, request, response });

                const controller = new ContainerController();

              await templateService.apiHandler({
                methodName: 'listContainers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContainerController_startContainer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.post('/containers/:id/start',
            ...(fetchMiddlewares<RequestHandler>(ContainerController)),
            ...(fetchMiddlewares<RequestHandler>(ContainerController.prototype.startContainer)),

            async function ContainerController_startContainer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContainerController_startContainer, request, response });

                const controller = new ContainerController();

              await templateService.apiHandler({
                methodName: 'startContainer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContainerController_stopContainer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.post('/containers/:id/stop',
            ...(fetchMiddlewares<RequestHandler>(ContainerController)),
            ...(fetchMiddlewares<RequestHandler>(ContainerController.prototype.stopContainer)),

            async function ContainerController_stopContainer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContainerController_stopContainer, request, response });

                const controller = new ContainerController();

              await templateService.apiHandler({
                methodName: 'stopContainer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContainerController_restartContainer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.post('/containers/:id/restart',
            ...(fetchMiddlewares<RequestHandler>(ContainerController)),
            ...(fetchMiddlewares<RequestHandler>(ContainerController.prototype.restartContainer)),

            async function ContainerController_restartContainer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContainerController_restartContainer, request, response });

                const controller = new ContainerController();

              await templateService.apiHandler({
                methodName: 'restartContainer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsContainerController_killContainer: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.post('/containers/:id/kill',
            ...(fetchMiddlewares<RequestHandler>(ContainerController)),
            ...(fetchMiddlewares<RequestHandler>(ContainerController.prototype.killContainer)),

            async function ContainerController_killContainer(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsContainerController_killContainer, request, response });

                const controller = new ContainerController();

              await templateService.apiHandler({
                methodName: 'killContainer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
