import Joi from '@hapi/joi';
import joi2Types from '../dist';

test('normal', async () => {
  // example for react-router-config
  const schema = Joi.array().items(
    Joi.object({
      path: Joi.string().description('Any valid URL path'),
      component: Joi.string().description(
        'A React component to render only when the location matches.',
      ),
      redirect: Joi.string().description('navigate to a new location'),
      exact: Joi.boolean().description(
        'When true, the active class/style will only be applied if the location is matched exactly.',
      ),
    }).unknown(),
  );

  const types = await joi2Types(schema, {
    bannerComment: '/** comment for test */',
    interfaceName: 'IRoute',
  });
  expect(types.trim()).toMatchSnapshot();
});
