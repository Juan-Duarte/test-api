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

test('POST dictionary key-value pair', async () => {
  apiHelper = new ApiHelper();

  const { body } = await apiHelper.postDictionary();
  const dictionaryId = JSON.parse(body).id;
  const { statusCode, statusMessage } = await apiHelper.postDictionaryKey(dictionaryId, 'qa', 'engineer');

  expect(statusCode).toBe(200);
  expect(statusMessage).toBe('OK');
});

test('PUT dictionary key-value pair', async () => {
  apiHelper = new ApiHelper();

  const { body } = await apiHelper.postDictionary();
  const dictionaryId = JSON.parse(body).id;
  await apiHelper.postDictionaryKey(dictionaryId, 'qa', 'engineer');
  const { statusCode, statusMessage } = await apiHelper.postDictionaryKey(dictionaryId, 'qa', 'WIAMan');
  const {body: keysBody} = await apiHelper.getDictionaryKeys(dictionaryId);

  expect(statusCode).toBe(200);
  expect(statusMessage).toBe('OK');
  expect(JSON.parse(keysBody).qa).toBe('WIAMan');
});

test('GET dictionary key-value pair', async () => {
  apiHelper = new ApiHelper();

  const { body } = await apiHelper.postDictionary();
  const dictionaryId = JSON.parse(body).id;
  await apiHelper.postDictionaryKey(dictionaryId, 'qa', 'engineer');
  const {body: valueBody} = await apiHelper.getDictionaryValue(dictionaryId, 'qa');

  expect(JSON.parse(valueBody).value).toBe('engineer');
});

test('POST dictionary key-value pair invalid dictionary id', async () => {
  apiHelper = new ApiHelper();

  const data = await apiHelper.postDictionaryKey('11111111-1111-1111-1111-111111111111', 'qa', 'engineer');

  expect(data.name).toBe('HTTPError');
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