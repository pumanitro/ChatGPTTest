const { apiKey, organization } = require('./keys.js');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey,
  organization
});

const openai = new OpenAIApi(configuration);

(async () => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello world"}],
  });
  console.log(completion.data.choices[0].message);
})();

