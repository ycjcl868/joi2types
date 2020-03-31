import Joi from '@hapi/joi';
import Joi2Types, { joi2JsonSchema } from '../src';

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

test('joi2Types array object', async () => {
  const schema = Joi.array().items(Joi.object({
    path: Joi.string().description('Any valid URL path'),
    component: Joi.string().description('A React component to render only when the location matches.'),
    redirect: Joi.string().description('navigate to a new location'),
    exact: Joi.boolean().description('When true, the active class/style will only be applied if the location is matched exactly.'),
  }).unknown());
  expect(
    joi2JsonSchema(schema)
  ).toEqual({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Any valid URL path'
        },
        component: {
          type: 'string',
          description: 'A React component to render only when the location matches.'
        },
        redirect: {
          type: 'string',
          description: 'navigate to a new location',
        },
        exact: {
          type: 'boolean',
          description: 'When true, the active class/style will only be applied if the location is matched exactly.'
        }
      }
    }
  })
})
