import { isCEP } from 'brazilian-values';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const validate = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!isCEP(value)) {
    throw new TypeError(`Value is not a valid CEP: ${value}`);
  }

  return value;
};

export const CEPScalar = new GraphQLScalarType({
  name: 'CEP',
  description: 'CEP custom scalar type',
  parseValue(value) {
    return validate(value);
  },

  serialize(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as a CEP but got a: ${ast.kind}`,
      );
    }

    return validate(ast.value);
  },
});
