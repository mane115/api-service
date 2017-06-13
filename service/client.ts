interface Base {
    client_id: string,
    client_secret: string
}
interface Info extends Base {
    status: number,
    create_at: number,
    update_at: number
}
interface Create {
    create(): Promise<Base>
}
interface Refresh {
    refresh(clientId: string): Promise<Base>
}
interface Remove {
    remove(id: string, secret: string): Promise<Base>
}
interface FindById {
    findById(id): Promise<Base>
}
interface Verify {
    verify(clientSecret: string): Promise<boolean>,
}
export {
    Base,
    Create,
    Refresh,
    Remove,
    FindById,
    Verify
}