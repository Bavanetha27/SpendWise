const { PythonShell } = require("python-shell");
const path = require("path");

const runPythonModel = (inputText) => {
  return new Promise((resolve, reject) => {
    const options = {
      mode: "json",
      pythonOptions: ["-u"],
      scriptPath: path.resolve(__dirname, "../"), // adjust as needed
    };

    const pyshell = new PythonShell("./ml_model_api.py", options);

    pyshell.send({ text: inputText });

    pyshell.on("message", (message) => {
      resolve(message); // This should be your expenses array
    });

    pyshell.on("error", (err) => {
      reject("Python error: " + err);
    });

    pyshell.end((err) => {
      if (err) reject("Python shell end error: " + err);
    });
  });
};

module.exports = runPythonModel;
