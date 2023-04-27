import readline from "readline";

/**
  @param {import("readline").ReadLine} rl - readline interface
*/
export const getUserInput = (rl) => {
	return new Promise((resolve) => {
		rl.question("Question: ", (question) => {
			resolve(question);
		});
	});
};

export const getReadlineInterface = () => {
	return readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
};

export const validateModelArgs = () => {
	const possibleArgs = ["dumb", "smart"];
	const args = process.argv.slice(2);
	const model = args[0] || "smart";

	if (!possibleArgs.includes(model)) {
		console.log(
			`Invalid model. Possible models are: ${possibleArgs.join(", ")}`,
		);
		console.log('Default is "smart", so you can just run "npm start"');
		process.exit(1);
	}

	return model;
};
