/**
 * CreatedAt 2017-11-16 14:25:00 kst by kim ji woon
 */

module.exports = {
    ObjectStorage:{
        provider: 'openstack',
        useServiceCatalog: true,
        useInternal: false,
        keystoneAuthVersion: 'v3',
        authUrl: 'https://identity.open.softlayer.com',
        tenantId: 'your projectId',    //projectId from credentials
        domainId: 'your domainId',
        domainName: 'your domainName',
        username: 'your username',
        password: 'your password',
        region: 'dallas'   //dallas or london region
    }
};
