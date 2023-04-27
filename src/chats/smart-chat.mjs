export const smartChat = {
	baseUrl: "https://chat.lmsys.org/",
	promptSelector: "textarea[data-testid='textbox']",
	submitSelector: "button",
	responseSelector: "div[data-testid='bot'] p",

	/**
	 * @param {import("puppeteer").Page} page
	 * @param {string} question
	 * @returns {Promise<string>}
	 */
	async aswerQuestion(page, question) {
		await page.waitForSelector(this.promptSelector);
		await page.type(this.promptSelector, question);
		await page.waitForSelector(this.submitSelector);
		await page.click(this.submitSelector);
		await page.waitForSelector(this.responseSelector);

		const text = await page.evaluate(() => {
			const element = document.querySelector(this.responseSelector);
			return element.textContent;
		});
		return text;
	},

	async visit(page) {
		await page.goto(this.baseUrl);
		return "aaa";
	},
};
