const axios = require('axios');

const runPythonModel = async (inputText) => {
  try {
    const response = await axios.post('https://spendwise-ml-api.onrender.com/predict', {
      text: inputText,
    });
    return response.data; // This should be your expenses array from the API
  } catch (error) {
    throw new Error("ML API call failed: " + error.message);
  }
};

module.exports = runPythonModel;
