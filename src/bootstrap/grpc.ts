import { Options, PackageDefinition, loadSync } from '@grpc/proto-loader';
import {
    Server,
    GrpcObject,
    loadPackageDefinition,
    ServerCredentials
} from '@grpc/grpc-js';
import path from 'path';
import { routes } from './../routes/routes';

// import { config } from '../providers/aws/secret-manager';
// import { Config } from '../interfaces/config';
// import * as dotenv from 'dotenv';

import { GRPC } from '../commons/constants';
import { logger } from '../utils/logger';
// dotenv.config();

export class Grpc {
    private grpcPort = 50000;
    private protoFilePath = './user.proto';
    public userPackage: any;
    public grpcServer: Server;
    constructor() {
        this.grpcServer = new Server();

        this.startGrpcServer();
    }

    /**
     * @description Initiate Grpc Server
     */
    private startGrpcServer() {
        this.loadProtoFile();
        this.loadServiceDefinition();
        this.initialiseGrpcServer();
    }

    /**
     * @description Load Proto file for User Service
     */
    private loadProtoFile(): void {
        const protoOptions: Options = GRPC.PROTO_FILE_OPTIONS;

        const packageDefinition: PackageDefinition = loadSync(
            path.resolve(__dirname, this.protoFilePath),
            protoOptions
        );

        const grpcObject: GrpcObject = loadPackageDefinition(packageDefinition);
        this.userPackage = grpcObject.userPackage;
    }

    /**
     * @description Expose User services
     */
    private loadServiceDefinition(): void { // server.addservice(server ,{} )

        this.grpcServer.addService(this.userPackage.Profile.service, {
            GetOrder: (call: any, callback: any) => {
                console.log(call.request,'REQEST DATA');
                
                let response = 100;
                callback(null, {status:"CART"});
            },
        })



    }

    /**
     * @description initialise Grpc Server
     */
    private initialiseGrpcServer(): void {
        this.grpcServer.bindAsync(
            `127.0.0.1:${this.grpcPort}`,
            ServerCredentials.createInsecure(),
            this.grpcCallback
        );
    }

    /**
     * @description handler for Grpc server when initialising server
     * @param {Error} err
     * @param {number} port
     * @returns {void}
     */
    private grpcCallback = (err: Error | null, port: number): void => {
        if (err) {
            console.error(err);
            return;
        }
        this.grpcServer.start();
        logger.info(`gRPC server listening on ${port}`);
    };
}

//loading the proto files that contains schema of proto files 
//essentially all boiler plate code for the grpc server 
