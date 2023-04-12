const { apiKey, organization } = require('./keys.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization,
  apiKey,
});
const openai = new OpenAIApi(configuration);
openai.listEngines().then(resp => console.log(resp.data));
