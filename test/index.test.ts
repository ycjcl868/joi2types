import Joi from '@hapi/joi';
import Joi2Types, { joi2JsonSchema } from '../src';

test('joi2Types object', async () => {
  const joiEmptyObj = Joi.object();
  expect(
    joi2JsonSchema(joiEmptyObj, {
      additionalProperties: true,
    })
  ).toEqual({
    type: 'object',
    additionalProperties: true,
  })

  const joi = Joi.object({
    bar: Joi.boolean(),
    foo: Joi.object({
      foo_1: Joi.boolean().description('this is foo_1'),
      foo_2: Joi.boolean(),
      foo_3: Joi.string().valid('browser', 'hash', 'memory')
    })
  }).description('This is description');
  expect(
    joi2JsonSchema(joi, {
      additionalProperties: true,
    })
  ).toEqual({
    type: 'object',
    description: "This is description",
    additionalProperties: true,
    properties: {
      bar: {
        type: "boolean"
      },
      foo: {
        type: "object",
        additionalProperties: true,
        properties: {
          foo_1: {
            description: "this is foo_1",
            type: "boolean"
          },
          foo_2: {
            type: "boolean"
          },
          foo_3: {
            type: "string",
            enum: ['browser', 'hash', 'memory'],
          }
        }
      },
    }
  })

  const types = await Joi2Types(joi);
  expect(types.trim()).toMatchSnapshot();
})

test('joi2Types string enum', async () => {
  const schema = Joi.string().valid('browser', 'hash', 'memory');
  expect(
    joi2JsonSchema(schema)
  ).toEqual({
    type: 'string',
    enum: [
      "browser",
      "hash",
      "memory",
    ],
  })

  const types = await Joi2Types(schema);
  expect(types).toMatchSnapshot()
})

test('joi2Types array', async () => {
  const schema = Joi.array();
  expect(
    joi2JsonSchema(schema)
  ).toEqual({
    type: 'array',
  })
  const types = await Joi2Types(schema);
  expect(types.trim()).toMatchSnapshot();

  const schemaWithItems = Joi.array().items(Joi.string());
  expect(
    joi2JsonSchema(schemaWithItems)
  ).toEqual({
    type: 'array',
    items: {
      type: 'string',
    }
  })
  const typesWithItems = await Joi2Types(schemaWithItems);
  expect(typesWithItems.trim()).toMatchSnapshot();
})
