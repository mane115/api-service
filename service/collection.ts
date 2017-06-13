interface Base {
    name: string;
    host: string;
    base_url: string
}
interface Update {
    name?: string;
    host?: string;
    base_url?: string
}
interface CreateBehavior {
    create(): Promise<any>
}
interface UpdateBehavior {
    update(update: Update, option?: any): Promise<any>;
    save(option?: any): Promise<any>;
}
interface GetListBehavior {
    findList(condition, page: number, limit?: number): Promise<[any]>
}
interface GetSingleBehavior {
    findById(id?: string): Promise<any>,
}

export {
    Base,
    Update,
    CreateBehavior,
    UpdateBehavior,
    GetListBehavior,
    GetSingleBehavior,
}