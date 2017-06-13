interface ErrorRes {
    code: number,
    message: string
}
const ERROR = {
    API: {

    },
    DATA: {
        REQUIRE: (data = 'data') => {
            let res: ErrorRes = {
                code: 11001,
                message: `${data} require`
            };
            return res
        },
        INVALID: (data = 'data') => {
            let res: ErrorRes = {
                code: 11002,
                message: `invalid ${data}`
            };
            return res
        }
    }
};
export default ERROR;
export {
    ERROR
}