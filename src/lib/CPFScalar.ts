import { isCPF } from 'brazilian-values';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const validate = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!isCPF(value)) {
    throw new TypeError(`Value is not a valid CPF: ${value}`);
  }

  return value;
};

export const CPFScalar = new GraphQLScalarType({
  name: 'CPF',
  description: 'CPF custom scalar type',
  parseValue(value) {
    return validate(value);
  },

  serialize(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as a CPF but got a: ${ast.kind}`,
      );
    }

    return validate(ast.value);
  },
});
