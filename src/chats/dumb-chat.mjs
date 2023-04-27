import { getFirstPage } from "../browser/index.mjs";

export const dumbChat = {
	baseUrl: "https://chatllama.baseten.co/",
	promptSelector: "textarea",
	submitSelector: 'button[alt="Submit"]',
	responseSelector: "div.p-3",
	loadingSelector: ".animate-pulse",
	browser: null,
	page: null,

	/**
	 * @param {string} question
	 * @returns {Promise<string>}
	 */
	async aswerQuestion(question) {
		await this.page.waitForSelector(this.promptSelector);
		await this.page.type(this.promptSelector, question);
		await this.page.waitForSelector(this.submitSelector);
		await this.page.click(this.submitSelector);
		await this.page.waitForSelector(this.loadingSelector);
		await this.page.waitForSelector(this.responseSelector);
		await this.page.waitForNetworkIdle();

		const items = await this.page.$$(this.responseSelector);
		const lastItem = items[items.length - 1];
		const text = await this.page.evaluate((el) => el.textContent, lastItem);

		return text;
	},

	async visit() {
		const { page, browser } = await getFirstPage();
		this.browser = browser;
		this.page = page;
		return page.goto(this.baseUrl);
	},

	async close() {
		return this.browser.close();
	},
};
