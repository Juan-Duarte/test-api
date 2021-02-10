let ApiHelper = require('./../index');

test('POST dictionary', async () => {
  apiHelper = new ApiHelper();

  const { statusCode, statusMessage, body } = await apiHelper.postDictionary();

  expect(statusCode).toBe(201);
  expect(statusMessage).toBe('Created');
  expect(JSON.parse(body)).toStrictEqual(expect.objectContaining({
    id: expect.any(String)
  }));
});
  
test('DELETE dictionary', async () => {
  apiHelper = new ApiHelper();

  const { body } = await apiHelper.postDictionary();
  const { statusCode, statusMessage } = await apiHelper.deleteDictionary(JSON.parse(body).id);

  expect(statusCode).toBe(204);
  expect(statusMessage).toBe('No Content');
});

test('DELETE dictionary 404 case', async () => {
  apiHelper = new ApiHelper();
  const data = await apiHelper.deleteDictionary('11111111-1111-1111-1111-111111111111');
  expect(data.name).toBe('HTTPError');
});