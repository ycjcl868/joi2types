import Joi from '@hapi/joi';
import Joi2Types, { joi2JsonSchema } from '../dist/index';

test('joi2Types string enum', async () => {
  const schema = Joi.string().valid('browser', 'hash', 'memory');
  expect(joi2JsonSchema(schema)).toEqual({
    type: 'string',
    enum: ['browser', 'hash', 'memory'],
  });

  const types = await Joi2Types(schema);
  expect(types).toMatchSnapshot();
});
