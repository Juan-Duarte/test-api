let ApiHelper = require('./../index');

test('POST dictionary', async () => {
  apiHelper = new ApiHelper();

  const data = await apiHelper.postDictionary();
  expect(data.statusCode).toBe(201);
  expect(data.statusMessage).toBe('Created');
  expect(JSON.parse(data.body)).toStrictEqual(expect.objectContaining({
    id: expect.any(String)
  }));
});
  