import {
	getReadlineInterface,
	validateModelArgs,
	getUserInput,
} from "./prompt/index.mjs";
import { chats } from "./chats/index.mjs";

(async () => {
	const rl = getReadlineInterface();
	const model = validateModelArgs();
	const chat = chats[model];

	// Visit the chat page while the user is typing the question
	console.log('Type "exit" when you want to exit the chat.');
	console.log("");
	let [question] = await Promise.all([getUserInput(rl), chat.visit()]);

	let isFirstQuestion = true;
	let answer = "";

	while (question !== "exit") {
		answer = await chat.aswerQuestion(question);
		console.log("");
		console.log(answer);
		isFirstQuestion = false;
		console.log("");
		question = await getUserInput(rl);
	}

	rl.close();
})();
