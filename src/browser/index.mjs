import puppeteer from "puppeteer";

export const getFirstPage = async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	return { page, browser };
};

