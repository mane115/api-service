interface Base {
    response: string,
    response_type: string
}
interface SaveBehavior {
    save(): Promise<any>
}
export {
    Base,
    SaveBehavior
}