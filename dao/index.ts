interface Dao {
    findById(id: string | number, option?: any): Promise<any>,
    find(condition: any, option?: any): Promise<any>,
    updateById(id: string, update: any, option?: any): Promise<any>,
    updateByCondition(condition: any, update: any, option?: any): Promise<any>,
    create(doc: any, option?: any): Promise<any>,
    findList(condition: any, page: number, limit: number, sortBy?: string, sortType?: string): Promise<[any]>
}
export default Dao;
export { Dao }
