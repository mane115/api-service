import ApiFilter from './api';
class FilterFactory {
    filter
    getFilter(type) {
        switch (type) {
            case 'api':
                this.filter = new ApiFilter()
                break;
        }
        return this.filter
    }
}

export {
    FilterFactory
}
export default FilterFactory;