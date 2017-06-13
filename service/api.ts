interface Base {
    url: string,
    method: string,
    headers: any,
    name: string,
    body?: any
}
interface GroupInfo {
    collection: string,
    baseUrl: string,
    host: string
}
interface Update {
    url?: string,
    method?: string,
    headers?: any,
    body?: any
}
interface CreateBehavior {
    create(): Promise<any>
}
interface UpdateBehavior {
    update(update: Update, option?): Promise<any>
    save(option?): Promise<any>
}
interface RemoveBehavior {
    remove(): Promise<any>
}
interface GetListBehavior {
    findByCollection(collectionId: string): Promise<[any]>
}
interface GetSingleBehavior {
    findById(id?): Promise<any>,
}
interface RequestBehavior {
    pre?(): Promise<any>,
    request(): Promise<any>,
    after?(): Promise<any>
}
export {
    Base,
    GroupInfo,
    CreateBehavior,
    UpdateBehavior,
    RemoveBehavior,
    GetListBehavior,
    GetSingleBehavior,
    RequestBehavior
}