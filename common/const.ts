enum clientStatus {
    active = 0,
    ban
}
enum apiStatus {
    active = 0,
}
enum apiType {
    base = 0
}
export const type = {
    api: apiType
}
export const status = {
    client: clientStatus,
    api: apiStatus
}
export const limit = {
    collection: 10
}
export const http_protocol = 'http://'