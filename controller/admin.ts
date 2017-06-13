import { AdminClient, AdminClientToCreate } from '../service/impl/client';
let createClient = async function (ctx, next) {
    let client = new AdminClientToCreate();
    
}

export {
    createClient
}