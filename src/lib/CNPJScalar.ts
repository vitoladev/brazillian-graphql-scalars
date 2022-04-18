import { isCNPJ } from 'brazilian-values';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const validate = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!isCNPJ(value)) {
    throw new TypeError(`Value is not a valid CNPJ: ${value}`);
  }

  return value;
};

export const CNPJScalar = new GraphQLScalarType({
  name: 'CNPJ',
  description: 'CNPJ custom scalar type',

  parseValue(value) {
    return validate(value);
  },

  serialize(value) {
    return validate(value);
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only validate strings as a CNPJ but got a: ${ast.kind}`,
      );
    }

    return validate(ast.value);
  },
});
