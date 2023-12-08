const fs = require("fs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

handlebars.registerHelper("inc", function (value, options) {
	return parseInt(value) + 1;
});

const converter = module.exports;

converter.convertHtmlToPdf = async ({templateHtml, dataBinding, options}) => {
	const template = handlebars.compile(templateHtml);
	const finalHtml = encodeURIComponent(template(dataBinding));

	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
		waitUntil: "networkidle0",
	});
	await page.pdf(options);
	await browser.close();
}

converter.generatePdf =  async (dataBinding = {}, header, footer, template, outputFilePath) => {
	const templateHtml = fs.readFileSync(template, "utf8");

	const options = {
		format: "Letter",
		headerTemplate: generateHeaderFooter(header),
		footerTemplate: generateHeaderFooter(footer),
		displayHeaderFooter: true,
		margin: {
			top: "0px",
			bottom: "0px",
		},
		printBackground: false,
		path: outputFilePath,
	};

	await this.convertHtmlToPdf({
		templateHtml,
		dataBinding,
		options
	});
}

function generateHeaderFooter(base64Data) {
	return `<span style="overflow: hidden; display: inline-block; margin: 0px 0px; width: 100%;">
              <style> #footer, #header { padding: 0 !important; }</style>
              <img alt="" src="data:image/png;base64,${base64Data}" style="width: 100%; title="" />
            </span>`;
}