const helpers = () => {
    return {
        inc: value => parseInt(value) + 1,

        ifCond: (v1, operator, v2, options) => {
            switch (operator) {
                case '==':
                    return v1 == v2 ? options.fn(this) : options.inverse(this);
                case '===':
                    return v1 === v2 ? options.fn(this) : options.inverse(this);
                case '!=':
                    return v1 != v2 ? options.fn(this) : options.inverse(this);
                case '!==':
                    return v1 !== v2 ? options.fn(this) : options.inverse(this);
                case '<':
                    return v1 < v2 ? options.fn(this) : options.inverse(this);
                case '<=':
                    return v1 <= v2 ? options.fn(this) : options.inverse(this);
                case '>':
                    return v1 > v2 ? options.fn(this) : options.inverse(this);
                case '>=':
                    return v1 >= v2 ? options.fn(this) : options.inverse(this);
                case '&&':
                    return v1 && v2 ? options.fn(this) : options.inverse(this);
                case '||':
                    return v1 || v2 ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        },
        stringify: data => JSON.stringify(data)
    };
};

module.exports = helpers;
