import { isPhone } from 'brazilian-values';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const validate = (value: unknown) => {
    if (typeof value !== 'string') {
        throw new TypeError(`Value is not string: ${value}`);
    }

    if (!isPhone(value)) {
        throw new TypeError(`Value is not a valid phone: ${value}`);
    }

    return value;
};

export const PhoneScalar = new GraphQLScalarType({
    name: 'Phone',
    description: 'Phone custom scalar type',
    parseValue(value) {
        return validate(value);
    },

    serialize(value) {
        return validate(value);
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as a Phone but got a: ${ast.kind}`,
            );
        }

        return validate(ast.value);
    },
});
