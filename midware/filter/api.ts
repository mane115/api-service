import ERROR from '../../common/error.map';
class CreateFilter {
    static validate(body) {
        if (!body.collectionId || !body.url || !body.method || !body.name) {
            throw ERROR.DATA.REQUIRE()
        }
    }
};
class UpdateFilter {
    static validate(body) {
        if (!body.url && !body.method && !body.name) {
            throw ERROR.DATA.REQUIRE()
        }
    }
}
class Filter {
    validator;
    validate(type) {
        switch (type) {
            case 'create':
                this.validator = CreateFilter
                break;
            case 'update':
                this.validator = CreateFilter
                break;
        }
        return async function (ctx, next) {
            this.validator.validate(ctx.request.body);
            await next()
        }
    }
}


export default Filter