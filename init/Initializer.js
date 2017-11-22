/**
 * CreatedAt 2017-11-16 14:07:00 kst
 * by kim ji woon
 *
 */

exports.InitMongoDB = (env,mongoose) => {

    if(!env.VCAP_SERVICES){
        /**
         * @TODO Local Initialization
         * Please Input ./credentials/credential.js
         */
        let credentials = require('../credentials/credential');
        const options = {
            useMongoClient:true,
            connectTimeoutMS: 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        let db = mongoose.connect(credentials.MongodbURI,options);
        db.on('error', (err) => {
            console.error(err);
        });
        db.on('connected', () => {
            console.log('connection is connected');
        });
        db.on('disconnected', (err) => {
            console.error(err);
        });
    }else{
        /**
         * @TODO Production Environment Initialization
         */
        let service = JSON.parse(env.mLabmongodb);
        let mongodb = service['mLab-mongodb'];
        let connection_string = mongodb[0].credentials.uri;

        /**
         * compose mongodb option
         * @type {{useMongoClient: boolean, connectTimeoutMS: number, keepAlive: boolean, ssl: boolean, sslValidate: boolean, sslCA: *, ha: boolean, reconnectTries: number}}
         */

        //mLab mongodb option
        const options = {
            useMongoClient:true,
            connectTimeoutMS: 4000,
            keepAlive:true,
            ha:true,
            autoReconnect:true,
            reconnectTries:30
        };
        let db = mongoose.connect(connection_string,options);
        db.on('error', (err) => {
            console.error(err);
        });
        db.on('connected', () => {
            console.log('connection is connected');
        });
        db.on('disconnected', (err) => {
            console.error(err);
        });

    }
};
exports.InitStorage = (env) => {
    if(!env.VCAP_SERVICES){
        /**
         * @TODO Local Initialization
         * Please Input ./credentials/credential.js
         */
        const credentials = require('../credentials/credential');
        const pkgcloud = require('pkgcloud');
        let storageClient = pkgcloud.storage.createClient(credentials.ObjectStorage);
        storageClient.auth((err) => {
            if(err){
                console.error(err);
            }
        });
        return storageClient;
    }else{
        /**
         * @TODO Production Environment Initialization
         */
        const service = JSON.parse(env.VCAP_SERVICES);
        const objectstorage = service['Object-Storage'];
        const auth_url = objectstorage[0].credentials.auth_url;
        const tenantId = objectstorage[0].credentials.projectId;
        const domainId = objectstorage[0].credentials.domainId;
        const domainName = objectstorage[0].credentials.domainName;
        const username = objectstorage[0].credentials.username;
        const password = objectstorage[0].credentials.password;
        const region = objectstorage[0].credentials.region;
        const pkgcloud = require('pkgcloud');

        const config = {
            provider: 'openstack',
            useServiceCatalog: true,
            useInternal: false,
            keystoneAuthVersion: 'v3',
            authUrl: auth_url,
            tenantId: tenantId,    //projectId from credentials
            domainId: domainId,
            domainName: domainName,
            username: username,
            password: password,
            region: region   //dallas or london region
        };
        
        let storageClient = pkgcloud.storage.createClient(config);
        storageClient.auth((err) => {
            if(err){
                console.error(err);
            }
        });
        return storageClient;
    }
}