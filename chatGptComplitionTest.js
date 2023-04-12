const { apiKey } = require('./keys.js');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey
});

const openai = new OpenAIApi(configuration);

(async () => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
})();

